import type { Plugin, Processor } from 'unified';
import type { Parent, PhrasingContent, Root, RootContent } from 'mdast';

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

// Not a markdown `break`: it is rendered as `<br>` followed by a newline,
// which `pre-wrap` of a paragraph shows as one more, empty line.
const createSoftBreakNode = (): PhrasingContent =>
  ({
    type: 'softBreak',
    data: { hName: 'br' },
  }) as unknown as PhrasingContent;

const splitSoftBreaks = (value: string): PhrasingContent[] =>
  value
    .split('\n')
    .flatMap((line, index): PhrasingContent[] =>
      index === 0
        ? [{ type: 'text', value: line }]
        : [createSoftBreakNode(), { type: 'text', value: line }],
    )
    .filter((node) => node.type !== 'text' || node.value !== '');

// Models put each clause on its own line without blank lines between them
// (`1. Title` then `1.1. Text`). In markdown such a newline is a space, so
// the lines were joined into one line of a list item.
const remarkSoftBreak: Plugin<[], Root> = () => (tree) => {
  const transform = (parent: Parent) => {
    parent.children = parent.children.flatMap((child) => {
      if (child.type === 'text' && child.value.includes('\n')) {
        return splitSoftBreaks(child.value);
      }
      if ('children' in child) {
        transform(child as Parent);
      }
      return [child];
    }) as Parent['children'];
  };

  transform(tree);
};

export { remarkCite, remarkHtmlBreak, remarkSoftBreak };
