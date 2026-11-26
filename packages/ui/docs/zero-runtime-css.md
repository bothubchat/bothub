# Zero-runtime CSS: переход со styled-components на vanilla-extract

Пилот OPT-6. Четыре компонента (Typography, Skeleton, Divider, Badge) стилизованы без styled-components: их CSS собирается при сборке пакета в обычные `.css`-файлы, а в рантайме остаётся только склейка имён классов. Публичный API и внешний вид не изменились. Потребителям ничего делать не нужно.

## Итог пилота

| Что проверяли | Результат |
|---|---|
| Скриншоты: 334 истории Storybook + матрица пилота (dark/light × 1280/900/375 px × статичный кадр и середина анимации) | 72 из 72 кадров пилота совпадают попиксельно. В остальном каталоге новых отличий нет (разбор шума ниже) |
| `getTypographyStyles()` (миксин для styled-components): CSS до и после, 31 вариант × без менеджера / `main` / `dashboard` | 93 из 93 совпадают байт в байт |
| Next.js 15 (App Router), Typography / Skeleton / Divider в серверном компоненте без `'use client'` | `next build` и `next dev` работают, стили верные, предупреждений гидрации нет |
| Vite 7: dev и production | Работают. CSS приходит только для использованных компонентов: страница с одним Divider получает 0,4 КБ CSS |
| Типы потребителей: nextjs-client, admin, client против старого и нового `.d.ts` | Списки ошибок до и после одинаковые (все ошибки к библиотеке не относятся) |
| `yarn test` / `yarn typecheck` / `yarn lint` | 746 тестов (+36 новых), ошибок типов нет, у линтера 0 ошибок (6 старых предупреждений) |

Размер (production-сборка Vite, gzip, React вынесен):

| Импорт | До: JS | После: JS + CSS | Разница |
|---|---|---|---|
| `Typography` | 13,7 КБ | 1,6 + 0,9 = 2,5 КБ | −11,2 КБ |
| `Skeleton` | 13,1 КБ | 1,4 + 0,4 = 1,8 КБ | −11,3 КБ |
| `Divider` | 12,8 КБ | 0,5 + 0,2 = 0,7 КБ | −12,1 КБ |
| `Badge` | 15,8 КБ | 15,1 + 1,3 = 16,4 КБ | +0,6 КБ |
| Все четыре | 16,0 КБ | 15,2 + 1,4 = 16,6 КБ | +0,6 КБ |
| `ThemeProvider` + Typography, Skeleton, Divider | 20,4 КБ | 20,1 + 1,2 = 21,3 КБ | +1,0 КБ |

Большая экономия получается, только когда styled-components (~12 КБ gzip) не попадает в бандл совсем. Пока он нужен остальным компонентам и `ThemeProvider`, код стилей просто переезжает из JS в CSS: JS меньше на 0,3–0,7 КБ, CSS больше на 1,2–1,4 КБ. CSS кешируется отдельно и не исполняется, а при рендере стили больше не генерируются.

## Подход

- **[vanilla-extract](https://vanilla-extract.style)**: стили пишутся на TypeScript в файлах `*.css.ts` и выполняются при сборке. В пакет попадают `*.css.js` (только имена классов) и рядом `*.css.ts.vanilla.css` (сам CSS). `*.css.js` импортирует свой CSS, а также CSS тех `*.css.ts`, от которых зависит (сначала их). Поэтому приложение получает CSS ровно тех компонентов, которые импортирует, в правильном порядке и без настройки.
- **`@vanilla-extract/recipes`** для вариантов (`variant`, `size`, `brick`…). В рантайме остаётся только `createRuntimeFn` (~0,5 КБ gzip), он собирает строку классов. Это единственная новая runtime-зависимость пакета.
- **Значения темы читаются только через CSS-переменные** `--bothub-…`, которые задаёт существующий `ThemeProvider`. Второй темы нет.
- **Масштаб `BothubStyleSheetManager`** воспроизводится в статическом CSS через переменные (см. «Масштаб»).
- **Специфичность**: каждый стиль — один класс (0,1,0), как у styled-components. Обёртки `styled(Component)` перекрывают его, потому что их правила стоят позже (подробности и исключение см. в «Порядок CSS и перекрытия»).

### Инструменты

| Где | Что |
|---|---|
| `rollup.config.ts` | `vanillaExtract()`: `@vanilla-extract/rollup-plugin` с `cwd` = папка пакета и `identifiers: 'short'` в production. Обёртка кладёт CSS рядом с модулем: штатный плагин именует ассеты только по базовому имени, и Rollup 3 складывает их в одну папку |
| `rollup.config.ts`, `treeshake.moduleSideEffects` | Было `'no-external'`. Плагин отдаёт CSS-файлы как внешние модули, поэтому их импорты нужно сохранять: `(id, external) => !external \|\| id.endsWith('.css')` |
| `rollup.config.ts`, `external` | `@vanilla-extract/recipes/*` и `react/jsx-runtime` вынесены. Раньше в `dist/_virtual` лежала собственная CommonJS-копия JSX-рантайма React: в серверных компонентах в режиме разработки она читает клиентские внутренности React и падает (`Cannot read properties of undefined (reading 'recentlyCreatedOwnerStacks')`) |
| `.storybook/main.ts`, `packages/ui/vitest.config.ts` | `@vanilla-extract/vite-plugin` |
| `packages/ui/package.json` | `sideEffects` дополнен `**/*.css.ts`: иначе esbuild внутри компилятора vanilla-extract выбрасывает импорт `import '…/typography.css'`, нужный только для порядка CSS |

## Контракт темы

`src/theme/contract.css.ts`:

```ts
export const vars = createGlobalThemeContract(contractShape, (_value, path) =>
  themeVariableName(path.join('.')).slice(2),
);
// vars.colors.grayScale.gray2  === 'var(--bothub-colors-gray-scale-gray2)'
// vars.tokens.interfaceText    === 'var(--bothub-tokens-interface-text)'
```

Контракт только называет переменные `colors.*`, `default.colors.*`, `tokens.*` теми же именами, что `createThemeCssVariables` / `themeVar`. Форма берётся из `standardDark` при компиляции, в пакете остаются одни строки. `contract.test.ts` сверяет, что в контракте ровно те переменные, которые задаёт ThemeProvider.

Значения задаёт `ThemeProvider`:

- **Корневой provider задаёт переменные на `:root` всегда.** С `cssVariables` — все 144, как раньше. Без него (ни одно приложение `cssVariables` пока не включает) — только те, что читают zero-runtime стили: `zeroRuntimeThemePaths` в `src/theme/zero-runtime.ts`, сейчас 10 штук, ~0,4 КБ в HTML вместо 7,5 КБ. Тест сканирует `*.css.ts` и проверяет, что список совпадает с `vars.…` в исходниках: забыть добавить путь при миграции не получится. Стили styled-components без `cssVariables` по-прежнему получают литеральные цвета.
- **Вложенный `ThemeProvider`** (например, Excel-лендинг в nextjs-client: `BothubUIProvider` со своей темой внутри корневого) оборачивает детей в `<div data-bothub-theme style="display: contents; --bothub-…">` с переменными, которые отличаются от внешних. Обёртка есть всегда, даже без отличий: иначе при смене темы дети перемонтировались бы.
- **Ограничения.** Тема, подменённая через `ThemeProvider` из styled-components (`ThemeButton` в библиотеке, `withChatWidth` в client), до мигрированных компонентов не доходит: в обоих случаях цвета не меняются, так что сейчас это ни на что не влияет. Порталы, открытые изнутри вложенного provider, получают цвета корня.

## Масштаб (BothubStyleSheetManager)

Все три приложения оборачиваются в `BothubStyleSheetManager`. Его stylis-плагин переписывает каждое `Npx` (кроме ±1px и `background`) в `calc(var(--bothub-scale, 1) * Npx)`, а вариант `main` ещё и не даёт шрифтам опуститься ниже 12/16 px. Статический CSS через stylis не проходит. Без компенсации все размеры мигрированных компонентов при ширине ≤ 1600 px отличались бы от styled-компонентов рядом.

Компенсация:

- `scaled()` из `src/styles/zero-runtime/scale.ts` применяется к стилям в `*.css.ts` и переписывает значения так же, но с «выключателем»:
  `calc((1 + var(--bothub-ui-scale-on, 0) * (var(--bothub-scale, 1) - 1)) * 14px)`, для `font-size`/`line-height` ещё `max(…, var(--bothub-ui-font-size-min, 0px))`.
- `BothubStyleSheetManager` выставляет на `:root` `--bothub-ui-scale-on: 1`, а для `main` ещё минимумы `calc(12 * 1px)` / `calc(16 * 1px)`. Записаны через `1px`, чтобы их не переписал собственный плагин менеджера.
- Без менеджера переменные не заданы, и значения остаются как написаны.

`scale.test.ts` для обоих плагинов и шести значений `--bothub-scale` вычисляет итоговые px и сравнивает с тем, что дают stylis-плагины. Пересчёт `vh` (`--bothub-vh`) в `scaled()` пока не реализован: в пилоте его нет.

## Брейкпоинты

`src/adaptive/media.ts`: `media.tablet` = `(max-width: 1060px)`, `media.mobile` = `(max-width: 550px)`, `media.desktop`, `media.touch`, `media.dashboard.*`. Значения берутся из темы (во всех темах они одинаковы), строки совпадают с тем, что выдают `adaptive()` и styled-компоненты. vanilla-extract собирает одинаковые `@media` в один блок и выводит их после обычных правил. Блок tablet должен идти раньше mobile, поэтому в стиле tablet всегда объявляется первым (`typography.css.ts`).

## Как мигрировать компонент

Порядок работы:

1. Если в каталоге историй нет всех вариантов компонента, сначала добавить матрицу в `src/stories/zero-runtime` (или в истории компонента) и снять эталонные скриншоты (см. «Визуальная регрессия»).
2. Перенести стили из `styled.ts` в `<component>.css.ts`, а компонент перевести на обычные элементы с `className`.
3. Сохранить публичный API: пропсы, `className`/`style`, `ref`, экспорты.
4. Тесты, снимки AFTER, сравнение, размер.

### Статичные стили → `style()`

```ts
// было (divider/styled.ts)
export const DividerStyled = styled.div`
  display: flex;
  width: 100%;
  height: 1px;
  background: ${({ theme }) => themeVar(theme, 'colors.grayScale.gray2')};
`;

// стало (divider/divider.css.ts)
export const divider = style({
  display: 'flex',
  width: '100%',
  height: '1px',
  background: vars.colors.grayScale.gray2,
});
```

Длины пишутся строками (`'12px'`) и оборачиваются в `scaled()`, если в них есть px больше 1. `scaled()` обходит и `selectors`, и `@media`, и `vars`.

### Пропсы-варианты → recipe

```ts
// было: $variant / $brick / $skeleton с switch внутри шаблона
// стало (badge/badge.css.ts)
export const badge = recipe({
  base: scaled({ display: 'inline-flex', height: '26px', borderRadius: '13px', /* … */ }),
  variants: {
    variant: {
      info: { background: vars.tokens.badgeBackground },
      blue: { background: vars.colors.accent.primary },
      // …
    },
    brick: { true: scaled({ borderRadius: '6px' }), false: {} },
    // объявлен после variant, поэтому его background побеждает
    skeleton: { true: { background: vars.colors.grayScale.gray2, cursor: 'progress' }, false: {} },
  },
  defaultVariants: { variant: 'info', brick: false, skeleton: false },
});

// компонент
const classes = badge({ variant, brick, skeleton });
<div {...props} className={className ? `${classes} ${className}` : classes} />
```

Порядок групп в `variants` — это порядок правил в CSS. Если две группы задают одно свойство, побеждает объявленная позже: в styled-шаблоне это решал `if` внутри одного правила.

### Значения из пропсов → CSS-переменные через `style`

Skeleton уже работал так. Классы не зависят от значений, размеры и цвета передаются inline:

```tsx
style[skeletonProperties.width] = toCssSize(width); // --bothub-skeleton-width
<span className={skeleton({ variant })} style={style} />
```
```ts
width: `var(${skeletonProperties.width}, var(--skeleton-width, 40px))`,
```

Имена переменных фиксированные (`skeleton/properties.ts`), а не `createVar()`: они видны снаружи и на них опираются тесты.

### keyframes

```ts
const pulse = keyframes({ '0%': { background: `var(${skeletonProperties.colorFrom})` }, /* … */ });
// …
animation: `${pulse} 2s infinite forwards`,
```

### Адаптив → `@media` с брейкпоинтами библиотеки

```ts
scaled({
  fontSize: '46px',
  '@media': {
    [media.tablet]: { fontSize: '40px' },  // tablet раньше mobile
    [media.mobile]: { fontSize: '28px' },
  },
});
```

`adaptive({ desktop, tablet, mobile })` без `merge` даёт непересекающиеся диапазоны (`min-width … and max-width …`). Для таких стилей понадобятся комбинированные строки, их можно добавить в `media.ts` по мере миграции.

### Вложенные селекторы → `globalStyle`

```ts
// было: & * { color: … }
globalStyle(`${dividerContainer} *`, { color: vars.colors.grayScale.gray1 });
```

### Селекторы компонентов `${Component}` → класс

У компонента без styled-components нет `styledComponentId`. Если подставить его в шаблон, styled-components вызовет его как функцию и сломает CSS. Вместо этого базовый класс экспортируется из `*.css.ts` и подставляется явно:

```ts
// было
& ${TypographyStyled} { color: inherit; }
// стало
import { typographyClassName } from '@/ui/components/typography/typography.css';
& .${typographyClassName} { color: inherit; }
```

Специфичность та же (0,2,0).

### Публичные styled-части

`BadgeStyled`, `BadgeText`, `BadgeSkeleton` экспортировались из пакета. Приложения используют `BadgeText` и как элемент, и как селектор: `${BadgeText} { white-space: normal }` в client. Они остались тонкими styled-обёртками без собственных правил, которые только добавляют классы из `badge.css.ts`:

```ts
export const BadgeText = styled(Typography)
  .attrs<BadgeTextProps>({ variant: 'body-s-medium', className: badgeText })
  .withConfig({ componentId: BADGE_TEXT_CLASS_NAME })({});
```

У `BadgeText` фиксированный `componentId` (`bothub-badge-text`), и тот же класс Badge ставит своему тексту. Поэтому `${BadgeText}` в styled-компоненте находит и текст Badge, и `BadgeText`. Вызов сделан без шаблонной строки: иначе babel-plugin-styled-components добавит свой `withConfig` и заменит id. `BadgeStyled` и `BadgeSkeleton` помечены `@deprecated`.

### Миксины для styled-components

`getTypographyStyles()` нужен приложениям внутри своих styled-шаблонов (23 вызова), поэтому он остаётся styled-миксином. Шрифтовые метрики вынесены в `typography/variants.ts`, из них строятся и recipe (`typography.css.ts`), и миксин (`typography/mixin.ts`). Источник один, разойтись им негде. Миксин лежит в отдельном модуле и экспортируется из корня пакета, так что сама Typography styled-components не загружает: это нужно для серверных компонентов.

### Порядок CSS между компонентами

Если компонент перекрывает стили другого мигрированного компонента при той же специфичности (Badge перекрывает цвет Typography и радиус Skeleton), его `*.css.ts` импортирует их стили. Тогда их CSS всегда идёт раньше:

```ts
// badge/badge.css.ts
import '@/ui/components/typography/typography.css';
import '@/ui/components/skeleton/skeleton.css';
```

### Совместимость пропсов

- `className` дописывается к классам компонента, `style`, `ref` и DOM-атрибуты пробрасываются как раньше.
- `as`: обёртка `styled(X)` с `forwardedAs` передаёт компоненту `as`. Badge и Divider рендерят этот элемент, как делал styled-компонент внутри. Typography его отбрасывает: элемент у неё задаёт `component`, и раньше `as` тоже не действовал.
- Пропсы, которые раньше уходили в `$`-пропсы и не стилизовали ничего (`rounded` у Badge), не должны попасть в DOM.
- `displayName` не добавлять: он входит в хэш `componentId` styled-обёрток у приложений без SWC/Babel-плагина.
- Тесты: классы вариантов (`recipe.classNames.variants`), проброс `className`/`style`/`ref`, обёртка `styled()` и то, что компонент не создаёт правил styled-components (`ServerStyleSheet().getStyleTags() === ''`).

## Порядок CSS и перекрытия в приложениях

Правило библиотеки и правило обёртки `styled(Component)` имеют одинаковую специфичность (0,1,0), поэтому побеждает то, что стоит в документе позже. styled-components вставляет свой `<style data-styled>` в конец `<head>` при первом рендере.

| Где | CSS библиотеки | Перекрытие потребителя |
|---|---|---|
| Next.js App Router: SSR, клиентская навигация на маршрут, где компонент встречается впервые | `<link precedence="next">` всегда перед `style[data-styled]`: React вставляет новые ссылки к остальным ссылкам маршрутов | Побеждает |
| Vite dev | Весь CSS пакета приходит сразу (пакет пребандлится целиком) | Побеждает |
| Vite production, компонент в основном чанке | `<link>` в `index.html` | Побеждает |
| Vite production, компонент впервые появляется в ленивом чанке | `<link>` ленивого чанка добавляется в `<head>` после `style[data-styled]` | **Проигрывает** |

Последний случай воспроизведён в фикстуре: `styled(Badge)` в `React.lazy`-странице. Касается admin и client (Vite), только для мигрированных компонентов и только когда их CSS впервые приходит с ленивым чанком. Typography попадает почти во все основные чанки, так что риск в основном у редких компонентов. Варианты решения:

1. В перекрытиях внутри ленивых маршрутов писать `&&` (так советует сама styled-components). Точечно, без изменений в библиотеке.
2. Перенести стили styled-components в `<style>` в конце `<body>` (`target` у `StyleSheetManager` в `BothubStyleSheetManager`, только на клиенте). Тогда их правила всегда позже любых `<link>` в `<head>`. Нужно проверить SSR-регидратацию.
3. Каскадные слои (`@layer`) для стилей библиотеки. Не подходит, пока у приложений есть глобальные сбросы без слоя (`a { color }` в `BothubGlobalStyle`, `* { … }`, normalize): они стали бы перебивать стили библиотеки.

## Что меняется у потребителей

Ничего делать не нужно:

- CSS подключается сам: `*.css.js` компонента импортирует свой `.css`, `sideEffects` (`**/*.css`, `**/*.css.js`) не даёт его выбросить. Webpack (Next.js) и Rollup (Vite) берут CSS только использованных компонентов. esbuild-бандлинг (например, пребандл Vite в dev) берёт CSS всех мигрированных компонентов, достижимых из `index.js`: это ограничение esbuild.
- **SSR на Vite**: Node не загружает `.css`, нужен `ssr.noExternal: ['@bothub-chat/ui']`. В client он уже есть: пакет и раньше импортировал `katex.min.css`.
- **Vitest**: `server.deps.inline: [/@bothub-chat\/ui/]`. В nextjs-client и admin уже есть, в client Vitest берёт пакет из `ssr.noExternal`.
- **Jest** (сейчас ни у кого): нужен `moduleNameMapper: { '\\.css$': '<rootDir>/style-mock.js' }`. Файлы `*.css.js` — обычный JS с именами классов, их маппить не нужно.
- Имена классов (`ts37tf6`) — короткие хэши. Они меняются при изменении стилей, опираться на них нельзя.
- Если приложение само подключит `@vanilla-extract/vite-plugin`, нужно убедиться, что он не перекомпилирует уже собранные `*.css.js` из `node_modules` (open question).

## Визуальная регрессия

Матрица пилота — истории `Zero-runtime CSS/Pilot` (`src/stories/zero-runtime`): все варианты, перекрытия в стиле приложений (`styled()`, `.attrs`, миксин, `${BadgeText}`, `as`) и вложенный `ThemeProvider` со своей темой.

Процедура (скрипты пилота лежали вне репозитория, в `/home/dev/tmp/opt6/tools`, их стоит перенести в `scripts/`):

1. До изменений: `yarn build:sb -o <before>`.
2. Playwright, Chromium, `deviceScaleFactor: 1`: для каждой истории из `index.json` открыть `iframe.html?id=<id>&viewMode=story` (светлая тема — `&globals=backgrounds.value:!hex(FFFFFF)`), дождаться `networkidle`, `document.fonts.ready` и 250 мс, снять `fullPage`-скриншот с `animations: 'disabled'`. Истории мигрируемых компонентов дополнительно снять при ширине 900 и 375 px, в обеих темах и с остановленными на 500 мс анимациями (`document.getAnimations().forEach(a => { a.pause(); a.currentTime = 500 })`).
3. Эталон снять дважды. Истории, которые отличаются между двумя эталонными прогонами, шумные (анимации на JS: react-spring, лоадеры).
4. После изменений: `yarn build:sb -o <after>`, те же снимки, сравнение `pixelmatch` с `threshold: 0`. Отличие, которого нет между эталонами, переснять с паузой 3 с и несколько раз.

Результат пилота: 400 кадров (334 истории, у шести историй пилота по 12 кадров). Все 72 кадра пилота совпадают. Из 400 кадров 375 совпали сразу, 25 отличий разобраны:

- 21 история отличается и между двумя эталонными прогонами (анимации на JS). Среди них 2 истории, которые падают и до изменений (`useTheme must be used within a ThemeProvider`): в оверлее ошибки отличаются только хэши чанков;
- 3 истории (два модальных окна и `header--dashboard`) после паузы 3 с совпадают: это тайминг react-spring;
- `switcherselect--basic` и в эталоне переключается между двумя состояниями (5 px), новый кадр совпадает с одним из них.

## План миграции остальных компонентов

Порядок — от большей пользы и меньшего риска. Оценки на одного разработчика, включая визуальную проверку.

| Волна | Компоненты | Почему так | Оценка |
|---|---|---|---|
| 1. Охват при низком риске | **Icon** (`IconStyled`: ~450 файлов иконок и почти каждый компонент), Loader, Container, Section, Block, Link, Chip, DateBadge, Progress, Avatar, Image, FieldLabel, FileSize/FileIcon, Breadcrumbs, Stepper, Background, Main, Form, ActionMessage, Logo* | Листья без состояния. После Icon серверными могут стать карточки и секции лендингов. У Block 8 вызовов `adaptive()`, Logo читает тему в JS (12 раз): заменить на `vars` | Icon 1–2 дня, остальные по 0,5–1 дню; итого ~2 недели |
| 2. Интерактивные примитивы | **Button** (59 мест в библиотеке, 4 keyframes, 14 чтений темы в JS), Tooltip (позиционирование остаётся в JS), Scrollbar (+ миксин `ScrollbarStyle` для глобальных стилей), Checkbox, Radio, Switch, Tab, MenuTabs, ScrollableTabs, Pagination, Accordion, Backdrop/Modal/Drawer (`animated.div` принимает `className`), TextField, TextAreaField, FileField, DropzoneField, SelectField (102 styled-компонента) | Высокое влияние, умеренный риск: состояния (`:hover`, `[data-…]`, `$active`) → варианты и селекторы | Button 3–4 дня, SelectField 3–4 дня, остальные по 1–2 дня; итого ~3–4 недели |
| 3. Составные блоки | Header (164 styled, 16 `adaptive()`), Banner (17 `adaptive()`), Footer, Referral, Tariff, Preset, Bookmark, Notification, Table (12 селекторов компонентов), Datepicker, ColorPicker, Slider/RangeField/RangeSettings, Menu/MenuDropdown, LangSwitcher, ImageFullScreen, DeveloperKey, UploadedFile, Description | Много адаптива и селекторов `${Component}`, мало логики стилей | ~3–4 недели |
| 4. Тяжёлые и динамические | **Message** (11,7 тыс. строк, 270 styled, 55 селекторов компонентов, стили Markdown, KaTeX и highlight.js), InputMessage, **Sidebar** (77 чтений темы в JS, 7 keyframes, анимация сворачивания), превью тем (ThemeSchemes, ThemeCards, ThemePreview, ThemeSwitcher: каждому превью нужны свои переменные, приём вложенного provider), глобальные стили (`BothubGlobalStyle`, масштаб) | Самый большой объём и риск; глобальные стили последними | ~4–6 недель |
| 5. Завершение | Убрать `themeVar`/`cssVariables`-режим и мост масштаба (заменить настоящими значениями), убрать styled-components из `peerDependencies` (мажорная версия) | Только когда styled-components не нужен и самим приложениям | ~1 неделя |

Итого ~12–16 недель на всю библиотеку. Волны можно выпускать по отдельности: смешанный режим работает.

## Что получает Next.js-приложение

- **Уже сейчас**: Typography, Skeleton и Divider рендерятся в серверных компонентах без `'use client'`. Проверено в `next build` и `next dev` при `optimizePackageImports: ['@bothub-chat/ui']`, как в приложении. Текстовые секции лендингов, SEO- и блог-страниц можно не гидрировать, а код этих компонентов не уходит в клиентский JS этих деревьев. Badge остаётся клиентским (контексты тултипа и темы).
- Для мигрированных компонентов styled-components больше не генерирует и не хэширует стили при SSR и гидрации. Их CSS лежит в кешируемых файлах, а не в `<style>` каждой HTML-страницы.
- Цвета мигрированных компонентов идут через CSS-переменные: смена темы не перерисовывает их.
- **Когда все компоненты библиотеки на странице мигрированы и у самого приложения на этой странице нет styled-components** (сейчас в nextjs-client только над Typography 667 обёрток `styled(…)`), со страницы уходят рантайм styled-components (~12–13 КБ gzip), `StyledComponentsRegistry` с `useServerInsertedHTML` и стили в HTML. Для этого приложению нужна своя миграция. Ей пригодятся `vars` и `scaled()` из пакета (open question: делать ли их публичными).

## Риски

- Перекрытия в ленивых чанках Vite-приложений (см. выше).
- Вложенный `ThemeProvider` добавляет `div` с `display: contents`. Селекторы вида `parent > child` через него не проходят. Порталы изнутри него получают цвета корня.
- Мост масштаба глобальный (`:root`): несколько `BothubStyleSheetManager` разных вариантов на странице или менеджер только вокруг части дерева дадут один масштаб на всю страницу.
- Брейкпоинты статичные: кастомная тема с другими `tablet/mobile.maxWidth` на мигрированные компоненты не влияет (сейчас таких тем нет).
- Вынос `react/jsx-runtime` меняет импорт во всех модулях пакета: теперь используется JSX-рантайм приложения. Для React 19 из `peerDependencies` это правильно, но затрагивает весь пакет.
- CSS Typography без сжатия — 22,8 КБ (0,9 КБ gzip) из-за длинного выражения масштаба. Можно сократить: вычислять множитель один раз в переменной на элементе или сжимать CSS при сборке пакета.

## Открытые вопросы

1. Как решаем перекрытия в ленивых чанках: `&&` у потребителей, `target` в `BothubStyleSheetManager` или слои позже?
2. Делать ли публичными `vars` (контракт темы) и `scaled()`, чтобы приложения мигрировали свои стили тем же способом?
3. Сжимать ли CSS в `dist` (сейчас его сжимают бандлеры приложений)?
4. Когда удалить устаревшие `BadgeStyled` и `BadgeSkeleton`, и оставлять ли `BadgeText`?
5. Когда мигрирует большая часть компонентов, `zeroRuntimeThemePaths` разрастётся до всех переменных. Тогда проще всегда задавать полный набор, и `cssVariables` останется только переключателем для styled-стилей.
