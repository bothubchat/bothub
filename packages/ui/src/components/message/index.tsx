import React, { ReactNode, useMemo, useRef } from 'react';
import {
  MessageBlock,
  MessageBlockBottomPanel,
  MessageBlockTransaction,
  MessageBlockContent,
  MessageBlockScrollbarWrapper,
  MessageBlockWrapper,
  MessageContent,
  MessageName,
  MessageSender,
  MessageStyled,
  MessageStyledWrapper,
  MessageTop,
  MessageAvatar,
  MessageStyledWithBottomPanel,
  MessageButtonsStyled,
  MessageAvatarWrapper,
} from './styled';
import {
  MessageActionEventHandler,
  MessageCodeCopyEventHandler,
  MessageCopyEventHandler,
  MessageTimestampPosition,
  MessageVariant,
  MessageVersionEventHandler,
} from './types';
import { Loader } from '@/ui/components/loader';
import { Skeleton } from '@/ui/components/skeleton';
import { useTheme } from '@/ui/theme';
import {
  CLIPBOARD_NORMAL_STYLE,
  colorToRgba,
  getTgMarkdown,
  prepareClipboardHtml,
  useEventCallback,
} from '@/ui/utils';
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
  edited?: boolean;
  editedText?: string;
  disableModal?: boolean;
  disableResend?: boolean;
  disableEdit?: boolean;
  disableDelete?: boolean;
  disableUpdate?: boolean;
  disableCopy?: boolean;
  disableFork?: boolean;
  disableDownload?: boolean;
  disableEncryption?: boolean;
  hasCacheTokens?: boolean;
  forkSelected?: boolean;
  copyPlainText?: string | null;
  copyTgText?: string | null;
  editText?: string | null;
  editOutOfMenu?: boolean;
  resendText?: string | null;
  deleteText?: string | null;
  onReportText?: string | null;
  updateTooltipLabel?: string | null;
  copyTooltipLabel?: string | null;
  forkTooltipLabel?: string | null;
  downloadTooltipLabel?: string | null;
  encryptionTooltipLabel?: string | null;
  cacheTokenTooltipLabel?: string | null;
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
  hideActions?: boolean;
  loader?: boolean;
  onCopy?: MessageCopyEventHandler;
  onCodeCopy?: MessageCodeCopyEventHandler;
  onEdit?: MessageActionEventHandler;
  // onResend?: MessageActionEventHandler;
  onDelete?: MessageActionEventHandler;
  onUpdate?: MessageActionEventHandler;
  onReport?: MessageActionEventHandler;
  onFork?: MessageActionEventHandler;
  onNextVersion?: MessageVersionEventHandler;
  onPrevVersion?: MessageVersionEventHandler;
  onDownload?: () => void;
}

const getRichText = async (text: string) => {
  // marked is needed only here, so it is loaded on the first rich copy.
  const { marked } = await import('marked');
  const htmlContent = prepareClipboardHtml(
    (await marked.parse(text)).replace(
      /<p>([\s\S]*?)<\/p>/g,
      `<pre style="${CLIPBOARD_NORMAL_STYLE}font-family:inherit;white-space:pre-wrap;">$1</pre>`,
    ),
  );

  const clipboardItem = new ClipboardItem({
    'text/plain': new Blob([text], { type: 'text/plain' }),
    'text/html': new Blob([htmlContent], { type: 'text/html' }),
  });
  return [clipboardItem];
};

const getPlainText = (html: HTMLElement) => {
  const clipboardItem = new ClipboardItem({
    'text/plain': new Blob([html.innerText.replace(/\n{3,}/g, '\n\n')], {
      type: 'text/plain',
    }),
  });
  return [clipboardItem];
};

const getTgText = (string: string) => {
  const tgMarkdown = getTgMarkdown(string);

  const clipboardItem = new ClipboardItem({
    'text/plain': new Blob([tgMarkdown], { type: 'text/plain' }),
  });
  return [clipboardItem];
};

const isSupportedColor = (color: string) =>
  typeof CSS === 'object' &&
  typeof CSS.supports === 'function' &&
  CSS.supports('background', color);

const MessageBase: React.FC<MessageProps> = ({
  id,
  content,
  className,
  variant = 'user',
  color: colorProp = 'default',
  name,
  tags,
  avatar,
  transaction,
  edited = false,
  editedText,
  disableModal = false,
  disableResend = false,
  disableEdit = false,
  disableDelete = false,
  disableUpdate = false,
  disableCopy = false,
  disableFork = true,
  disableDownload = true,
  disableEncryption = true,
  hasCacheTokens = false,
  forkSelected = false,
  editOutOfMenu = false,
  copyPlainText,
  copyTgText,
  editText,
  resendText,
  deleteText,
  onReportText,
  downloadTooltipLabel,
  updateTooltipLabel,
  copyTooltipLabel,
  forkTooltipLabel,
  encryptionTooltipLabel,
  cacheTokenTooltipLabel,
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
  hideActions,
  loader,
  onCopy,
  onCodeCopy,
  onEdit,
  // onResend,
  onDelete,
  onUpdate,
  onReport,
  onFork,
  onNextVersion,
  onPrevVersion,
  onDownload,
}) => {
  const theme = useTheme();
  const messageRef = useRef<HTMLDivElement | null>(null);
  const messageBlockContentRef = useRef<HTMLDivElement | null>(null);
  // The handlers keep their identity, so the context and the memoized
  // children don't rerender on every streaming chunk, and they always read
  // the latest content and onCopy.
  const handlePlainTextCopy = useEventCallback(() => {
    if (messageBlockContentRef.current) {
      return onCopy?.(getPlainText(messageBlockContentRef.current));
    }
  });

  const handleTgTextCopy = useEventCallback(() => {
    if (content) {
      return onCopy?.(getTgText(content));
    }
  });

  const handleRichTextCopy = useEventCallback(async () => {
    if (content) {
      return onCopy?.(await getRichText(content));
    }
  });

  const handleCodeCopy = useEventCallback(onCodeCopy);

  const color = useMemo(
    () => (colorProp && isSupportedColor(colorProp) ? colorProp : 'default'),
    [colorProp],
  );

  const hexColor = useMemo(() => {
    switch (variant) {
      case 'user':
        switch (color) {
          case 'default':
            if (theme.scheme === 'custom') {
              return theme.colors.custom.message.user.background;
            }
            if (theme.scheme === 'standard') {
              return theme.mode === 'dark'
                ? colorToRgba(theme.colors.accent.primaryLight, 0.5)
                : colorToRgba(theme.colors.accent.primaryLight, 0.2);
            }
            return theme.colors.accent.primary;
          case 'green':
            return theme.colors.gpt3;
          case 'purple':
            return theme.colors.gpt4;
          default:
            return color;
        }
      case 'assistant':
        switch (color) {
          case 'default':
            return theme.tokens.borderSecondary;
          case 'green':
            return theme.colors.gpt3;
          case 'purple':
            return theme.colors.gpt4;
          default:
            return color;
        }
    }
  }, [variant, color, theme]);

  const scrollShadows = useMemo(
    () => ({
      color: hexColor,
      size: 60,
      left: <ScrollbarShadow side="left" />,
      right: <ScrollbarShadow side="right" />,
    }),
    [hexColor],
  );

  return (
    <MessageProvider
      variant={variant}
      color={color}
      typing={typing}
      onCopy={handlePlainTextCopy}
      // Stays undefined without a handler, as before.
      onCodeCopy={onCodeCopy && handleCodeCopy}
    >
      <MessageStyledWrapper
        $variant={variant}
        $forkSelected={forkSelected}
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
              <MessageAvatarWrapper $variant={variant}>
                <MessageAvatar>{avatar}</MessageAvatar>
              </MessageAvatarWrapper>

              <MessageBlockWrapper>
                <MessageBlock
                  $variant={variant}
                  $hexColor={hexColor}
                  $skeleton={skeleton}
                  $hasTimestamp={!!timestamp}
                  $timestampPosition={timestampPosition}
                >
                  <MessageBlockScrollbarWrapper scrollShadows={scrollShadows}>
                    <MessageBlockContent
                      ref={messageBlockContentRef}
                      $variant={variant}
                    >
                      <>
                        {!skeleton &&
                          (!loader ? (
                            <>
                              {typeof children === 'string' && (
                                <MessageMarkdown components={components}>
                                  {children}
                                </MessageMarkdown>
                              )}
                              {typeof children !== 'string' && children}
                            </>
                          ) : (
                            <MessageParagraph disableMargin>
                              <Loader />
                            </MessageParagraph>
                          ))}
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
                                  : theme.tokens.textSecondary,
                              ]}
                            />
                          </MessageParagraph>
                        )}
                        {after}
                      </>
                    </MessageBlockContent>
                    {variant === 'user' && (
                      <MessageTimestamp
                        edited={edited}
                        editedText={editedText}
                        time={timestamp}
                        position={timestampPosition}
                        color={hexColor}
                      />
                    )}
                  </MessageBlockScrollbarWrapper>
                </MessageBlock>
              </MessageBlockWrapper>
              {timestamp && variant === 'assistant' && (
                <MessageTimestamp
                  time={timestamp}
                  position={timestampPosition}
                  color={hexColor}
                />
              )}
              <MessageBlockBottomPanel $variant={variant}>
                {transaction && (
                  <MessageBlockTransaction>
                    {transaction}
                  </MessageBlockTransaction>
                )}
                {!skeleton && !hideActions && (
                  <MessageActions
                    id={id}
                    onDownload={onDownload}
                    disableDownload={disableDownload}
                    message={content}
                    variant={variant}
                    skeleton={skeleton}
                    disableModal={disableModal}
                    disableResend={disableResend}
                    disableEdit={disableEdit}
                    disableDelete={disableDelete}
                    disableUpdate={disableUpdate}
                    disableCopy={disableCopy}
                    disableFork={disableFork}
                    disableEncryption={disableEncryption}
                    hasCacheTokens={hasCacheTokens}
                    forkSelected={forkSelected}
                    editOutOfMenu={editOutOfMenu}
                    copyPlainText={copyPlainText}
                    copyTgText={copyTgText}
                    editText={editText}
                    resendText={resendText}
                    deleteText={deleteText}
                    onReportText={onReportText}
                    downloadTooltipLabel={downloadTooltipLabel}
                    updateTooltipLabel={updateTooltipLabel}
                    copyTooltipLabel={copyTooltipLabel}
                    forkTooltipLabel={forkTooltipLabel}
                    encryptionTooltipLabel={encryptionTooltipLabel}
                    cacheTokenTooltipLabel={cacheTokenTooltipLabel}
                    onEdit={onEdit}
                    onResend={onUpdate}
                    onDelete={onDelete}
                    onUpdate={onUpdate}
                    onReport={onReport}
                    onFork={onFork}
                    onPlainTextCopy={handlePlainTextCopy}
                    onTgCopy={handleTgTextCopy}
                    onCopy={handleRichTextCopy}
                  />
                )}

                <MessageVersions
                  id={id}
                  version={version}
                  totalVersions={totalVersions}
                  onNextVersion={onNextVersion}
                  onPrevVersion={onPrevVersion}
                  variant={variant}
                />
              </MessageBlockBottomPanel>
            </MessageContent>
          </MessageStyled>
          <MessageButtonsStyled>{buttons}</MessageButtonsStyled>
        </MessageStyledWithBottomPanel>
      </MessageStyledWrapper>
    </MessageProvider>
  );
};

// While a reply streams, only the message whose props changed rerenders.
export const Message: React.FC<MessageProps> = React.memo(MessageBase);
Message.displayName = 'Message';

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
export * from './music';
