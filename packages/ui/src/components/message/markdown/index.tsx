import React, { useCallback, useMemo, useState } from 'react';
import remarkGfm from 'remark-gfm';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import { useMessage } from '@/ui/components/message/context';
import {
  MessageComponentsProps, 
  MessageParagraph, 
} from '@/ui/components/message/components';
import { useTheme } from '@/ui/theme';
import { MessageMarkdownLine, MessageMarkdownStyled } from './styled';
import { markdownComponents } from './markdown-components';

function formatString(string: string) {
  return string
    // math formulas
    .replace(/\\\[((.|[\r\n])*?)\\\]/g, (_, content) => `$$${content}$$`)
    .replace(/\\\(((.|[\r\n])*?)\\\)/g, (_, content) => `$$${content}$$`);
}

export interface MessageMarkdownProps {
  children: string;
  components?: MessageComponentsProps;
}

export const MessageMarkdown: React.FC<MessageMarkdownProps> = ({
  children,
  components = {}
}) => {
  const { typing, variant, color } = useMessage();
  const isDisabled = variant === 'user';
  const theme = useTheme();
  const [singleDollarTextMath, setSingleDollarTextMath] = useState(true);

  const formattedChildren = useMemo(() => {
    if (typeof children === 'string' && !isDisabled) {
      return formatString(children);
    }
    return children;
  }, [children, isDisabled]);

  const handleKatexStrict = useCallback(() => {
    if (singleDollarTextMath) queueMicrotask(() => setSingleDollarTextMath(false));
  }, [singleDollarTextMath]);

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
      <MessageMarkdownStyled>
        {parsedBlocks.map((block, index) => (
          <MessageMarkdownLine
            $typing={typing}
            $color={color}
            $singleDollarTextMath={singleDollarTextMath}
            key={index}
            remarkPlugins={[remarkGfm, [remarkMath, { singleDollarTextMath }]]}
            // @ts-ignore
            rehypePlugins={[[rehypeKatex, {
              displayMode: true,
              output: 'html',
              errorColor: theme.colors.orange,
              strict: handleKatexStrict,
            }]]}
            components={markdownComponents(components)}
          >
            {block}
          </MessageMarkdownLine>
        ))}
      </MessageMarkdownStyled>
    );
  }, [typing, formattedChildren, handleKatexStrict, singleDollarTextMath]);

  return (
    <>
      {(isDisabled && typeof children === 'string') && (
        <MessageParagraph
          wrap
          disableMargin
        >
          {formattedChildren}
        </MessageParagraph>
      )}
      {(!isDisabled && typeof children === 'string') && markdownNode}
    </>
  );
};
