/*
 * Formulas need remark-math, KaTeX and its CSS (about 80 KB gzip). They are
 * a separate chunk loaded the first time a text looks like it has a formula,
 * so pages without formulas never download it.
 */
export type MathModule = typeof import('./math-plugins');

/**
 * Element emitted by `rehypeMath` in place of every formula. It is rendered by
 * `MarkdownMath`, so KaTeX runs once per formula instead of once per formula
 * on every streamed chunk.
 */
export const MATH_TAG_NAME = 'katex-math';

let mathModule: MathModule | null = null;
let mathPromise: Promise<MathModule> | null = null;
const listeners = new Set<() => void>();

export const getLoadedMath = (): MathModule | null => mathModule;

/** Loads the formula chunk once; a failed load is tried again next time. */
export const loadMath = (): Promise<MathModule> => {
  mathPromise ??= import('./math-plugins').then(
    (module) => {
      mathModule = module;
      listeners.forEach((listener) => listener());
      return module;
    },
    (error: unknown) => {
      mathPromise = null;
      throw error;
    },
  );

  return mathPromise;
};

export const subscribeToMath = (listener: () => void): (() => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

const MATH_FENCE_PATTERN = /(?:`{3,}|~{3,})[ \t]*math/;

/**
 * Whether remark-math or `rehypeMath` may find a formula in normalized
 * markdown: an unescaped `$` (explicit `\(…\)` and `\[…\]` are already
 * converted to dollars, currency is escaped) or a ```` ```math ```` fence.
 * False positives only load the chunk; a false negative would show the TeX.
 */
export const mayContainMath = (markdown: string): boolean => {
  for (
    let index = markdown.indexOf('$');
    index !== -1;
    index = markdown.indexOf('$', index + 1)
  ) {
    let backslashes = 0;
    while (markdown[index - 1 - backslashes] === '\\') {
      backslashes += 1;
    }
    if (backslashes % 2 === 0) {
      return true;
    }
  }

  return MATH_FENCE_PATTERN.test(markdown);
};
