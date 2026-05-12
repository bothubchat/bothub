import React, { useState, useCallback, useEffect, useRef } from 'react';
import {
  InputMessageButtons,
  InputMessageConcatenateWarning,
  InputMessageContent,
  InputMessageMain,
  InputMessageSendButton,
  InputMessageSendIcon,
  InputMessageStyled,
  InputMessageTextArea,
  InputMessageUploadFileInput,
  InputMessageVoiceButton,
  InputMessageVoiceFileDelete,
  InputMessageVoiceFiles,
  InputMessageVoicePauseButton,
  InputMessageVoicePlayButton,
  InputMessageVoiceRecord,
  InputMessageVoiceRecordDot,
  InputMessageVoiceRecordTimeText,
  InputMessageVoiceTrack,
  InputMessageUploadFileLabel,
  InputMessageUploadFile,
  InputMessageCloseEditButton,
  InputMessageEditWrapper,
  InputMessageContentWrapper,
  InputMessageContentActionText,
  InputMessageContentTextFiles,
  InputMessageContentTextMessage,
  InputMessageContentTextWrapper,
  InputMessageContentInfo,
  InputMessageActions,
} from './styled';
import { MessageVoice } from '../message';
import { AttachIcon } from '@/ui/icons/attach';
import { useTheme } from '@/ui/theme';
import {
  EditingProps,
  IConfigureOption,
  IInputMessageFile,
  IInputMessageVoiceFile,
  InputMessageErrorEvent,
} from './types';
import { formatSeconds } from '@/ui/utils';
import { useVoice } from './use-voice';
import { useFiles } from './use-files';
import { useInput, type MessageSubmitKey } from './use-input';
import { InputMessageFiles } from './input-files';
import { IconProvider } from '../icon';
import { CheckSmallIcon, CloseIcon, EditIcon } from '@/ui/icons';

export type InputMessageChangeEventHandler = (message: string) => unknown;

export type InputMessageFilesChangeEventHandler = (
  files: IInputMessageFile[],
) => unknown;

export type InputMessageVoiceFilesChangeEventHandler = (
  files: IInputMessageVoiceFile[],
) => unknown;

export type InputMessageSendEventHandler = (
  message: string,
  files: IInputMessageFile[],
) => unknown;

export type InputMessageVoiceEventHandler = (blob: Blob) => unknown;

export type { MessageSubmitKey };

export interface InputMessageProps
  extends Omit<React.ComponentProps<'textarea'>, 'value' | 'onChange'> {
  className?: string;
  placeholder?: string;
  editingProps?: EditingProps;
  message?: string;
  hiddenSend?: boolean;
  files?: IInputMessageFile[];
  hideUploadFile?: boolean;
  uploadFileLimit?: number;
  uploadFileDisabled?: boolean;
  uploadFileAccept?: string;
  uploadFileText?: string;
  sendDisabled?: boolean;
  textAreaDisabled?: boolean;
  messageSubmitKey?: MessageSubmitKey;
  concatenateText?: React.ReactNode;
  concatenateVideo?: React.ReactNode;
  autoFocus?: boolean;
  voice?: boolean;
  onChange?: InputMessageChangeEventHandler;
  onFilesChange?: InputMessageFilesChangeEventHandler;
  onVoiceFilesChange?: InputMessageVoiceFilesChangeEventHandler;
  onTextAreaChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
  onSend?: InputMessageSendEventHandler;
  emitError?(event: InputMessageErrorEvent): void;
  configureOptions?: IConfigureOption[];
  actions?: React.ReactNode;
}

export const InputMessage: React.FC<InputMessageProps> = ({
  className,
  placeholder,
  editingProps,
  hiddenSend = false,
  message: initialMessage,
  files: initialFiles,
  disabled = false,
  sendDisabled = false,
  textAreaDisabled = false,
  messageSubmitKey = 'enter',
  concatenateText,
  uploadFileLimit = 20,
  concatenateVideo,
  hideUploadFile = false,
  uploadFileDisabled = false,
  uploadFileAccept,
  autoFocus = true,
  voice = false,
  onChange,
  onFilesChange,
  onVoiceFilesChange,
  onTextAreaChange,
  onSend,
  onFocus,
  onBlur,
  emitError,
  actions,
  ...props
}) => {
  const theme = useTheme();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const {
    files,
    setFiles,
    handleFilePaste,
    handleFileInputChange,
    handleSideUploadFiles,
    handleDeleteFile,
  } = useFiles({
    uploadFileAccept,
    uploadFileLimit,
    uploadFileDisabled,
    initialFiles,
    emitError,
    onFilesChange,
  });

  const {
    voiceFiles,
    isVoiceRecording,
    isVoicePaused,
    voiceRecordingTime,
    setVoiceFiles,
    handleVoiceRecordStart,
    handleVoiceRecordEnd,
    handleVoiceResume,
    handleVoicePause,
    handleVoiceFileDelete,
  } = useVoice({
    onVoiceFilesChange,
  });

  const {
    textareaRef,
    isFocus,
    height,
    message,
    setHeight,
    setMessage,
    handleFocus,
    handleBlur,
    handleClick,
    handleChange,
  } = useInput({
    initialMessage,
    disabled,
    autoFocus,
    messageSubmitKey,
    onChange,
    onSendMessage: () => {
      onSend?.(message, files);
      setFiles?.([]);
      setVoiceFiles?.([]);
    },
    onTextAreaChange,
    onFocus,
    onBlur,
  });

  const handleSend = useCallback<React.MouseEventHandler<HTMLButtonElement>>(
    (event) => {
      event.stopPropagation();
      onSend?.(message, files);
      setMessage?.('');
      setFiles?.([]);
      setVoiceFiles?.([]);
      setHeight('calc(var(--bothub-scale, 1) * 22px)');
    },
    [message, files, onSend, setMessage, setFiles, setVoiceFiles],
  );

  const handleOpenFiles = useCallback<
    React.MouseEventHandler<HTMLButtonElement>
  >(
    (e) => {
      e.stopPropagation();
      fileInputRef.current?.click();
    },
    [fileInputRef],
  );

  const videoFiles = files?.filter((f) => f.native.type.startsWith('video/'));

  useEffect(() => {
    const handler = (e: ClipboardEvent) => {
      e.stopImmediatePropagation();
    };
    document.addEventListener('copy', handler, true);
    return () => document.removeEventListener('copy', handler, true);
  }, []);

  return (
    <InputMessageStyled
      $active={isFocus}
      $dragActive={dragActive}
      $disabled={disabled}
      $textAreaDisabled={textAreaDisabled}
      $voiceRecording={isVoiceRecording}
      className={className}
      onClick={handleClick}
      onDragEnter={() => setDragActive(true)}
      onDragLeave={() => setDragActive(false)}
      onDragOver={(event) => {
        event.stopPropagation();
        event.preventDefault();
        return false;
      }}
      onDrop={async (event) => {
        if (event.dataTransfer.files.length > 0) {
          event.stopPropagation();
          event.preventDefault();
          await handleSideUploadFiles([...event.dataTransfer.files]);
          setDragActive(false);
          return false;
        }
      }}
    >
      <InputMessageContent>
        <InputMessageActions>
          {!hideUploadFile && (
            <InputMessageUploadFile>
              <InputMessageUploadFileLabel
                $disabled={
                  files.length >= uploadFileLimit ||
                  disabled ||
                  uploadFileDisabled
                }
                onClick={handleOpenFiles}
              >
                <AttachIcon
                  size={18}
                  fill={theme.colors.base.white}
                />
              </InputMessageUploadFileLabel>
              <InputMessageUploadFileInput
                ref={fileInputRef}
                key={files.length}
                type="file"
                accept={uploadFileAccept}
                multiple
                disabled={
                  files.length >= uploadFileLimit ||
                  disabled ||
                  uploadFileDisabled
                }
                onChange={handleFileInputChange}
              />
            </InputMessageUploadFile>
          )}
          {actions}
        </InputMessageActions>
        <InputMessageMain onClick={handleClick}>
          {editingProps?.isEditing && (
            <InputMessageEditWrapper>
              <IconProvider size={24}>
                <EditIcon />
              </IconProvider>
              <InputMessageContentWrapper>
                <InputMessageContentInfo>
                  <InputMessageContentActionText>
                    {editingProps.editingTitle}
                  </InputMessageContentActionText>
                  <InputMessageContentTextWrapper>
                    <InputMessageContentTextFiles>
                      {editingProps.editFiles}
                    </InputMessageContentTextFiles>
                    <InputMessageContentTextMessage>
                      {editingProps.editString}
                    </InputMessageContentTextMessage>
                  </InputMessageContentTextWrapper>
                </InputMessageContentInfo>
                <InputMessageCloseEditButton onClick={editingProps.resetEdit}>
                  <IconProvider size={18}>
                    <CloseIcon />
                  </IconProvider>
                </InputMessageCloseEditButton>
              </InputMessageContentWrapper>
            </InputMessageEditWrapper>
          )}
          {isVoiceRecording && voiceRecordingTime !== null && (
            <InputMessageVoiceRecord>
              <InputMessageVoiceRecordDot />
              <InputMessageVoiceRecordTimeText>
                {formatSeconds(voiceRecordingTime)}
              </InputMessageVoiceRecordTimeText>
            </InputMessageVoiceRecord>
          )}
          <InputMessageFiles
            files={files}
            handleDeleteFile={handleDeleteFile}
          />
          {voiceFiles.length > 1 && (
            <InputMessageConcatenateWarning>
              {concatenateText}
            </InputMessageConcatenateWarning>
          )}
          {videoFiles.length > 1 && (
            <InputMessageConcatenateWarning>
              {concatenateVideo}
            </InputMessageConcatenateWarning>
          )}
          {voiceFiles.length > 0 && (
            <InputMessageVoiceFiles>
              {voiceFiles.map((file) => (
                <InputMessageVoiceTrack key={file.src}>
                  <MessageVoice
                    variant="input"
                    height={18}
                    src={file.src}
                    duration={file.duration}
                    waveData={file.waveData}
                    disableTranscription
                  />
                  <InputMessageVoiceFileDelete
                    onClick={handleVoiceFileDelete.bind(null, file)}
                  />
                </InputMessageVoiceTrack>
              ))}
            </InputMessageVoiceFiles>
          )}
          {(!textAreaDisabled ||
            (textAreaDisabled &&
              placeholder &&
              files.length !== uploadFileLimit) ||
            (textAreaDisabled && message)) && (
            <InputMessageTextArea
              $disabled={disabled}
              {...props}
              ref={textareaRef}
              value={message}
              placeholder={placeholder}
              disabled={disabled || textAreaDisabled}
              style={{ ...props.style, height }}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChange={handleChange}
              onPaste={handleFilePaste}
            />
          )}
        </InputMessageMain>
        <InputMessageButtons>
          {isVoiceRecording &&
            (isVoicePaused ? (
              <InputMessageVoicePlayButton onClick={handleVoiceResume} />
            ) : (
              <InputMessageVoicePauseButton onClick={handleVoicePause} />
            ))}
          {voice && (
            <InputMessageVoiceButton
              $isRecording={isVoiceRecording}
              disabled={disabled || sendDisabled}
              onClick={
                !isVoiceRecording
                  ? handleVoiceRecordStart
                  : handleVoiceRecordEnd
              }
              data-test="submit-message"
            />
          )}
          {!hiddenSend && (
            <InputMessageSendButton
              disabled={disabled || sendDisabled || isVoiceRecording}
              onClick={handleSend}
              {...(theme.bright && {
                iconFill: theme.default.colors.base.black,
              })}
              data-test="submit-message"
            >
              {editingProps?.isEditing ? (
                <CheckSmallIcon />
              ) : (
                <InputMessageSendIcon />
              )}
            </InputMessageSendButton>
          )}
        </InputMessageButtons>
      </InputMessageContent>
    </InputMessageStyled>
  );
};

export * from './types';
export * from './input-files';
