import React, { useState, useCallback, useRef } from 'react';
import { useTransition } from '@react-spring/web';
import {
  InputMessageButtons,
  InputMessageConcatenateWarning,
  InputMessageConfigure,
  InputMessageConfigureButton,
  InputMessageConfigureMenu,
  InputMessageMenuOption,
  InputMessageMenuHr,
  InputMessageContent,
  InputMessageMain,
  InputMessageSendButton,
  InputMessageSendIcon,
  InputMessageStyled,
  InputMessageTextArea,
  InputMessageAltKeyButton,
  InputMessageAltKeyModalOption,
  InputMessageAltKeyModalStyled,
  InputMessageAltKeyStyled,
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
} from './styled';
import { MessageVoice } from '../message';
import { Typography } from '@/ui/components/typography';
import { AttachIcon } from '@/ui/icons/attach';
import { Plus2Icon } from '@/ui/icons/plus-2';
import { useTheme } from '@/ui/theme';
import {
  IConfigureOption,
  IInputMessageFile,
  IInputMessageVoiceFile,
  InputMessageErrorEvent,
} from './types';
import { useOnClickOutside, formatSeconds } from '@/ui/utils';
import { useVoice } from './use-voice';
import { useFiles } from './use-files';
import { useInput } from './use-input';
import { InputMessageFiles } from './input-files';

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

export interface InputMessageProps
  extends Omit<React.ComponentProps<'textarea'>, 'value' | 'onChange'> {
  className?: string;
  placeholder?: string;
  message?: string;
  files?: IInputMessageFile[];
  hideUploadFile?: boolean;
  uploadFileLimit?: number;
  uploadFileDisabled?: boolean;
  uploadFileAccept?: string;
  uploadFileText?: string;
  sendDisabled?: boolean;
  textAreaDisabled?: boolean;
  altKeyDefaultValue?: boolean;
  defaultKeySendText?: React.ReactNode;
  alternativeKeySendText?: React.ReactNode;
  concatenateText?: React.ReactNode;
  autoFocus?: boolean;
  voice?: boolean;
  onSetAlternativeKeyValue?: (value: boolean) => unknown;
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
  message: initialMessage,
  files: initialFiles,
  disabled = false,
  sendDisabled = false,
  textAreaDisabled = false,
  altKeyDefaultValue = false,
  defaultKeySendText,
  alternativeKeySendText,
  concatenateText,
  uploadFileLimit = 5,
  hideUploadFile = false,
  uploadFileDisabled = false,
  uploadFileAccept,
  uploadFileText,
  autoFocus = true,
  voice = false,
  onSetAlternativeKeyValue,
  onChange,
  onFilesChange,
  onVoiceFilesChange,
  onTextAreaChange,
  onSend,
  onFocus,
  onBlur,
  emitError,
  actions,
  configureOptions,
  ...props
}) => {
  const theme = useTheme();

  const [dragActive, setDragActive] = useState(false);

  const configureMenuRef = useRef<HTMLDivElement | null>(null);

  const [isConfigureMenuShown, setConfigureMenuShown] =
    useState<boolean>(false);

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
    onUploadFileChange: () => setConfigureMenuShown(false),
  });

  const {
    textareaRef,
    altKeyButtonRef,
    isFocus,
    isAltKey,
    height,
    message,
    isAltKeyModalShown,
    setHeight,
    setMessage,
    setAltKeyModalShown,
    handleDefaultKey,
    handleAlternativeKey,
    handleFocus,
    handleBlur,
    handleClick,
    handleChange,
  } = useInput({
    initialMessage,
    disabled,
    autoFocus,
    altKeyDefaultValue,
    onChange,
    onSendMessage: () => onSend?.(message, files),
    onTextAreaChange,
    onSetAlternativeKeyValue,
    onFocus,
    onBlur,
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

  useOnClickOutside(altKeyButtonRef, () => {
    setAltKeyModalShown(false);
  });

  useOnClickOutside(configureMenuRef, () => {
    setConfigureMenuShown(false);
  });

  const modalTransition = useTransition(!disabled && isAltKeyModalShown, {
    from: { opacity: 0, y: 10 },
    enter: { opacity: 1, y: 0 },
    leave: { opacity: 0, y: 10 },
    config: { duration: 100, ease: 'easeOut' },
  });

  const configureMenuTransition = useTransition(
    !disabled && isConfigureMenuShown,
    {
      from: { opacity: 0, y: 10 },
      enter: { opacity: 1, y: 0 },
      leave: { opacity: 0, y: 10 },
      config: { duration: 100, ease: 'easeOut' },
    },
  );

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
        {(!hideUploadFile || !!configureOptions) && (
          <InputMessageConfigure ref={configureMenuRef}>
            <InputMessageConfigureButton
              $disabled={disabled}
              onClick={(e) => {
                e.stopPropagation();
                setConfigureMenuShown(!isConfigureMenuShown);
              }}
            >
              <Plus2Icon fill={theme.colors.base.white} />
            </InputMessageConfigureButton>
            {configureMenuTransition(
              (style, item) =>
                item && (
                  <InputMessageConfigureMenu style={style}>
                    {!hideUploadFile && (
                      <InputMessageUploadFile>
                        <InputMessageUploadFileLabel
                          $disabled={
                            files.length >= uploadFileLimit ||
                            disabled ||
                            uploadFileDisabled
                          }
                          onClick={(e) => e.stopPropagation()}
                        >
                          <AttachIcon
                            size={18}
                            fill={theme.colors.base.white}
                          />
                          <Typography variant="body-m-medium">
                            {uploadFileText}
                          </Typography>
                        </InputMessageUploadFileLabel>
                        <InputMessageUploadFileInput
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
                    {!hideUploadFile && !!configureOptions && (
                      <InputMessageMenuHr />
                    )}
                    {configureOptions?.map(({ onClick, ...props }) => (
                      <InputMessageMenuOption
                        {...props}
                        onClick={() => {
                          onClick?.();
                          setConfigureMenuShown(false);
                        }}
                      />
                    ))}
                  </InputMessageConfigureMenu>
                ),
            )}
            {actions}
          </InputMessageConfigure>
        )}
        <InputMessageMain onClick={handleClick}>
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
          {voiceFiles.length > 0 && (
            <InputMessageVoiceFiles>
              {voiceFiles.map((file) => (
                <InputMessageVoiceTrack key={file.src}>
                  <MessageVoice
                    variant="input"
                    height={24}
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
          {!!defaultKeySendText && !!alternativeKeySendText && (
            <InputMessageAltKeyStyled ref={altKeyButtonRef}>
              <InputMessageAltKeyButton
                onClick={(e) => {
                  e.stopPropagation();
                  setAltKeyModalShown(!isAltKeyModalShown);
                }}
                disabled={disabled}
              />
              {modalTransition(
                (style, item) =>
                  item && (
                    <InputMessageAltKeyModalStyled
                      key="alternative-key-modal"
                      style={style}
                    >
                      <InputMessageAltKeyModalOption
                        active={!isAltKey}
                        onClick={handleDefaultKey}
                      >
                        {defaultKeySendText}
                      </InputMessageAltKeyModalOption>
                      <InputMessageAltKeyModalOption
                        active={isAltKey}
                        onClick={handleAlternativeKey}
                      >
                        {alternativeKeySendText}
                      </InputMessageAltKeyModalOption>
                    </InputMessageAltKeyModalStyled>
                  ),
              )}
            </InputMessageAltKeyStyled>
          )}
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
          <InputMessageSendButton
            disabled={disabled || sendDisabled || isVoiceRecording}
            onClick={handleSend}
            {...(theme.bright && {
              iconFill: theme.default.colors.base.black,
            })}
            data-test="submit-message"
          >
            <InputMessageSendIcon />
          </InputMessageSendButton>
        </InputMessageButtons>
      </InputMessageContent>
    </InputMessageStyled>
  );
};

export * from './types';
