import React, { useMemo } from 'react';
import { useMessage } from '@/ui/components/message/context';
import {
  MessageComponentsProps,
  MessageParagraph
} from '@/ui/components/message/components';
import { MessageMarkdownLine, MessageMarkdownStyled } from './styled';
import { markdownComponents } from './markdown-components';
import { useMarkdownPlugins } from './useMarkdownPlugins';

function formatString(string: string) {
  return (
    string
      // math formulas
      .replace(/\\\[((.|[\r\n])*?)\\\]/g, (_, content) => `$$${content}$$`)
      .replace(/\\\(((.|[\r\n])*?)\\\)/g, (_, content) => `$$${content}$$`)
      .replace(/<!--.*-->/g, '')
  );
}

export interface MessageMarkdownProps {
  children: string;
  components?: MessageComponentsProps;
  componentsOverride?: React.ComponentProps<
    typeof MessageMarkdownLine
  >['components'];
}

export const MessageMarkdown: React.FC<MessageMarkdownProps> = ({
  children,
  components = {},
  componentsOverride = {}
}) => {
  const { typing, variant, color } = useMessage();
  const isDisabled = variant === 'user';

  const formattedChildren = useMemo(() => {
    if (typeof children === 'string' && !isDisabled) {
      return formatString(children);
    }
    return children;
  }, [children, isDisabled]);

  const { remarkPlugins, rehypePlugins, singleDollarTextMath } =
    useMarkdownPlugins({
      children: formattedChildren
    });

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
            key={`${rehypePlugins.length}-${remarkPlugins.length}-${index}`}
            // @ts-ignore
            remarkPlugins={remarkPlugins}
            // @ts-ignore
            rehypePlugins={rehypePlugins}
            components={markdownComponents(components, componentsOverride)}
          >
            {block}
          </MessageMarkdownLine>
        ))}
      </MessageMarkdownStyled>
    );
  }, [
    typing,
    formattedChildren,
    singleDollarTextMath,
    remarkPlugins,
    rehypePlugins
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
};
