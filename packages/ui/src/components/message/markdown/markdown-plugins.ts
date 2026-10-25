import remarkMath from 'remark-math';
import { SKIP, visit } from 'unist-util-visit';
import type { Plugin, Processor } from 'unified';
import type { Parent, PhrasingContent, Root, RootContent } from 'mdast';
import type {
  Element,
  ElementContent,
  Root as HastRoot,
  RootContent as HastRootContent,
} from 'hast';
import { MATH_TAG_NAME } from './math';
import 'katex/dist/katex.min.css';

const CITE_OPEN = '<cite>';
const CITE_CLOSE = '</cite>';
const CITE_BLOCK_PATTERN = /^<cite>([\s\S]*)<\/cite>$/i;
const BREAK_PATTERN = /^<br\s*\/?>$/i;

const createCiteNode = (children: RootContent[]): RootContent =>
  ({
    type: 'cite',
    children,
    data: {
      hName: 'cite',
    },
  }) as unknown as RootContent;

const remarkCite: Plugin<[], Root> = function remarkCite(this: Processor) {
  // `<cite>…</cite>` written on separate lines is parsed as a single HTML block,
  // which react-markdown would otherwise show as plain text with the tags.
  const parseCiteBlock = (value: string): RootContent | null => {
    const match = CITE_BLOCK_PATTERN.exec(value.trim());
    if (!match) {
      return null;
    }

    const content = this.parse(match[1].trim()) as Root;
    const [first] = content.children;
    const children =
      content.children.length === 1 && first.type === 'paragraph'
        ? first.children
        : content.children;

    return {
      type: 'paragraph',
      children: [createCiteNode(children) as PhrasingContent],
    };
  };

  const transform = (parent: Parent) => {
    const { children } = parent;

    for (let i = 0; i < children.length; i++) {
      const node = children[i];

      if (node.type !== 'html') {
        continue;
      }

      if (parent.type === 'root' || node.value.includes('\n')) {
        const citeBlock = parseCiteBlock(node.value);
        if (citeBlock) {
          children.splice(i, 1, citeBlock);
          continue;
        }
      }

      if (node.value.toLowerCase() !== CITE_OPEN) {
        continue;
      }

      const closeIndex = children.findIndex(
        (child, index) =>
          index > i &&
          child.type === 'html' &&
          child.value.toLowerCase() === CITE_CLOSE,
      );

      if (closeIndex === -1) {
        continue;
      }

      const citeChildren = children.slice(i + 1, closeIndex);

      children.splice(
        i,
        closeIndex - i + 1,
        createCiteNode(citeChildren as RootContent[]),
      );
    }

    for (const child of children) {
      if ('children' in child) {
        transform(child as Parent);
      }
    }
  };

  return (tree) => {
    transform(tree);
  };
};

// Models often use `<br>` for line breaks inside table cells. Raw HTML is not
// rendered, so turn it into a markdown hard break instead of showing the tag.
const remarkHtmlBreak: Plugin<[], Root> = () => (tree) => {
  const transform = (parent: Parent) => {
    parent.children.forEach((child, index) => {
      if (child.type === 'html' && BREAK_PATTERN.test(child.value.trim())) {
        parent.children[index] = { type: 'break' };
        return;
      }
      if ('children' in child) {
        transform(child as Parent);
      }
    });
  };

  transform(tree);
};

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

export { remarkMath, rehypeMath, remarkCite, remarkHtmlBreak };
