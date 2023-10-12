import React, { useEffect } from 'react';
import { 
  MessageBlock,
  MessageContent,
  MessageMarkdown,
  MessageStyled
} from './styled';
import { MessageVariant } from './types';
import {
  MessageCode, MessageComponentsProps, MessageParagraph, MessagePre, MessageStrong 
} from './components';
import { useScrollbar } from '@/ui/components/scrollbar';
import { Skeleton } from '@/ui/components/skeleton';
import { useTheme } from '@/ui/theme';

export interface MessageProps {
  className?: string;
  variant?: MessageVariant;
  avatar?: React.ReactNode;
  tokens?: React.ReactNode;
  actions?: React.ReactNode;
  components?: MessageComponentsProps;
  typing?: boolean;
  skeleton?: boolean;
  children?: string;
}

export const Message: React.FC<MessageProps> = ({ 
  className,
  variant = 'user',
  avatar,
  tokens,
  actions,
  components = {},
  typing = false,
  skeleton = false,
  children
}) => {
  const theme = useTheme();

  const { lockScroll } = useScrollbar();

  useEffect(() => {
    lockScroll();
  }, [children]);

  return (
    <MessageStyled
      $variant={variant}
      className={className}
    >
      <MessageContent $variant={variant}>
        {avatar}
        <MessageBlock $variant={variant}>
          {typeof children === 'string' && (
            <MessageMarkdown
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
                code: ({ className, inline = false, children }) => {
                  const code = String(children);
                  if (!code) {
                    return null;
                  }
      
                  return (
                    <MessageCode
                      {...components.code}
                      className={className}
                      variant={inline ? 'inline' : 'multiline'}
                      messageVariant={variant}
                    >
                      {code}
                    </MessageCode>
                  );
                }
              }}
            >
              {children}
            </MessageMarkdown>
          )}
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
  );
};

export * from './types';
export * from './styled';
