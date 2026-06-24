import React, { forwardRef, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import { useMessage } from '@/ui/components/message/context';
import {
  MessageComponentsProps,
  MessageParagraph,
} from '@/ui/components/message/components';
import { MessageMarkdownLine, MessageMarkdownStyled } from './styled';
import { markdownComponents } from './markdown-components';
import { useMarkdownPlugins } from './useMarkdownPlugins';

function formatString(string: string) {
  return (
    string
      // math formulas
      .replace(/\\$$((.|[\r\n])*?)\\$$/g, (_, content) => `$$${content}$$`)
      .replace(/\\$((.|[\r\n])*?)\\$/g, (_, content) => `$${content}$`)
  );
}

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
        return formatString(children);
      }
      return children;
    }, [children, isDisabled]);

    const { remarkPlugins, rehypePlugins } = useMarkdownPlugins();

    const markdownNode = useMemo(() => {
      const blocks = formattedChildren.split('\n\n');
      const parsedBlocks: string[] = [];
      let inCodeBlock = false;

      for (const block of blocks) {
        if (inCodeBlock) {
          parsedBlocks[parsedBlocks.length - 1] += `${block}\n\n`;
        } else if (block.match(/\n*\s*```/g)) {
          inCodeBlock = !inCodeBlock;

          if (inCodeBlock) {
            parsedBlocks.push(`${block}\n\n`);
          }
        } else {
          parsedBlocks.push(block);
        }
      }

      return (
        <MessageMarkdownStyled ref={ref}>
          {parsedBlocks.map((block, index) => (
            <MessageMarkdownLine
              key={index}
              $typing={disableTyping ? false : typing}
              $color={color}
            >
              <ReactMarkdown
                key={index}
                // @ts-ignore
                remarkPlugins={remarkPlugins}
                // @ts-ignore
                rehypePlugins={rehypePlugins}
                components={markdownComponents(
                  components,
                  componentsOverride,
                  remarkPlugins,
                  rehypePlugins,
                )}
              >
                {block}
              </ReactMarkdown>
            </MessageMarkdownLine>
          ))}
        </MessageMarkdownStyled>
      );
    }, [
      typing,
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
