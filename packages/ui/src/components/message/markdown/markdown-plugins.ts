import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import type { Plugin } from 'unified';
import type { Parent, Root, RootContent } from 'mdast';
import 'katex/dist/katex.min.css';

const CITE_OPEN = '<cite>';
const CITE_CLOSE = '</cite>';

const remarkCite: Plugin<[], Root> = () => (tree) => {
  const transform = (parent: Parent) => {
    const { children } = parent;

    for (let i = 0; i < children.length; i++) {
      const node = children[i];

      if (node.type !== 'html' || node.value.toLowerCase() !== CITE_OPEN) {
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

      const citeNode = {
        type: 'cite',
        children: citeChildren,
        data: {
          hName: 'cite',
        },
      } as unknown as RootContent;

      children.splice(i, closeIndex - i + 1, citeNode);
    }

    for (const child of children) {
      if ('children' in child) {
        transform(child as Parent);
      }
    }
  };

  transform(tree);
};

export { remarkMath, rehypeKatex, remarkCite };
