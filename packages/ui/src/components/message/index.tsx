import React, { ReactNode, useRef } from 'react';
import {
  MessageBlock,
  MessageBlockContent,
  MessageBlockScrollbarWrapper,
  MessageContent,
  MessageName,
  MessageSender,
  MessageStyled,
  MessageTop
} from './styled';
import {
  MessageCodeCopyEventHandler, MessageCopyEventHandler, MessageVariant 
} from './types';
import { Skeleton } from '@/ui/components/skeleton';
import { useTheme } from '@/ui/theme';
import { MessageProvider } from './context';
import { MessageComponentsProps, MessageParagraph } from './components';
import { MessageMarkdown } from './markdown';
import { ScrollbarShadow } from '@/ui/components/scrollbar';

export interface MessageProps {
  className?: string;
  variant?: MessageVariant;
  color?: string;
  name?: string;
  tags?: React.ReactNode;
  avatar?: React.ReactNode;
  transaction?: React.ReactNode;
  actions?: React.ReactNode;
  typing?: boolean;
  skeleton?: boolean;
  buttons?: ReactNode;
  after?: ReactNode;
  components?: MessageComponentsProps;
  children?: ReactNode;
  onCopy?: MessageCopyEventHandler;
  onCodeCopy?: MessageCodeCopyEventHandler;
}

export const Message: React.FC<MessageProps> = ({ 
  className,
  variant = 'user',
  color = 'default',
  name,
  tags,
  avatar,
  transaction,
  actions,
  typing = false,
  skeleton = false,
  buttons,
  after,
  components,
  children,
  onCopy,
  onCodeCopy
}) => {
  const theme = useTheme();
  const messageRef = useRef<HTMLDivElement>(null);

  let hexColor: string;
  switch (variant) {
    case 'user':
      switch (color) {
        case 'default':
          hexColor = theme.colors.accent.primary;
          break;
        case 'green':
          hexColor = theme.colors.gpt3;
          break;
        case 'purple':
          hexColor = theme.colors.gpt4;
          break;
        default:
          hexColor = color;
          break;
      }
      break;
    case 'assistant':
      switch (color) {
        case 'default':
          hexColor = theme.colors.grayScale.gray2;
          break;
        case 'green':
          hexColor = theme.colors.gpt3;
          break;
        case 'purple':
          hexColor = theme.colors.gpt4;
          break;
        default:
          hexColor = color;
          break;
      }
      break;
  }

  return (
    <MessageProvider
      variant={variant}
      color={color}
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
          {(name || transaction) && (
            <MessageTop>
              {typeof name === 'string' && (
                <MessageSender>
                  <MessageName
                    $color={color}
                  >
                    {name}
                  </MessageName>
                  {tags}
                </MessageSender>
              )}
              {typeof name !== 'string' && <div />}
              {transaction}
            </MessageTop>
          )}
          {typeof name !== 'string' && name}
          {avatar}
          <MessageBlock 
            $variant={variant}
            $hexColor={hexColor}
            $skeleton={skeleton}
          >
            <MessageBlockScrollbarWrapper
              scrollShadows={{
                color: hexColor,
                size: 60,
                left: <ScrollbarShadow side="left" />,
                right: <ScrollbarShadow side="right" />
              }}
            >
              <MessageBlockContent>
                {!skeleton && (
                  <>
                    {typeof children === 'string' && (
                      <MessageMarkdown
                        components={components}
                      >
                        {children}
                      </MessageMarkdown>
                    )}
                    {typeof children !== 'string' && children}
                  </>
                )}
                {skeleton && (
                  <MessageParagraph
                    disableMargin
                  >
                    <Skeleton
                      width={260}
                      opacity={[
                        theme.mode === 'light' ? 0.1 : 0.15,
                        theme.mode === 'light' ? 0.225 : 0.45
                      ]}
                      colors={[
                        variant === 'user' ? theme.colors.base.white : (
                          theme.mode === 'light' ? theme.default.colors.base.black : theme.colors.grayScale.gray6
                        )
                      ]}
                    />
                  </MessageParagraph>
                )}
                {after}
              </MessageBlockContent>
            </MessageBlockScrollbarWrapper>
          </MessageBlock>
          {actions}
          {buttons}
        </MessageContent>
      </MessageStyled>
    </MessageProvider>
  );
};

export * from './types';
export * from './styled';
export * from './context';
export * from './list';
export * from './copy';
export * from './markdown';
export * from './components';
export * from './badge-progress';
export * from './button';
export * from './file';
export * from './voice';
