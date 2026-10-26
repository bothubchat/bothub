import {
  DefaultTheme,
  isStyledComponent,
  type RuleSet,
} from 'styled-components';

type StyleProps<Props> = Props & { theme?: DefaultTheme };

// Evaluates the interpolations for given props: what styled-components does
// on every render, done once per combination by cachedStyles.
const resolveRules = (chunks: readonly unknown[], props: object): unknown[] =>
  chunks.map((chunk) => {
    let value = chunk;
    while (typeof value === 'function' && !isStyledComponent(value)) {
      value = (value as (props: object) => unknown)(props);
    }
    return Array.isArray(value) ? resolveRules(value, props) : value;
  });

/**
 * Styles of a component rendered many times with a few combinations of
 * props: they are evaluated once per theme and `getKey` result, renders
 * only look them up. `getKey` must cover every prop the rules read.
 */
export const cachedStyles = <Props extends object>(
  rules: RuleSet<Props>,
  getKey: (props: Props) => string,
) => {
  const cache = new WeakMap<object, Map<string, unknown[]>>();

  return (props: StyleProps<Props>): RuleSet<object> => {
    const theme = props.theme as DefaultTheme;
    let themeCache = cache.get(theme);
    if (!themeCache) {
      themeCache = new Map();
      cache.set(theme, themeCache);
    }

    const key = getKey(props);
    let styles = themeCache.get(key);
    if (!styles) {
      styles = resolveRules(rules, { ...props, theme });
      themeCache.set(key, styles);
    }

    return styles as unknown as RuleSet<object>;
  };
};
