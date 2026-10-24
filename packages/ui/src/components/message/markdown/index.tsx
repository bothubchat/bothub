import React, { forwardRef, memo, useId, useMemo } from 'react';
import ReactMarkdown, { type Components, type Options } from 'react-markdown';
import { useMessage } from '@/ui/components/message/context';
import {
  MessageComponentsProps,
  MessageParagraph,
} from '@/ui/components/message/components';
import { MessageCodeTypingContext } from '@/ui/components/message/components/code/multiline/content/typing';
import { MessageMarkdownLine, MessageMarkdownStyled } from './styled';
import {
  MessageMarkdownComponentsProvider,
  messageMarkdownComponents,
} from './markdown-components';
import { endsInOpenCodeFence, normalizeMessageMarkdown } from './utils';
import { splitMarkdownBlocks } from './blocks';
import { useMarkdownPlugins } from './useMarkdownPlugins';

export interface MessageMarkdownProps {
  children: string;
  /**
   * Keep the object stable while a message streams (`useMemo`): every code
   * block and image of the message re-renders when it changes.
   */
  components?: MessageComponentsProps;
  /** Keep the object stable too: a new one parses the whole message again. */
  componentsOverride?: Components;
  disableTyping?: boolean;
  forceMarkdown?: boolean;
}

const EMPTY_COMPONENTS: MessageComponentsProps = {};

// A block whose text and options did not change keeps its rendered tree: while
// a message streams, only its last block is parsed again.
const MarkdownBlock = memo(ReactMarkdown);

export const MessageMarkdown = forwardRef<HTMLDivElement, MessageMarkdownProps>(
  (
    {
      children,
      components = EMPTY_COMPONENTS,
      componentsOverride,
      disableTyping = false,
      forceMarkdown = false,
    },
    ref,
  ) => {
    const { typing, variant, color } = useMessage();
    const isDisabled = forceMarkdown ? false : variant === 'user';
    const id = useId();

    // `typing` comes from the message context, not `disableTyping`: that prop
    // only hides the cursor while the content may still be streaming.
    const formattedChildren = useMemo(
      () =>
        typeof children === 'string' && !isDisabled
          ? normalizeMessageMarkdown(children, { typing })
          : children,
      [children, isDisabled, typing],
    );

    const blocks = useMemo(
      () =>
        typeof formattedChildren === 'string' && !isDisabled
          ? splitMarkdownBlocks(formattedChildren)
          : [],
      [formattedChildren, isDisabled],
    );
    const lastBlock = blocks[blocks.length - 1] ?? '';

    const isCodeTyping = useMemo(
      () => typing && endsInOpenCodeFence(lastBlock),
      [typing, lastBlock],
    );

    const { remarkPlugins, rehypePlugins } = useMarkdownPlugins();

    const markdownComponents = useMemo<Components>(
      () =>
        componentsOverride
          ? { ...messageMarkdownComponents, ...componentsOverride }
          : messageMarkdownComponents,
      [componentsOverride],
    );

    // Several messages on a page must not share footnote ids.
    const remarkRehypeOptions = useMemo<Options['remarkRehypeOptions']>(
      () => ({
        clobberPrefix: `${id.replace(/[^a-zA-Z0-9_-]/g, '')}-`,
      }),
      [id],
    );

    const markdownNode = useMemo(
      () => (
        <MessageMarkdownStyled ref={ref}>
          <MessageMarkdownLine
            $typing={disableTyping ? false : typing}
            $color={color}
          >
            {blocks.map((block, index) => (
              <MessageCodeTypingContext.Provider
                key={index}
                value={isCodeTyping && index === blocks.length - 1}
              >
                <MarkdownBlock
                  remarkPlugins={remarkPlugins}
                  rehypePlugins={rehypePlugins}
                  remarkRehypeOptions={remarkRehypeOptions}
                  components={markdownComponents}
                >
                  {block}
                </MarkdownBlock>
              </MessageCodeTypingContext.Provider>
            ))}
          </MessageMarkdownLine>
        </MessageMarkdownStyled>
      ),
      [
        typing,
        disableTyping,
        color,
        blocks,
        isCodeTyping,
        remarkPlugins,
        rehypePlugins,
        remarkRehypeOptions,
        ref,
        markdownComponents,
      ],
    );

    if (typeof children !== 'string') {
      return null;
    }

    if (isDisabled) {
      return (
        <MessageParagraph
          wrap
          disableMargin
        >
          {children}
        </MessageParagraph>
      );
    }

    return (
      <MessageMarkdownComponentsProvider value={components}>
        {markdownNode}
      </MessageMarkdownComponentsProvider>
    );
  },
);
