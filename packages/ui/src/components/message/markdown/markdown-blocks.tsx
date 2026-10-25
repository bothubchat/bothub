import React, { Fragment, memo } from 'react';
import ReactMarkdown, { type Options } from 'react-markdown';
import { MessageCodeCompleteContext } from '@/ui/components/message/components/code/multiline/content/context';

export interface MarkdownBlocksProps extends Omit<Options, 'children'> {
  /** Parts of the text from `splitMarkdownBlocks`. */
  blocks: string[];
}

// A block is parsed again only when its text changes: while a message is
// typed that is the last block.
const MarkdownBlock = memo(ReactMarkdown);

export const MarkdownBlocks: React.FC<MarkdownBlocksProps> = ({
  blocks,
  ...options
}) => (
  <>
    {blocks.map((block, index) => (
      <Fragment key={index}>
        {/* The newline react-markdown puts between top-level blocks. */}
        {index > 0 && '\n'}
        {/* Only the last block can still change while a message is typed. */}
        <MessageCodeCompleteContext.Provider value={index < blocks.length - 1}>
          <MarkdownBlock {...options}>{block}</MarkdownBlock>
        </MessageCodeCompleteContext.Provider>
      </Fragment>
    ))}
  </>
);
