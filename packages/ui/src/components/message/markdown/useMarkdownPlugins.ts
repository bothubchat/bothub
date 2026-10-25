import remarkGfm from 'remark-gfm';
import type { PluggableList } from 'unified';
import {
  remarkMath,
  rehypeMath,
  remarkCite,
  remarkHtmlBreak,
} from './markdown-plugins';

const remarkPlugins: PluggableList = [
  remarkGfm,
  [remarkMath, { singleDollarTextMath: true }],
  remarkCite,
  remarkHtmlBreak,
];

// Formulas are rendered by `MarkdownMath` (mapped to `MATH_TAG_NAME` in the
// markdown components), which takes the error color from the theme.
const rehypePlugins: PluggableList = [rehypeMath];

export const useMarkdownPlugins = (): {
  remarkPlugins: PluggableList;
  rehypePlugins: PluggableList;
} => ({ remarkPlugins, rehypePlugins });
