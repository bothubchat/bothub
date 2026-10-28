import { useEffect, useMemo, useSyncExternalStore } from 'react';
import remarkGfm from 'remark-gfm';
import type { PluggableList } from 'unified';
import { remarkCite, remarkHtmlBreak } from './markdown-plugins';
import {
  getLoadedMath,
  loadMath,
  mayContainMath,
  subscribeToMath,
  type MathModule,
} from './math-loader';

export interface MarkdownPlugins {
  remarkPlugins: PluggableList;
  rehypePlugins: PluggableList;
}

// The lists keep their identity: parsed blocks are cached by them.
const basePlugins: MarkdownPlugins = {
  remarkPlugins: [remarkGfm, remarkCite, remarkHtmlBreak],
  rehypePlugins: [],
};

let mathPlugins: MarkdownPlugins | null = null;

// Formulas are rendered by `MarkdownMath` (mapped to `MATH_TAG_NAME` in the
// markdown components), which takes the error color from the theme.
const getMathPlugins = ({
  remarkMath,
  rehypeMath,
}: MathModule): MarkdownPlugins => {
  mathPlugins ??= {
    remarkPlugins: [
      remarkGfm,
      [remarkMath, { singleDollarTextMath: true }],
      remarkCite,
      remarkHtmlBreak,
    ],
    rehypePlugins: [rehypeMath],
  };

  return mathPlugins;
};

/**
 * Plugins with formulas when `withMath` is set and the formula chunk is
 * already loaded (`loadMath`), without them otherwise.
 */
export const getMarkdownPlugins = (withMath: boolean): MarkdownPlugins => {
  const math = withMath ? getLoadedMath() : null;
  return math ? getMathPlugins(math) : basePlugins;
};

const getServerSnapshot = () => false;

/**
 * Plugins for the given markdown. A text that may have formulas loads the
 * formula chunk and renders once more when it is loaded; texts without
 * formulas never wait for it and keep their parsed blocks. Without `markdown`
 * formulas are always on.
 */
export const useMarkdownPlugins = (markdown?: string): MarkdownPlugins => {
  const needsMath = useMemo(
    () => markdown === undefined || mayContainMath(markdown),
    [markdown],
  );

  // Hydration renders what the server did, without the chunk.
  const hasMath = useSyncExternalStore(
    subscribeToMath,
    () => needsMath && getLoadedMath() !== null,
    getServerSnapshot,
  );

  useEffect(() => {
    if (needsMath && !getLoadedMath()) {
      // A failed load leaves the TeX as text; the next mount tries again.
      loadMath().catch(() => {});
    }
  }, [needsMath]);

  return getMarkdownPlugins(hasMath);
};
