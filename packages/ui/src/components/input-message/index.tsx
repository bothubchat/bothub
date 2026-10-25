import React, { useState, useCallback } from 'react';
import {
  InputMessageButtons,
  InputMessageConcatenateWarning,
  InputMessageContent,
  InputMessageMain,
  InputMessageStyled,
  InputMessageTextArea,
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
import {
  EditingProps,
  IConfigureOption,
  IInputMessageFile,
  IInputMessageVoiceFile,
  InputMessageErrorEvent,
} from './types';
import { useControllableState, useEventCallback } from '@/ui/utils';
import { useVoice } from './use-voice';
import { useFiles } from './use-files';
import {
  TEXTAREA_MIN_HEIGHT,
  useInput,
  type MessageSubmitKey,
} from './use-input';
import { InputMessageFiles } from './input-files';
import { InputMessageVoiceRecordTimer } from './voice-record-timer';
import { InputMessageVoiceFileList } from './voice-files';
import {
  InputMessageSendControls,
  InputMessageUploadControl,
} from './controls';
import { IconProvider } from '../icon';
import { CloseIcon, EditIcon } from '@/ui/icons';

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
  /** Записанные голосовые. С пропом ими управляет родитель, как message и files */
  voiceFiles?: IInputMessageVoiceFile[];
  hideUploadFile?: boolean;
  uploadFileLimit?: number;
  uploadFileDisabled?: boolean;
  uploadFileAccept?: string;
  uploadFileText?: string;
  imageRequiredText?: string;
  sendWarning?: React.ReactNode;
  sendAddon?: React.ReactNode;
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
  handleImageClick?: (payload: IInputMessageFile) => IInputMessageFile;
  emitError?(event: InputMessageErrorEvent): void;
  configureOptions?: IConfigureOption[];
  actions?: React.ReactNode;
  attachAriaLabel?: string;
  sendAriaLabel?: string;
  saveAriaLabel?: string;
  voiceAriaLabel?: string;
  stopVoiceAriaLabel?: string;
  pauseVoiceAriaLabel?: string;
  resumeVoiceAriaLabel?: string;
  cancelEditAriaLabel?: string;
  deleteVoiceAriaLabel?: string;
  deleteFileAriaLabel?: string;
}

export const InputMessage: React.FC<InputMessageProps> = ({
  className,
  placeholder,
  editingProps,
  hiddenSend = false,
  message: initialMessage,
  files: initialFiles,
  voiceFiles: initialVoiceFiles,
  imageRequiredText,
  sendWarning,
  sendAddon,
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
  handleImageClick,
  onFilesChange,
  onVoiceFilesChange,
  onTextAreaChange,
  onSend,
  onFocus,
  onBlur,
  onKeyDown,
  emitError,
  actions,
  attachAriaLabel,
  sendAriaLabel,
  saveAriaLabel,
  voiceAriaLabel,
  stopVoiceAriaLabel,
  pauseVoiceAriaLabel,
  resumeVoiceAriaLabel,
  cancelEditAriaLabel,
  deleteVoiceAriaLabel,
  deleteFileAriaLabel,
  ...props
}) => {
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
    isVoiceStopping,
    getVoiceRecordingTime,
    setVoiceFiles,
    handleVoiceRecordStart,
    handleVoiceRecordEnd,
    handleVoiceResume,
    handleVoicePause,
    handleVoiceFileDelete,
  } = useVoice({
    initialVoiceFiles,
    onVoiceFilesChange,
  });

  const [message, setMessage] = useControllableState({
    value: initialMessage,
    defaultValue: '',
    onChange,
  });

  // Один путь для Enter и кнопки: оба очищают поле, файлы и голосовые
  const send = useEventCallback(() => {
    onSend?.(message, files);
    setMessage('');
    setFiles([]);
    setVoiceFiles([]);
  });

  const {
    textareaRef,
    isFocus,
    handleFocus,
    handleBlur,
    handleClick,
    handleChange,
    handleKeyDown,
  } = useInput({
    message,
    setMessage,
    sendDisabled,
    disabled,
    autoFocus,
    messageSubmitKey,
    onSendMessage: send,
    onTextAreaChange,
    onKeyDown,
    onFocus,
    onBlur,
  });

  // Стабильные обработчики: мемоизированные файлы не перерисовываются при вводе
  const imageClick = useEventCallback(handleImageClick);
  const handleStableImageClick = useCallback(
    (file: IInputMessageFile) => imageClick(file) ?? file,
    [imageClick],
  );

  const handleSend = useCallback<React.MouseEventHandler<HTMLButtonElement>>(
    (event) => {
      event.stopPropagation();
      send();
    },
    [send],
  );

  const videoFiles = files?.filter((f) => f.native.type.startsWith('video/'));

  const textAreaProps = { ...props };
  // Пропсы InputMessage, которых нет у <textarea>: не отдаём их в DOM
  delete textAreaProps.uploadFileText;
  delete textAreaProps.configureOptions;

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
            <InputMessageUploadControl
              filesCount={files.length}
              uploadFileLimit={uploadFileLimit}
              disabled={disabled || uploadFileDisabled}
              uploadFileAccept={uploadFileAccept}
              attachAriaLabel={attachAriaLabel}
              onFileInputChange={handleFileInputChange}
            />
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
                <InputMessageCloseEditButton
                  aria-label={cancelEditAriaLabel}
                  onClick={editingProps.resetEdit}
                >
                  <IconProvider size={18}>
                    <CloseIcon />
                  </IconProvider>
                </InputMessageCloseEditButton>
              </InputMessageContentWrapper>
            </InputMessageEditWrapper>
          )}
          {isVoiceRecording && (
            <InputMessageVoiceRecordTimer
              paused={isVoicePaused || isVoiceStopping}
              getRecordingTime={getVoiceRecordingTime}
            />
          )}
          <InputMessageFiles
            files={files}
            handleImageClick={handleImageClick && handleStableImageClick}
            handleDeleteFile={handleDeleteFile}
            deleteFileAriaLabel={deleteFileAriaLabel}
          />
          {imageRequiredText && (
            <InputMessageConcatenateWarning>
              {imageRequiredText}
            </InputMessageConcatenateWarning>
          )}
          {sendWarning && (
            <InputMessageConcatenateWarning>
              {sendWarning}
            </InputMessageConcatenateWarning>
          )}
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
          <InputMessageVoiceFileList
            voiceFiles={voiceFiles}
            onDelete={handleVoiceFileDelete}
            deleteVoiceAriaLabel={deleteVoiceAriaLabel}
          />
          {(!textAreaDisabled ||
            (textAreaDisabled &&
              placeholder &&
              files.length !== uploadFileLimit) ||
            (textAreaDisabled && message)) && (
            <InputMessageTextArea
              $disabled={disabled}
              {...textAreaProps}
              ref={textareaRef}
              value={message}
              placeholder={placeholder}
              disabled={disabled || textAreaDisabled}
              style={{ ...props.style, height: TEXTAREA_MIN_HEIGHT }}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              onPaste={handleFilePaste}
            />
          )}
        </InputMessageMain>
        <InputMessageButtons>
          <InputMessageSendControls
            voice={voice}
            hiddenSend={hiddenSend}
            disabled={disabled}
            sendDisabled={sendDisabled}
            isEditing={!!editingProps?.isEditing}
            isVoiceRecording={isVoiceRecording}
            isVoicePaused={isVoicePaused}
            sendAddon={sendAddon}
            sendAriaLabel={sendAriaLabel}
            saveAriaLabel={saveAriaLabel}
            voiceAriaLabel={voiceAriaLabel}
            stopVoiceAriaLabel={stopVoiceAriaLabel}
            pauseVoiceAriaLabel={pauseVoiceAriaLabel}
            resumeVoiceAriaLabel={resumeVoiceAriaLabel}
            onSend={handleSend}
            onVoiceRecordStart={handleVoiceRecordStart}
            onVoiceRecordEnd={handleVoiceRecordEnd}
            onVoicePause={handleVoicePause}
            onVoiceResume={handleVoiceResume}
          />
        </InputMessageButtons>
      </InputMessageContent>
    </InputMessageStyled>
  );
};

export * from './types';
export * from './input-files';
