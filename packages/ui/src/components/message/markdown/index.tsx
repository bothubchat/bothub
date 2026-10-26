import React, { forwardRef, useId, useMemo } from 'react';
import { type Components, type Options } from 'react-markdown';
import { useMessage } from '@/ui/components/message/context';
import {
  MessageComponentsProps,
  MessageParagraph,
} from '@/ui/components/message/components';
import { MessageMarkdownLine, MessageMarkdownStyled } from './styled';
import {
  MessageMarkdownComponentsProvider,
  messageMarkdownComponents,
} from './markdown-components';
import { getOpenCodeFenceStart, normalizeMessageMarkdown } from './utils';
import { useMarkdownPlugins } from './useMarkdownPlugins';
import { useStableComponents } from './useStableComponents';
import { getMarkdownBlocks } from './blocks';
import { MarkdownBlocks } from './markdown-blocks';

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
          ? getMarkdownBlocks(formattedChildren)
          : [],
      [formattedChildren, isDisabled],
    );
    const lastBlock = blocks[blocks.length - 1] ?? '';

    // Only the code that is still typed changes on every chunk: it is not
    // highlighted as complete until its fence is closed.
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
            <MarkdownBlocks
              blocks={blocks}
              openCodeStart={openCodeStart}
              remarkPlugins={remarkPlugins}
              rehypePlugins={rehypePlugins}
              remarkRehypeOptions={remarkRehypeOptions}
              components={markdownComponents}
            />
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
