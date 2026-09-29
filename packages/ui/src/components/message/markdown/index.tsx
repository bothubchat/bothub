import React, { forwardRef, useId, useMemo } from 'react';
import ReactMarkdown, { type Components, type Options } from 'react-markdown';
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
import { normalizeMessageMarkdown } from './utils';
import { useMarkdownPlugins } from './useMarkdownPlugins';

export interface MessageMarkdownProps {
  children: string;
  components?: MessageComponentsProps;
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

    // `typing` comes from the message context, not `disableTyping`: that prop
    // only hides the cursor while the content may still be streaming.
    const formattedChildren = useMemo(
      () =>
        typeof children === 'string' && !isDisabled
          ? normalizeMessageMarkdown(children, { typing })
          : children,
      [children, isDisabled, typing],
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
            <ReactMarkdown
              remarkPlugins={remarkPlugins}
              rehypePlugins={rehypePlugins}
              remarkRehypeOptions={remarkRehypeOptions}
              components={markdownComponents}
            >
              {formattedChildren}
            </ReactMarkdown>
          </MessageMarkdownLine>
        </MessageMarkdownStyled>
      ),
      [
        typing,
        disableTyping,
        color,
        formattedChildren,
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
