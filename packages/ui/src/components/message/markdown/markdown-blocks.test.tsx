import React from 'react';
import { afterEach, describe, expect, test } from 'vitest';
import { cleanup, render } from '@testing-library/react';
import type { Components } from 'react-markdown';
import type { PluggableList } from 'unified';
import remarkGfm from 'remark-gfm';
import { MarkdownBlocks, MARKDOWN_BLOCK_CACHE_LIMIT } from './markdown-blocks';

// Counts the blocks parsed by the processor.
const createPlugins = () => {
  const parsed: string[] = [];
  const remarkPlugins: PluggableList = [
    remarkGfm,
    () => (_tree, file) => {
      parsed.push(String(file.value));
    },
  ];
  return { parsed, remarkPlugins };
};

const components: Components = {};

const renderBlocks = (
  blocks: string[],
  remarkPlugins: PluggableList,
  { typing = false, clobberPrefix = 'a-' } = {},
) => {
  const { container, unmount } = render(
    <MarkdownBlocks
      blocks={blocks}
      typing={typing}
      remarkPlugins={remarkPlugins}
      remarkRehypeOptions={{ clobberPrefix }}
      components={components}
    />,
  );
  const html = container.innerHTML;
  unmount();
  return html;
};

describe('MarkdownBlocks cache', () => {
  afterEach(() => {
    cleanup();
  });

  test('does not parse the blocks of a message mounted again', () => {
    const { parsed, remarkPlugins } = createPlugins();
    const blocks = ['# Title\n\n', 'Some **text**.\n'];

    const first = renderBlocks(blocks, remarkPlugins);
    expect(parsed).toEqual(blocks);

    expect(renderBlocks(blocks, remarkPlugins)).toBe(first);
    expect(parsed).toEqual(blocks);
  });

  test('does not keep the last block while it is typed', () => {
    const { parsed, remarkPlugins } = createPlugins();
    const blocks = ['First block.\n\n', 'Typed'];

    renderBlocks(blocks, remarkPlugins, { typing: true });
    renderBlocks(blocks, remarkPlugins, { typing: true });

    expect(parsed).toEqual(['First block.\n\n', 'Typed', 'Typed']);
  });

  test('does not share footnote ids between messages', () => {
    const { parsed, remarkPlugins } = createPlugins();
    const blocks = ['Text[^1]\n\n[^1]: Note\n'];

    const first = renderBlocks(blocks, remarkPlugins, { clobberPrefix: 'a-' });
    const second = renderBlocks(blocks, remarkPlugins, {
      clobberPrefix: 'b-',
    });

    expect(parsed).toHaveLength(2);
    expect(first).toContain('id="a-fn-1"');
    expect(second).toContain('id="b-fn-1"');
  });

  test('keeps a bounded number of blocks', () => {
    const { parsed, remarkPlugins } = createPlugins();
    const blocks = Array.from(
      { length: MARKDOWN_BLOCK_CACHE_LIMIT + 1 },
      (_, index) => `Block ${index}\n\n`,
    );

    renderBlocks(blocks, remarkPlugins);
    renderBlocks(blocks.slice(-1), remarkPlugins);
    expect(parsed).toHaveLength(MARKDOWN_BLOCK_CACHE_LIMIT + 1);

    renderBlocks(blocks.slice(0, 1), remarkPlugins);
    expect(parsed).toHaveLength(MARKDOWN_BLOCK_CACHE_LIMIT + 2);
  });
});
