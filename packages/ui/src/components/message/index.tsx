import React, { ReactNode, useRef } from 'react';
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
import { colorToRgba } from '@/ui/utils';
import { MessageProvider } from './context';
import { MessageComponentsProps, MessageParagraph } from './components';
import { MessageMarkdown } from './markdown';
import { ScrollbarShadow } from '@/ui/components/scrollbar';
import { MessageTimestamp } from './timestamp';
import { MessageActions } from './actions';
import { MessageVersions } from './versions';
import { useMessageClipboard } from './hooks/useMessageClipboard';

const resolveMessageHexColor = (
  variant: MessageVariant,
  color: string,
  scheme: string,
  mode: string,
  theme: ReturnType<typeof useTheme>,
) => {
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
          return mode === 'dark'
            ? theme.colors.grayScale.gray2
            : theme.colors.grayScale.gray3;
        case 'green':
          return theme.colors.gpt3;
        case 'purple':
          return theme.colors.gpt4;
        default:
          return color;
      }
    default:
      return scheme === 'custom' ? theme.colors.custom.background : color;
  }
};

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
  disableDownload?: boolean;
  disableEncryption?: boolean;
  hasCacheTokens?: boolean;
  copyPlainText?: string | null;
  copyTgText?: string | null;
  editText?: string | null;
  editOutOfMenu?: boolean;
  resendText?: string | null;
  deleteText?: string | null;
  onReportText?: string | null;
  updateTooltipLabel?: string | null;
  copyTooltipLabel?: string | null;
  downloadTooltipLabel?: string | null;
  encryptionTooltipLabel?: string | null;
  cacheTokenTooltipLabel?: string | null;
  menuAriaLabel?: string | null;
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
  edited = false,
  editedText,
  disableModal = false,
  disableResend = false,
  disableEdit = false,
  disableDelete = false,
  disableUpdate = false,
  disableCopy = false,
  disableDownload = true,
  disableEncryption = true,
  hasCacheTokens = false,
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
  encryptionTooltipLabel,
  cacheTokenTooltipLabel,
  menuAriaLabel,
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
  onResend,
  onDelete,
  onUpdate,
  onReport,
  onNextVersion,
  onPrevVersion,
  onDownload,
}) => {
  const theme = useTheme();
  const messageRef = useRef<HTMLDivElement | null>(null);
  const {
    messageBlockContentRef,
    handlePlainTextCopy,
    handleTgTextCopy,
    handleRichTextCopy,
  } = useMessageClipboard({
    content,
    onCopy,
  });

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

  const hexColor = resolveMessageHexColor(
    variant,
    color,
    theme.scheme,
    theme.mode,
    theme,
  );

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
                  <MessageBlockScrollbarWrapper
                    scrollShadows={{
                      color: hexColor,
                      size: 60,
                      left: <ScrollbarShadow side="left" />,
                      right: <ScrollbarShadow side="right" />,
                    }}
                  >
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
                                  : theme.mode === 'light'
                                    ? theme.default.colors.base.black
                                    : theme.colors.grayScale.gray6,
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
                    disableEncryption={disableEncryption}
                    hasCacheTokens={hasCacheTokens}
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
                    encryptionTooltipLabel={encryptionTooltipLabel}
                    cacheTokenTooltipLabel={cacheTokenTooltipLabel}
                    menuAriaLabel={menuAriaLabel}
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
