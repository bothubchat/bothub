import React, { Fragment, memo, type ReactElement } from 'react';
import ReactMarkdown, { type Options } from 'react-markdown';
import { MessageMarkdownOpenCodeProvider } from './markdown-components';

export interface MarkdownBlocksProps extends Omit<Options, 'children'> {
  /** Parts of the text from `getMarkdownBlocks`. */
  blocks: string[];
  /** Start of the code that is still typed in the last block. */
  openCodeStart?: number | null;
  /** The last block is still typed: its intermediate versions are not cached. */
  typing?: boolean;
}

/*
 * Rendered blocks are shared by all messages, so a chat opened again is not
 * parsed again. The result depends on the text, the plugins, the components
 * and, for footnotes, on `remarkRehypeOptions.clobberPrefix`, the only one of
 * `remarkRehypeOptions` that may differ between messages. A block of
 * 1500–3000 characters keeps about 40 KB: the full cache is about 4 MB.
 */
export const MARKDOWN_BLOCK_CACHE_LIMIT = 100;

type BlockCache = Map<string, ReactElement>;

const NO_OPTION = {};
const blockCaches = new WeakMap<
  object,
  WeakMap<object, WeakMap<object, BlockCache>>
>();

const getBlockCache = ({
  components,
  remarkPlugins,
  rehypePlugins,
}: Options): BlockCache => {
  let byRemark = blockCaches.get(components ?? NO_OPTION);
  if (!byRemark) {
    byRemark = new WeakMap();
    blockCaches.set(components ?? NO_OPTION, byRemark);
  }
  let byRehype = byRemark.get(remarkPlugins ?? NO_OPTION);
  if (!byRehype) {
    byRehype = new WeakMap();
    byRemark.set(remarkPlugins ?? NO_OPTION, byRehype);
  }
  let cache = byRehype.get(rehypePlugins ?? NO_OPTION);
  if (!cache) {
    cache = new Map();
    byRehype.set(rehypePlugins ?? NO_OPTION, cache);
  }
  return cache;
};

const getBlockKey = ({ children, remarkRehypeOptions }: Options): string => {
  const text = children ?? '';
  return text.includes('[^')
    ? `${remarkRehypeOptions?.clobberPrefix ?? ''}\n${text}`
    : text;
};

type MarkdownBlockProps = Options & { cache: boolean };

// `cache` only decides whether the result is stored: when a message stops
// being typed its last block is not rendered again for that.
const areBlockPropsEqual = (
  previous: MarkdownBlockProps,
  next: MarkdownBlockProps,
) => {
  const keys = Object.keys(next) as (keyof MarkdownBlockProps)[];
  return (
    keys.length === Object.keys(previous).length &&
    keys.every((key) => key === 'cache' || Object.is(previous[key], next[key]))
  );
};

// A block is parsed again only when its text changes: while a message is
// typed that is the last block.
const MarkdownBlock = memo(
  ({ cache: isCached, ...options }: MarkdownBlockProps) => {
    if (!isCached) {
      return ReactMarkdown(options);
    }

    const cache = getBlockCache(options);
    const key = getBlockKey(options);
    let element = cache.get(key);
    if (element) {
      // Re-insert to keep the most recently used blocks in the cache.
      cache.delete(key);
    } else {
      element = ReactMarkdown(options);
      if (cache.size >= MARKDOWN_BLOCK_CACHE_LIMIT) {
        cache.delete(cache.keys().next().value as string);
      }
    }
    cache.set(key, element);

    return element;
  },
  areBlockPropsEqual,
);

export const MarkdownBlocks: React.FC<MarkdownBlocksProps> = ({
  blocks,
  openCodeStart = null,
  typing = false,
  ...options
}) => (
  <>
    {blocks.map((block, index) => {
      const isLast = index === blocks.length - 1;

      return (
        <Fragment key={index}>
          {/* The newline react-markdown puts between top-level blocks. */}
          {index > 0 && '\n'}
          {/* Only the last block can still change while a message is typed. */}
          <MessageMarkdownOpenCodeProvider
            value={isLast ? openCodeStart : null}
          >
            <MarkdownBlock
              {...options}
              cache={!(typing && isLast)}
            >
              {block}
            </MarkdownBlock>
          </MessageMarkdownOpenCodeProvider>
        </Fragment>
      );
    })}
  </>
);
