import React, {
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react';
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
  MessageAvatar,
  MessageStyledWithBottomPanel,
  MessageButtonsStyled
} from './styled';
import {
  MessageActionEventHandler,
  MessageCodeCopyEventHandler,
  MessageCopyEventHandler,
  MessageTimestampPosition,
  MessageVariant,
  MessageVersionEventHandler
} from './types';
import { Skeleton } from '@/ui/components/skeleton';
import { useTheme } from '@/ui/theme';
import { getTgMarkdown } from '@/ui/utils';
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
  disableDownload?: boolean;
  copyPlainText?: string | null;
  copyTgText?: string | null;
  editText?: string | null;
  resendText?: string | null;
  deleteText?: string | null;
  onReportText?: string | null;
  submitEditTooltipLabel?: string | null;
  discardEditTooltipLabel?: string | null;
  updateTooltipLabel?: string | null;
  copyTooltipLabel?: string | null;
  downloadTooltipLabel?: string | null;
  typing?: boolean;
  timestamp?: string | number;
  timestampPosition?: MessageTimestampPosition;
  skeleton?: boolean;
  buttons?: ReactNode;
  after?: ReactNode;
  components?: MessageComponentsProps;
  children?: ReactNode;
  version?: number;
  totalVersions?: number;
  onCopy?: MessageCopyEventHandler;
  onCodeCopy?: MessageCodeCopyEventHandler;
  onEdit?: MessageActionEventHandler;
  onResend?: MessageActionEventHandler;
  onDelete?: MessageActionEventHandler;
  onUpdate?: MessageActionEventHandler;
  onReport?: MessageActionEventHandler;
  onNextVersion?: MessageVersionEventHandler;
  onPrevVersion?: MessageVersionEventHandler;
  onDownload?: () => void;
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
  disableDownload = true,
  copyPlainText,
  copyTgText,
  editText,
  resendText,
  deleteText,
  onReportText,
  downloadTooltipLabel,
  submitEditTooltipLabel,
  discardEditTooltipLabel,
  updateTooltipLabel,
  copyTooltipLabel,
  typing = false,
  timestamp,
  timestampPosition = 'right',
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
  onReport,
  onNextVersion,
  onPrevVersion,
  onDownload
}) => {
  const theme = useTheme();
  const messageRef = useRef<HTMLDivElement | null>(null);
  const messageBlockContentRef = useRef<HTMLDivElement | null>(null);
  const messageText = useRef<string | null>(null);
  const editFieldRef = useRef<HTMLSpanElement | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedText, setEditedText] = useState<string>(content ?? '');
  const handleEditText = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setEditedText(e.target.textContent ?? '');
    },
    []
  );

  const getRichText = useCallback(
    (html: HTMLElement) => {
      const htmlStr = new DOMParser().parseFromString(
        html.innerHTML,
        'text/html'
      );
      const codeNodes = htmlStr.getElementsByTagName('code');
      for (const codeNode of codeNodes) {
        const el = htmlStr.createElement('span');
        el.innerText = codeNode.innerText;
        codeNode.replaceWith(el);
      }
      const clipboardItem = new ClipboardItem({
        'text/plain': new Blob([content!], { type: 'text/plain' }),
        'text/html': new Blob([htmlStr.body.innerHTML], { type: 'text/html' })
      });
      return [clipboardItem];
    },
    [content]
  );

  const getPlainText = useCallback((html: HTMLElement) => {
    const clipboardItem = new ClipboardItem({
      'text/plain': new Blob([html.innerText], { type: 'text/plain' })
    });
    return [clipboardItem];
  }, []);

  const getTgText = useCallback((string: string) => {
    const tgMarkdown = getTgMarkdown(string);

    const clipboardItem = new ClipboardItem({
      'text/plain': new Blob([tgMarkdown], { type: 'text/plain' })
    });
    return [clipboardItem];
  }, []);

  const handlePlainTextCopy = useCallback(() => {
    if (messageBlockContentRef.current) {
      return onCopy?.(getPlainText(messageBlockContentRef.current));
    }
  }, [messageBlockContentRef.current, content]);

  const handleTgTextCopy = useCallback(() => {
    if (messageText.current) {
      return onCopy?.(getTgText(messageText.current));
    }
  }, [messageText.current]);

  const handleRichTextCopy = useCallback(() => {
    if (messageBlockContentRef.current && content) {
      return onCopy?.(getRichText(messageBlockContentRef.current));
    }
  }, [messageBlockContentRef.current, content]);

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
          hexColor =
            theme.mode === 'dark'
              ? theme.colors.grayScale.gray2
              : theme.colors.grayScale.gray3;
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

  useEffect(() => {
    if (!content) return;
    messageText.current = content;
  }, [content]);

  return (
    <MessageProvider
      variant={variant}
      color={color}
      typing={typing}
      onCopy={handlePlainTextCopy}
      onCodeCopy={onCodeCopy}
    >
      <MessageStyledWrapper
        $variant={variant}
        ref={messageRef}
      >
        <MessageStyledWithBottomPanel>
          <MessageStyled
            $variant={variant}
            className={className}
            data-date={timestamp}
          >
            <MessageContent $variant={variant}>
              {name && (
                <MessageTop>
                  {typeof name === 'string' && (
                    <MessageSender>
                      <MessageName $color={color}>{name}</MessageName>
                      {tags}
                    </MessageSender>
                  )}
                  {typeof name !== 'string' && <div />}
                </MessageTop>
              )}
              {typeof name !== 'string' && name}
              <MessageAvatar>{avatar}</MessageAvatar>

              <MessageBlockWrapper>
                <MessageBlock
                  $variant={variant}
                  $hexColor={hexColor}
                  $skeleton={skeleton}
                  $hasTimestamp={!!timestamp}
                  $timestampPosition={timestampPosition}
                >
                  <MessageBlockScrollbarWrapper
                    scrollShadows={{
                      color: hexColor,
                      size: 60,
                      left: <ScrollbarShadow side="left" />,
                      right: <ScrollbarShadow side="right" />
                    }}
                  >
                    <MessageBlockContent
                      ref={messageBlockContentRef}
                      $variant={variant}
                    >
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
                                  theme.mode === 'light' ? 0.225 : 0.45
                                ]}
                                colors={[
                                  variant === 'user'
                                    ? theme.colors.base.white
                                    : theme.mode === 'light'
                                      ? theme.default.colors.base.black
                                      : theme.colors.grayScale.gray6
                                ]}
                              />
                            </MessageParagraph>
                          )}
                          {after}
                        </>
                      ) : (
                        <MessageParagraph disableMargin>
                          <MessageBlockTextArea
                            onInput={handleEditText}
                            ref={editFieldRef}
                          >
                            {content}
                          </MessageBlockTextArea>
                        </MessageParagraph>
                      )}
                    </MessageBlockContent>
                  </MessageBlockScrollbarWrapper>
                  {timestamp && (
                    <MessageTimestamp
                      time={timestamp}
                      position={timestampPosition}
                    />
                  )}
                </MessageBlock>
              </MessageBlockWrapper>
            </MessageContent>
          </MessageStyled>
          <MessageBlockBottomPanel $variant={variant}>
            {!skeleton && (
              <MessageActions
                id={id}
                onDownload={onDownload}
                disableDownload={disableDownload}
                message={content}
                variant={variant}
                skeleton={skeleton}
                disableResend={disableResend}
                disableEdit={disableEdit}
                disableDelete={disableDelete}
                disableUpdate={disableUpdate}
                disableCopy={disableCopy}
                copyPlainText={copyPlainText}
                copyTgText={copyTgText}
                editText={editText}
                resendText={resendText}
                deleteText={deleteText}
                onReportText={onReportText}
                downloadTooltipLabel={downloadTooltipLabel}
                submitEditTooltipLabel={submitEditTooltipLabel}
                discardEditTooltipLabel={discardEditTooltipLabel}
                updateTooltipLabel={updateTooltipLabel}
                copyTooltipLabel={copyTooltipLabel}
                editing={isEditing}
                editedText={editedText}
                messageRef={messageRef}
                onEditing={setIsEditing}
                onEditedText={setEditedText}
                onEdit={onEdit}
                onResend={onResend}
                onDelete={onDelete}
                onUpdate={onUpdate}
                onReport={onReport}
                onPlainTextCopy={handlePlainTextCopy}
                onTgCopy={handleTgTextCopy}
                onCopy={handleRichTextCopy}
              />
            )}
            {transaction && (
              <MessageBlockTransaction>{transaction}</MessageBlockTransaction>
            )}
            <MessageVersions
              id={id}
              version={version}
              totalVersions={totalVersions}
              onNextVersion={onNextVersion}
              onPrevVersion={onPrevVersion}
              editing={isEditing}
              variant={variant}
            />
          </MessageBlockBottomPanel>
          <MessageButtonsStyled>{buttons}</MessageButtonsStyled>
        </MessageStyledWithBottomPanel>
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
export * from './reasoning-block';
export * from './search-results';
export * from './video';
