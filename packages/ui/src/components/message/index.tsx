import React, { ReactNode, useRef } from 'react';
import {
  MessageBlock,
  MessageBlockContent,
  MessageBlockScrollbarWrapper,
  MessageContent,
  MessageName,
  MessageSender,
  MessageStyled,
  MessageTop,
} from './styled';
import {
  MessageActionEventHandler,
  MessageCodeCopyEventHandler,
  MessageVariant,
} from './types';
import { Skeleton } from '@/ui/components/skeleton';
import { useTheme } from '@/ui/theme';
import { MessageProvider } from './context';
import { MessageComponentsProps, MessageParagraph } from './components';
import { MessageMarkdown } from './markdown';
import { ScrollbarShadow } from '@/ui/components/scrollbar';
import { MessageTimestamp } from './timestamp';
import { MessageActions } from './actions';

export interface MessageProps {
  id?: string;
  content?: string;
  className?: string;
  variant?: MessageVariant;
  color?: string;
  name?: string;
  tags?: React.ReactNode;
  avatar?: React.ReactNode;
  transaction?: React.ReactNode;
  disableResend?: boolean;
  disableEdit?: boolean;
  disableDelete?: boolean;
  disableUpdate?: boolean;
  disableCopy?: boolean;
  editText?: string;
  resendText?: string;
  deleteText?: string;
  updateTooltipLabel?: string;
  copyTooltipLabel?: string;
  typing?: boolean;
  timestamp?: string;
  skeleton?: boolean;
  buttons?: ReactNode;
  after?: ReactNode;
  components?: MessageComponentsProps;
  children?: ReactNode;
  onCopy?: MessageActionEventHandler;
  onCodeCopy?: MessageCodeCopyEventHandler;
  onEdit?: MessageActionEventHandler;
  onResend?: MessageActionEventHandler;
  onDelete?: MessageActionEventHandler;
  onUpdate?: MessageActionEventHandler;
}

export const Message: React.FC<MessageProps> = ({
  id,
  content,
  className,
  variant = 'user',
  color = 'default',
  name,
  tags,
  avatar,
  transaction,
  disableResend = false,
  disableEdit = false,
  disableDelete = false,
  disableUpdate = false,
  disableCopy = false,
  editText,
  resendText,
  deleteText,
  updateTooltipLabel,
  copyTooltipLabel,
  typing = false,
  timestamp,
  skeleton = false,
  buttons,
  after,
  components,
  children,
  onCopy,
  onCodeCopy,
  onEdit,
  onResend,
  onDelete,
  onUpdate,
}) => {
  const theme = useTheme();
  const messageRef = useRef<HTMLDivElement>(null);

  if (
    !(
      color
      && typeof CSS === 'object'
      && typeof CSS.supports === 'function'
      && CSS.supports('background', color ?? '#000')
    )
  ) {
    color = 'default';
  }

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
      onCodeCopy={onCodeCopy}
    >
      <MessageStyled $variant={variant} ref={messageRef} className={className}>
        <MessageContent $variant={variant}>
          {(name || transaction) && (
            <MessageTop>
              {typeof name === 'string' && (
                <MessageSender>
                  <MessageName $color={color}>{name}</MessageName>
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
            $hasTimestamp={!!timestamp}
          >
            <MessageBlockScrollbarWrapper
              scrollShadows={{
                color: hexColor,
                size: 60,
                left: <ScrollbarShadow side="left" />,
                right: <ScrollbarShadow side="right" />,
              }}
            >
              <MessageBlockContent>
                {!skeleton && (
                  <>
                    {typeof children === 'string' && (
                      <MessageMarkdown components={components}>
                        {children}
                      </MessageMarkdown>
                    )}
                    {typeof children !== 'string' && children}
                  </>
                )}
                {skeleton && (
                  <MessageParagraph disableMargin>
                    <Skeleton
                      width={260}
                      opacity={[
                        theme.mode === 'light' ? 0.1 : 0.15,
                        theme.mode === 'light' ? 0.225 : 0.45,
                      ]}
                      colors={[
                        variant === 'user'
                          ? theme.colors.base.white
                          : theme.mode === 'light'
                            ? theme.default.colors.base.black
                            : theme.colors.grayScale.gray6,
                      ]}
                    />
                  </MessageParagraph>
                )}
                {after}
              </MessageBlockContent>
            </MessageBlockScrollbarWrapper>
            {timestamp && <MessageTimestamp time={timestamp} />}
          </MessageBlock>
          {buttons}
        </MessageContent>
        <MessageActions
          id={id}
          message={content}
          variant={variant}
          disableResend={disableResend}
          disableEdit={disableEdit}
          disableDelete={disableDelete}
          disableUpdate={disableUpdate}
          disableCopy={disableCopy}
          editText={editText}
          resendText={resendText}
          deleteText={deleteText}
          updateTooltipLabel={updateTooltipLabel}
          copyTooltipLabel={copyTooltipLabel}
          onEdit={onEdit}
          onResend={onResend}
          onDelete={onDelete}
          onUpdate={onUpdate}
          onCopy={onCopy}
        />
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
