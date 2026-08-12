import React, { forwardRef, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import { useMessage } from '@/ui/components/message/context';
import {
  MessageComponentsProps,
  MessageParagraph,
} from '@/ui/components/message/components';
import { MessageMarkdownLine, MessageMarkdownStyled } from './styled';
import { markdownComponents } from './markdown-components';
import { normalizeMessageMarkdown } from './utils';
import { useMarkdownPlugins } from './useMarkdownPlugins';

export interface MessageMarkdownProps {
  children: string;
  components?: MessageComponentsProps;
  componentsOverride?: React.ComponentProps<typeof ReactMarkdown>['components'];
  disableTyping?: boolean;
  forceMarkdown?: boolean;
}

export const MessageMarkdown = forwardRef<HTMLDivElement, MessageMarkdownProps>(
  (
    {
      children,
      components = {},
      componentsOverride = {},
      disableTyping = false,
      forceMarkdown = false,
    },
    ref,
  ) => {
    const { typing, variant, color } = useMessage();
    const isDisabled = forceMarkdown ? false : variant === 'user';

    const formattedChildren = useMemo(() => {
      if (typeof children === 'string' && !isDisabled) {
        return normalizeMessageMarkdown(children);
      }
      return children;
    }, [children, isDisabled]);

    const { remarkPlugins, rehypePlugins } = useMarkdownPlugins();

    const markdownNode = useMemo(() => {
      if (typeof formattedChildren !== 'string') {
        return null;
      }

      return (
        <MessageMarkdownStyled ref={ref}>
          <MessageMarkdownLine
            $typing={disableTyping ? false : typing}
            $color={color}
          >
            <ReactMarkdown
              remarkPlugins={remarkPlugins}
              rehypePlugins={rehypePlugins}
              components={markdownComponents(
                components,
                componentsOverride,
                remarkPlugins,
                rehypePlugins,
              )}
            >
              {formattedChildren}
            </ReactMarkdown>
          </MessageMarkdownLine>
        </MessageMarkdownStyled>
      );
    }, [
      typing,
      disableTyping,
      color,
      formattedChildren,
      remarkPlugins,
      rehypePlugins,
      ref,
      components,
      componentsOverride,
    ]);

    return (
      <>
        {isDisabled && typeof children === 'string' && (
          <MessageParagraph
            wrap
            disableMargin
          >
            {formattedChildren}
          </MessageParagraph>
        )}
        {!isDisabled && typeof children === 'string' && markdownNode}
      </>
    );
  },
);
