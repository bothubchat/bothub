# Bothub UI — правила работы с проектом

Монорепозиторий (yarn workspaces) с библиотекой React-компонентов Bothub.
Единственный пакет — `packages/ui` → публикуется в npm как `@bothub-chat/ui`.
Документация/Storybook: https://bothub-docs.vercel.app/

## Стек

- React 19, TypeScript (strict), `styled-components` 6.0.7
- Сборка: Rollup (`rollup.config.ts`), тесты: Vitest + Testing Library (jsdom)
- Storybook 9 (`@storybook/react-vite`), ESLint (airbnb + prettier), Prettier
- Менеджер пакетов — **yarn** (не npm)

## Команды

```bash
yarn            # установка зависимостей
yarn dev        # rollup в watch-режиме
yarn build      # production-сборка в packages/ui/dist
yarn sb         # Storybook на :6006
yarn lint       # ESLint (yarn lint:fix — автоисправление)
yarn format     # Prettier
yarn test       # Vitest (однократно); yarn test:watch — в режиме наблюдения
```

`yarn release` / `yarn publish` публикуют пакет в npm — **не запускать без явной просьбы**.

## Структура `packages/ui/src`

- `components/<kebab-name>/` — компоненты. Экспорт через `components/index.ts`.
- `icons/<kebab-name>/index.tsx` — иконки (~330 шт.), импортируются по пути: `@/ui/icons/<name>`.
- `theme/` — темы, `useTheme`, типы темы (`styled.d.ts`).
- `adaptive/` — хелпер `adaptive({ desktop, tablet, miniTablet, mobile, touch })` для брейкпоинтов.
- `utils/`, `styles/`, `provider/`, `story-decorator/` — утилиты, глобальные стили, провайдер, декоратор сторис.
- `index.ts` — корневой реэкспорт всего пакета.

Алиас импорта: `@/ui/*` → `packages/ui/src/*`. Внутри пакета используем его, а не длинные `../../`.

## Конвенции компонентов

Каждый компонент — папка с файлами:

- `index.tsx` — компонент и `XxxProps` (экспортируемый тип). `forwardRef`, если нужен ref.
- `styled.ts` / `styled.tsx` — styled-components. Транзитные пропсы стилей — с префиксом `$` (`$variant`, `$size`), чтобы не утекали в DOM.
- `types.ts` — union-типы вариантов (`ButtonVariant`, `ButtonSize` и т. п.).
- `index.stories.tsx` — сторис (`Meta`/`StoryObj` из `@storybook/react-vite`, декоратор `StoryDecorator`).
- Тесты — рядом, `*.test.ts(x)`.

Правила:

- Цвета, отступы, шрифты берём из темы (`theme.colors…`), не хардкодим. Адаптив — через `adaptive()`.
- Новый компонент обязательно экспортировать в `components/index.ts`; новую иконку создавать через `icon(...)` + `<Icon>` из `@/ui/components/icon`.
- Не ломать публичный API: пакет используют другие проекты Bothub (client, admin, mobile-порт). Переименование/удаление пропсов — только осознанно и с упоминанием в PR.
- Любой новый/изменённый визуальный вариант — отразить в сторис.
- Стиль кода задают Prettier (2 пробела, одинарные кавычки, `;`, trailing comma, `singleAttributePerLine`) и ESLint. Окончания строк — LF.

## Git

- Основная ветка для PR — `develop`; `main` — релизная. Не коммитить напрямую в `main`/`develop`.
- Ветки: `feat/<task-id>-<slug>`, `fix/<task-id>-<slug>`.
- Сообщения коммитов — Conventional Commits (проверяет commitlint): `feat: …`, `fix: …`, `chore: …`.
- pre-commit хук запускает ESLint через lint-staged — не обходить `--no-verify`.
- Коммитить/пушить только по просьбе пользователя.

## Проверка перед сдачей

1. `yarn lint` — без ошибок.
2. `yarn test` — если задеты утилиты/логика с тестами.
3. `yarn build` — если менялись экспорты, типы или конфиг сборки.
4. Для визуальных изменений — проверить сторис (`yarn sb`).

## Graphify MCP (граф знаний кода)

В проекте есть граф знаний, построенный [graphify](https://github.com/Graphify-Labs/graphify):
`graphify-out/graph.json` (+ `GRAPH_REPORT.md`, `graph.html`). Папка в `.gitignore`.
MCP-сервер `graphify` подключён через `.mcp.json` (`graphify-mcp --graph graphify-out/graph.json`).

### Когда использовать

Используй graphify **до** того, как грепать по всему репозиторию, если вопрос структурный:

- «где используется / кто зависит от X» → `get_neighbors`, `query_graph`
- «что сломается, если поменять X» → `query_graph` (dfs) по узлу X, затем проверить найденные файлы
- «как связаны A и B» → `shortest_path`
- «с чего начать / ключевые абстракции» → `god_nodes`, ресурс `Graph_Report`
- «что ещё в этой области» → `get_community` по id сообщества узла
- детали узла (файл, тип, связи) → `get_node`
- перед началом работы — проверить открытые PR, затрагивающие ту же область: `list_prs`, `get_pr_impact`, `triage_prs`

Для точечного поиска строки/символа по имени быстрее обычный Grep — graphify не заменяет чтение кода.
Результаты графа — подсказка, а не истина: перед правкой всегда открывай и читай реальные файлы.

### Инструменты

| Tool                                        | Назначение                                                                            |
| ------------------------------------------- | ------------------------------------------------------------------------------------- |
| `query_graph`                               | BFS/DFS по графу по вопросу или ключевому слову (`mode`, `depth` 1–6, `token_budget`) |
| `get_node`                                  | Полная информация об узле по label/ID                                                 |
| `get_neighbors`                             | Прямые соседи узла с типами рёбер (`relation_filter`)                                 |
| `shortest_path`                             | Кратчайший путь между двумя концепциями                                               |
| `get_community`                             | Все узлы сообщества по id                                                             |
| `god_nodes`                                 | Самые связанные узлы (архитектурные хабы: `useTheme`, `icon`, `Icon`, `useSidebar`…)  |
| `graph_stats`                               | Статистика графа                                                                      |
| `list_prs` / `get_pr_impact` / `triage_prs` | Открытые PR и их «радиус поражения» по графу                                          |

Ресурсы: `Graph_Report`, `God_Nodes`, `Graph_Stats`, `Suggested_Questions`, `Surprising_Connections`, `Confidence_Audit`.

### Актуальность графа

Граф не обновляется сам. В `graphify-out/GRAPH_REPORT.md` указан коммит, из которого он собран
(секция «Graph Freshness»). Если он заметно отстаёт от `git rev-parse HEAD` или результаты
не находят недавно добавленный код — обнови граф (без LLM, бесплатно):

```bash
graphify update .
```

После рефакторинга с удалением кода: `graphify update . --force`.
CLI-аналоги tool'ов: `graphify query "…"`, `graphify path "A" "B"`, `graphify explain "X"`,
`graphify affected "X"`, `graphify god-nodes`.
