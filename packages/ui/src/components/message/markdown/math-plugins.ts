/*
 * The formula chunk, loaded by `loadMath` the first time a text looks like it
 * has a formula: remark-math, KaTeX and its CSS.
 */
import remarkMath from 'remark-math';
import { SKIP, visit } from 'unist-util-visit';
import type { Plugin } from 'unified';
import type {
  Element,
  ElementContent,
  Root as HastRoot,
  RootContent as HastRootContent,
} from 'hast';
import { MATH_TAG_NAME } from './math-loader';
import 'katex/dist/katex.min.css';

const getClassNames = (element: Element): unknown[] =>
  Array.isArray(element.properties.className)
    ? element.properties.className
    : [];

const isLanguageMath = (node: ElementContent): node is Element =>
  node.type === 'element' &&
  node.tagName === 'code' &&
  getClassNames(node).includes('language-math');

const isMath = (element: Element): boolean =>
  getClassNames(element).some(
    (className) =>
      className === 'language-math' ||
      className === 'math-display' ||
      className === 'math-inline',
  );

// Formulas only contain text, `toText` of rehype-katex returns the same.
const getText = (node: HastRootContent | ElementContent): string => {
  if (node.type === 'text') {
    return node.value;
  }
  return 'children' in node
    ? node.children.map((child) => getText(child)).join('')
    : '';
};

/**
 * Replaces formulas with `<katex-math>` elements rendered by `MarkdownMath`.
 * Finds formulas the same way rehype-katex does: `$$` blocks and ` ```math `
 * fences are a `<code class="language-math">` inside a `<pre>`, and the whole
 * `<pre>` becomes display math.
 */
const rehypeMath: Plugin<[], HastRoot> = () => (tree) => {
  visit(tree, 'element', (element, index, parent) => {
    if (!parent || index === undefined) {
      return undefined;
    }

    const isBlock =
      element.tagName === 'pre' && element.children.some(isLanguageMath);

    if (!isBlock && !isMath(element)) {
      return undefined;
    }

    parent.children[index] = {
      type: 'element',
      tagName: MATH_TAG_NAME,
      properties: {
        dataTex: getText(element),
        dataDisplay: isBlock || getClassNames(element).includes('math-display'),
      },
      children: [],
    };

    return SKIP;
  });
};

export { remarkMath, rehypeMath };
export { MarkdownMath } from './math';
