import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import type { Blockquote, Heading, Image, Link, Code } from 'mdast';
import {
  toMarkdown,
  Options as ToMarkdownOptions,
  defaultHandlers
} from 'mdast-util-to-markdown';
import type { Node } from 'mdast-util-to-markdown/lib/types';

export const getTgMarkdown = (markdown: string): string => {
  if (!markdown.trim()) {
    return '';
  }

  try {
    const ast = unified().use(remarkParse).use(remarkGfm).parse(markdown);

    return mdastToTgMarkdown(ast).trim();
  } catch (error) {
    console.error('Error converting to Telegram markdown:', error);
    return markdown;
  }
};

const mdastToTgMarkdown = (ast: Node) => {
  const handlers: ToMarkdownOptions['handlers'] = {
    ...defaultHandlers,
    // > Blockquote -> __Blockquote__
    blockquote: (node: Blockquote) => {
      const text = node.children
        .map((child) => mdastToTgMarkdown(child).replace(/\n$/g, ''))
        .join('');
      return `__${text}__`;
    },

    // # Heading -> **Heading**
    heading: (node: Heading) => {
      const text = node.children
        .map((child) => mdastToTgMarkdown(child).replace(/\n$/g, ''))
        .join('');
      return `**${text}**`;
    },

    // [Link](https://example.com) -> https://example.com
    link: (node: Link) => node.url,

    // ![Image](https://example.com/image.jpg) -> https://example.com/image.jpg
    image: (node: Image) => node.url,

    code: (node: Code) => `\`\`\`${node.lang || ''}\n${node.value}\n\`\`\``
  };

  const tgMarkdown = toMarkdown(ast, {
    bullet: '-',
    listItemIndent: 'one',
    emphasis: '*',
    strong: '*',
    rule: '-',
    tightDefinitions: true,
    handlers
  } as ToMarkdownOptions);

  return tgMarkdown;
};
