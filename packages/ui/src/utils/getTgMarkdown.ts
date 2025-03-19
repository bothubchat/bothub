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
  Table,
  Text,
  InlineCode
} from 'mdast';
import {
  toMarkdown,
  Options as ToMarkdownOptions,
  defaultHandlers,
  ConstructName
} from 'mdast-util-to-markdown';
import type { Node } from 'mdast-util-to-markdown/lib/types';
import { ListItem } from 'mdast-util-to-markdown/lib/handle/list-item';

type MDConstructName = ConstructName | 'heading';

export const getTgMarkdown = (markdown: string): string => {
  try {
    const normalizedMarkdown = markdown.trim();

    if (!normalizedMarkdown) {
      return '';
    }

    const ast = unified()
      .use(remarkParse)
      .use(remarkGfm)
      .parse(normalizedMarkdown);

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

    inlineCode: (node: InlineCode, parent, state) => {
      if (
        parent?.type === 'heading' ||
        !!state.stack.find(
          (nodeType: MDConstructName) => nodeType === 'heading'
        )
      ) {
        return node.value;
      }

      return `\`${node.value}\``;
    },

    // --- -> '
    thematicBreak: () => '',

    // **_BoldItalic_** -> **Bold**
    // __Bold__ OR **Bold** -> **Bold**
    strong: (node: Strong, parent, state, info) => {
      if (
        parent?.type === 'emphasis' ||
        parent?.type === 'heading' ||
        !!state.stack.find(
          (nodeType: MDConstructName) =>
            nodeType === 'emphasis' ||
            nodeType === 'strong' ||
            nodeType === 'heading'
        )
      ) {
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
        parent?.type === 'heading' ||
        !!state.stack.find(
          (nodeType: MDConstructName) =>
            nodeType === 'emphasis' ||
            nodeType === 'strong' ||
            nodeType === 'heading'
        )
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

    listItem: (node: ListItem, parent, state, info) => {
      if (node.checked === true || node.checked === false) {
        const childrenContent = node.children
          .map((child) => state.handle(child, node, state, info))
          .join('');

        const lines = childrenContent.split('\n');
        const checkbox = node.checked ? '[x] ' : '[ ] ';
        const bullet = state.bulletCurrent || '-';
        const firstLine = `${bullet} ${checkbox}${lines[0]}`;
        const indent = ' '.repeat(bullet.length + 1 + checkbox.length);
        const nestedLines = lines.slice(1).map((line) => indent + line);
        return [firstLine, ...nestedLines].join('\n');
      }

      // Fallback to default behavior for non-task items.
      return defaultHandlers.listItem(
        node,
        parent,
        {
          ...state,
          bulletCurrent: '-'
        },
        info
      );
    },

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
    },

    // Disables unnecessary symbol escaping
    text: (node: Text) => node.value,

    // Just output a newline instead of '  \' or '\n'
    break: () => '\n'
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

  return tgMarkdown.replaceAll(/\n{3,}/g, '\n\n').replace(/\n$/, '');
};
