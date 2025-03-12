import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import type {
  Blockquote,
  Heading,
  Image,
  Link,
  Code,
  Strong,
  Emphasis,
  List,
  Table
} from 'mdast';
import {
  toMarkdown,
  Options as ToMarkdownOptions,
  defaultHandlers
} from 'mdast-util-to-markdown';
import type { Node } from 'mdast-util-to-markdown/lib/types';
import { ListItem } from 'mdast-util-to-markdown/lib/handle/list-item';

export const getTgMarkdown = (markdown: string): string => {
  try {
    if (!markdown.trim()) {
      return '';
    }

    const ast = unified().use(remarkParse).use(remarkGfm).parse(markdown);

    return mdastToTgMarkdown(ast);
  } catch (error) {
    console.error('Error converting to Telegram markdown:', error);
    return markdown;
  }
};

const mdastToTgMarkdown = (ast: Node) => {
  const handlers: ToMarkdownOptions['handlers'] = {
    ...defaultHandlers,
    // > Blockquote -> __Blockquote__
    blockquote: (node: Blockquote, _, state, info) => {
      const content = node.children
        .map((child) =>
          state.handle(
            child,
            node,
            {
              ...state,
              stack: state.stack.concat('emphasis')
            },
            info
          )
        )
        .join('');
      const lines = content.split('\n');

      return lines
        .map((line) => {
          if (!line.trim()) return '';

          return `__${line}__`;
        })
        .join('\n');
    },

    // # Heading -> **Heading**
    heading: (node: Heading, _, state, info) => {
      const text = node.children
        .map((child) => state.handle(child, node, state, info))
        .join('');
      return `**${text}**`;
    },

    // [Link](https://example.com) -> https://example.com
    link: (node: Link) => node.url,

    // ![Image](https://example.com/image.jpg) -> https://example.com/image.jpg
    image: (node: Image) => node.url,

    code: (node: Code) => `\`\`\`${node.lang || ''}\n${node.value}\n\`\`\``,

    // --- -> '
    thematicBreak: () => '',

    // **_BoldItalic_** -> **Bold**
    // __Bold__ OR **Bold** -> **Bold**
    strong: (node: Strong, parent, state, info) => {
      if (parent?.type === 'emphasis' || state.stack.includes('emphasis')) {
        return node.children
          .map((child) => state.handle(child, node, state, info))
          .join('');
      }

      return `**${node.children
        .map((child) => state.handle(child, node, state, info))
        .join('')}**`;
    },

    // **_BoldItalic_** -> **Bold**
    // *Italic* OR _Italic_ -> __Italic__
    emphasis: (node: Emphasis, parent, state, info) => {
      if (
        parent?.type === 'strong' ||
        state.stack.includes('strong') ||
        state.stack.includes('emphasis')
      ) {
        return node.children
          .map((child) => state.handle(child, node, state, info))
          .join('');
      }

      return `__${node.children
        .map((child) => state.handle(child, node, state, info))
        .join('')}__`;
    },

    // 1. First -> - First
    // - First -> - First
    list: (node: List, _, state, info) =>
      state.containerFlow(
        {
          ...node,
          ordered: false
        },
        info
      ),

    listItem: (node: ListItem, parent, state, info) =>
      defaultHandlers.listItem(
        node,
        parent,
        {
          ...state,
          bulletCurrent: '-'
        },
        info
      ),

    table: (node: Table, _, state, info) => {
      const rows = node.children || [];

      const formattedRows = rows.map((row) => {
        const cells = row.children || [];

        return cells
          .map((cell) => state.containerPhrasing(cell, info))
          .join(' ');
      });

      return formattedRows.join('\n');
    },

    delete: (node, _, state, info) => {
      const content = state.containerPhrasing(node, info);

      return `~~${content}~~`;
    }
  };

  const tgMarkdown = toMarkdown(ast, {
    bullet: '-',
    bulletOrdered: null,
    bulletOther: '-',
    incrementListMarker: false,
    listItemIndent: 'one',
    tightDefinitions: true,
    extensions: [
      {
        handlers
      }
    ]
  });

  return tgMarkdown.replace(/\n\s*\n\s*\n/g, '\n\n').trim();
};
