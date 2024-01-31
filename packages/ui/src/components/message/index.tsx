import React, { ReactNode, useMemo, useRef } from 'react';
import remarkGfm from 'remark-gfm';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import { 
  MessageBlock,
  MessageContent,
  MessageMarkdown,
  MessageStyled
} from './styled';
import { MessageCopyEventHandler, MessageVariant } from './types';
import {
  MessageCode, 
  MessageComponentsProps, 
  MessageParagraph,
  MessagePre, 
  MessageStrong, 
} from './components';
import { Skeleton } from '@/ui/components/skeleton';
import { useTheme } from '@/ui/theme';
import { MessageProvider, useMessage } from './context';
import {
  Table,
  TableBody, TableCell, TableHead, TableRow 
} from '../table';

export interface MessageProps {
  className?: string;
  variant?: MessageVariant;
  avatar?: React.ReactNode;
  tokens?: React.ReactNode;
  actions?: React.ReactNode;
  typing?: boolean;
  skeleton?: boolean;
  children?: ReactNode;
  onCopy?: MessageCopyEventHandler;
  onCodeCopy?: MessageCopyEventHandler;
}

export interface MessageTextProps {
  children: string;
  components?: MessageComponentsProps
}

export const MessageText: React.FC<MessageTextProps> = ({
  children, 
  components = {} 
}) => {
  const { typing, variant } = useMessage();
  const markdown = variant === 'user';
  
  const formattedChildren = useMemo(() => {
    if (typeof children === 'string' && !markdown) {
      return children.replace(/\\\[((.|[\r\n])*?)\\\]/g, (_, content) => `$$${content}$$`)
        .replace(/\\\(((.|[\r\n])*?)\\\)/g, (_, content) => `$${content}$`);
    }
    return children;
  }, [children, markdown]);

  return (
    <>
      {(markdown && typeof children === 'string') && (
        <MessageParagraph
          wrap
          disableMargin
        >
          {formattedChildren}
        </MessageParagraph>
      )}
      {(!markdown && typeof children === 'string') && (
        <MessageMarkdown
          remarkPlugins={[remarkGfm, remarkMath]}
          // @ts-ignore
          rehypePlugins={[rehypeKatex]}
          $typing={typing}
          components={{
            p: ({ className, children }) => (
              <MessageParagraph 
                {...components.paragraph}
                className={className}
              >
                {children}
              </MessageParagraph>
            ),
            strong: ({ className, children }) => (
              <MessageStrong
                {...components.strong} 
                className={className}
              >
                {children}
              </MessageStrong>
            ),
            pre: ({ className, children }) => (
              <MessagePre 
                {...components.pre}
                className={className}
              >
                {children}
              </MessagePre>
            ),
            tr: ({ className, children }) => (
              <TableRow className={className}>
                {children}
              </TableRow>
            ),
            td: ({ className, children }) => (
              <TableCell className={className}>
                {children}
              </TableCell>
            ),
            th: ({ className, children }) => (
              <TableCell className={className}>
                {children}
              </TableCell>
            ),
            thead: ({ className, children }) => (
              <TableHead className={className}>
                {children}
              </TableHead>
            ),
            tbody: ({ className, children }) => (
              <TableBody className={className}>
                {children}
              </TableBody>
            ),
            table: ({ children }) => (
              <Table>
                {children}
              </Table>
            ),
            code: ({ className, children }) => {
              const code = String(children);
              if (!code) {
                return null;
              }
  
              const match = /language-(\w+)/.exec(className || '');
          
              return (
                match ? (
                  <MessageCode
                    {...components.code}
                    className={className}
                    messageVariant={variant}
                  >
                    {code}
                  </MessageCode>
                ) : (
                  <MessageCode
                    {...components.code}
                    className={className}
                    variant="inline"
                    messageVariant={variant}
                  >
                    {code}
                  </MessageCode> 
                )
              );
            }
          }}
        >
          {formattedChildren}
        </MessageMarkdown>
      )}
    </>
  );
};

export const Message: React.FC<MessageProps> = ({ 
  className,
  variant = 'user',
  avatar,
  tokens,
  actions,
  typing = false,
  skeleton = false,
  children,
  onCopy,
  onCodeCopy
}) => {
  const theme = useTheme();
  const messageRef = useRef<HTMLDivElement>(null);

  return (
    <MessageProvider
      variant={variant}
      message=""
      typing={typing}
      onCopy={onCopy}
      onCodeCopy={onCodeCopy}
    >
      <MessageStyled
        $variant={variant}
        ref={messageRef}
        className={className}
      >
        <MessageContent $variant={variant}>
          {avatar}
          <MessageBlock $variant={variant}>
            {children}
            {skeleton && (
              <MessageParagraph
                disableMargin
              >
                <Skeleton
                  width={260}
                  opacity={[
                    0.15,
                    0.45
                  ]}
                  colors={[
                    theme.colors.base.white
                  ]}
                />
              </MessageParagraph>
            )}
          </MessageBlock>
          {tokens}
          {actions}
        </MessageContent>
      </MessageStyled>
    </MessageProvider>
  );
};

export * from './types';
export * from './styled';
export * from './context';
export * from './copy';
