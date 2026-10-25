import React, { forwardRef, memo, useId, useMemo } from 'react';
import ReactMarkdown, { type Components, type Options } from 'react-markdown';
import { useMessage } from '@/ui/components/message/context';
import {
  MessageComponentsProps,
  MessageParagraph,
} from '@/ui/components/message/components';
import { MessageMarkdownLine, MessageMarkdownStyled } from './styled';
import {
  MessageMarkdownComponentsProvider,
  MessageMarkdownOpenCodeProvider,
  messageMarkdownComponents,
} from './markdown-components';
import { getOpenCodeFenceStart, normalizeMessageMarkdown } from './utils';
import { splitMarkdownBlocks } from './blocks';
import { useMarkdownPlugins } from './useMarkdownPlugins';
import { useStableComponents } from './useStableComponents';

export interface MessageMarkdownProps {
  children: string;
  /**
   * Compared by value: a new object with the same values does not re-render
   * the code blocks and images of the message. Functions in it
   * (`image.buttons`) have to keep their identity for that.
   */
  components?: MessageComponentsProps;
  /** Keep the object stable: a new one parses the whole message again. */
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
    const stableComponents = useStableComponents(components);

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

    const openCodeStart = useMemo(
      () => (typing ? getOpenCodeFenceStart(lastBlock) : null),
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
              <MessageMarkdownOpenCodeProvider
                key={index}
                value={index === blocks.length - 1 ? openCodeStart : null}
              >
                <MarkdownBlock
                  remarkPlugins={remarkPlugins}
                  rehypePlugins={rehypePlugins}
                  remarkRehypeOptions={remarkRehypeOptions}
                  components={markdownComponents}
                >
                  {block}
                </MarkdownBlock>
              </MessageMarkdownOpenCodeProvider>
            ))}
          </MessageMarkdownLine>
        </MessageMarkdownStyled>
      ),
      [
        typing,
        disableTyping,
        color,
        blocks,
        openCodeStart,
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
      <MessageMarkdownComponentsProvider value={stableComponents}>
        {markdownNode}
      </MessageMarkdownComponentsProvider>
    );
  },
);
