import React, { Fragment, memo } from 'react';
import ReactMarkdown, { type Options } from 'react-markdown';
import { MessageMarkdownOpenCodeProvider } from './markdown-components';

export interface MarkdownBlocksProps extends Omit<Options, 'children'> {
  /** Parts of the text from `getMarkdownBlocks`. */
  blocks: string[];
  /** Start of the code that is still typed in the last block. */
  openCodeStart?: number | null;
}

// A block is parsed again only when its text changes: while a message is
// typed that is the last block.
const MarkdownBlock = memo(ReactMarkdown);

export const MarkdownBlocks: React.FC<MarkdownBlocksProps> = ({
  blocks,
  openCodeStart = null,
  ...options
}) => (
  <>
    {blocks.map((block, index) => (
      <Fragment key={index}>
        {/* The newline react-markdown puts between top-level blocks. */}
        {index > 0 && '\n'}
        {/* Only the last block can still change while a message is typed. */}
        <MessageMarkdownOpenCodeProvider
          value={index === blocks.length - 1 ? openCodeStart : null}
        >
          <MarkdownBlock {...options}>{block}</MarkdownBlock>
        </MessageMarkdownOpenCodeProvider>
      </Fragment>
    ))}
  </>
);
