import React, { ReactNode, useEffect, useRef, useState } from 'react';
import {
  MessageBlock,
  MessageBlockBottomPanel,
  MessageBlockTransaction,
  MessageBlockContent,
  MessageBlockScrollbarWrapper,
  MessageBlockTextArea,
  MessageBlockWrapper,
  MessageContent,
  MessageName,
  MessageSender,
  MessageStyled,
  MessageStyledWrapper,
  MessageTop,
} from './styled';
import {
  MessageActionEventHandler,
  MessageCodeCopyEventHandler,
  MessageVariant,
  MessageVersionEventHandler,
} from './types';
import { Skeleton } from '@/ui/components/skeleton';
import { useTheme } from '@/ui/theme';
import { MessageProvider } from './context';
import { MessageComponentsProps, MessageParagraph } from './components';
import { MessageMarkdown } from './markdown';
import { ScrollbarShadow } from '@/ui/components/scrollbar';
import { MessageTimestamp } from './timestamp';
import { MessageActions } from './actions';
import { MessageVersions } from './versions';

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
  submitEditTooltipLabel?: string;
  discardEditTooltipLabel?: string;
  updateTooltipLabel?: string;
  copyTooltipLabel?: string;
  typing?: boolean;
  timestamp?: string;
  skeleton?: boolean;
  buttons?: ReactNode;
  after?: ReactNode;
  components?: MessageComponentsProps;
  children?: ReactNode;
  version?: number;
  totalVersions?: number;
  onCopy?: MessageActionEventHandler;
  onCodeCopy?: MessageCodeCopyEventHandler;
  onEdit?: MessageActionEventHandler;
  onResend?: MessageActionEventHandler;
  onDelete?: MessageActionEventHandler;
  onUpdate?: MessageActionEventHandler;
  onNextVersion?: MessageVersionEventHandler;
  onPrevVersion?: MessageVersionEventHandler;
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
  submitEditTooltipLabel,
  discardEditTooltipLabel,
  updateTooltipLabel,
  copyTooltipLabel,
  typing = false,
  timestamp,
  skeleton = false,
  buttons,
  after,
  components,
  children,
  version,
  totalVersions,
  onCopy,
  onCodeCopy,
  onEdit,
  onResend,
  onDelete,
  onUpdate,
  onNextVersion,
  onPrevVersion,
}) => {
  const theme = useTheme();
  const messageRef = useRef<HTMLDivElement | null>(null);

  const editFieldRef = useRef<HTMLSpanElement | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedText, setEditedText] = useState<string>(content ?? '');
  const handleEditText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedText(e.target.innerText);
  };

  if (
    !(
      color &&
      typeof CSS === 'object' &&
      typeof CSS.supports === 'function' &&
      CSS.supports('background', color ?? '#000')
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

  useEffect(() => {
    if (editFieldRef.current) {
      editFieldRef.current.focus();
      const range = document.createRange();
      const selection = window.getSelection();
      range.selectNodeContents(editFieldRef.current);
      range.collapse(false);
      selection?.removeAllRanges();
      selection?.addRange(range);
    }
  }, [editFieldRef, isEditing]);

  return (
    <MessageProvider
      variant={variant}
      color={color}
      typing={typing}
      onCodeCopy={onCodeCopy}
    >
      <MessageStyledWrapper>
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
                    <MessageName $color={color}>{name}</MessageName>
                    {tags}
                  </MessageSender>
                )}
                {typeof name !== 'string' && <div />}
                <MessageBlockTransaction $top>{transaction}</MessageBlockTransaction>
              </MessageTop>
            )}
            {typeof name !== 'string' && name}
            {avatar}
            <MessageBlockWrapper>
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
                    {!isEditing ? (
                      <>
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
                      </>
                    ) : (
                      <MessageBlockTextArea
                        onInput={handleEditText}
                        ref={editFieldRef}
                      >
                        {children}
                      </MessageBlockTextArea>
                    )}
                  </MessageBlockContent>
                </MessageBlockScrollbarWrapper>
                {timestamp && <MessageTimestamp time={timestamp} />}
              </MessageBlock>
            </MessageBlockWrapper>
            {buttons}
          </MessageContent>
          {!skeleton && (
            <MessageActions
              id={id}
              message={content}
              variant={variant}
              skeleton={skeleton}
              disableResend={disableResend}
              disableEdit={disableEdit}
              disableDelete={disableDelete}
              disableUpdate={disableUpdate}
              disableCopy={disableCopy}
              editText={editText}
              resendText={resendText}
              deleteText={deleteText}
              submitEditTooltipLabel={submitEditTooltipLabel}
              discardEditTooltipLabel={discardEditTooltipLabel}
              updateTooltipLabel={updateTooltipLabel}
              copyTooltipLabel={copyTooltipLabel}
              editing={isEditing}
              editedText={editedText}
              setEditing={setIsEditing}
              setEditedText={setEditedText}
              onEdit={onEdit}
              onResend={onResend}
              onDelete={onDelete}
              onUpdate={onUpdate}
              onCopy={onCopy}
            />
          )}
        </MessageStyled>
        <MessageBlockBottomPanel>
          <MessageBlockTransaction>{transaction}</MessageBlockTransaction>
          <MessageVersions
            id={id}
            version={version}
            totalVersions={totalVersions}
            onNextVersion={onNextVersion}
            onPrevVersion={onPrevVersion}
            editing={isEditing}
          />
        </MessageBlockBottomPanel>
      </MessageStyledWrapper>
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
