import React, { memo, useCallback, useRef } from 'react';
import { AttachIcon } from '@/ui/icons/attach';
import { CheckSmallIcon } from '@/ui/icons';
import { useTheme } from '@/ui/theme';
import {
  InputMessageSendButton,
  InputMessageSendIcon,
  InputMessageUploadFile,
  InputMessageUploadFileInput,
  InputMessageUploadFileLabel,
  InputMessageVoiceButton,
  InputMessageVoicePauseButton,
  InputMessageVoicePlayButton,
} from './styled';

export interface InputMessageUploadControlProps {
  filesCount: number;
  uploadFileLimit: number;
  disabled: boolean;
  uploadFileAccept?: string;
  attachAriaLabel?: string;
  onFileInputChange: React.ChangeEventHandler<HTMLInputElement>;
}

/** Кнопка прикрепления: не перерисовывается при вводе текста */
export const InputMessageUploadControl: React.FC<InputMessageUploadControlProps> =
  memo(
    ({
      filesCount,
      uploadFileLimit,
      disabled,
      uploadFileAccept,
      attachAriaLabel,
      onFileInputChange,
    }) => {
      const theme = useTheme();
      const fileInputRef = useRef<HTMLInputElement | null>(null);
      const isDisabled = filesCount >= uploadFileLimit || disabled;

      const handleOpenFiles = useCallback<
        React.MouseEventHandler<HTMLButtonElement>
      >((e) => {
        e.stopPropagation();
        fileInputRef.current?.click();
      }, []);

      return (
        <InputMessageUploadFile>
          <InputMessageUploadFileLabel
            $disabled={isDisabled}
            aria-label={attachAriaLabel}
            onClick={handleOpenFiles}
          >
            <AttachIcon
              size={18}
              fill={theme.colors.base.white}
            />
          </InputMessageUploadFileLabel>
          <InputMessageUploadFileInput
            ref={fileInputRef}
            key={filesCount}
            type="file"
            accept={uploadFileAccept}
            multiple
            disabled={isDisabled}
            onChange={onFileInputChange}
          />
        </InputMessageUploadFile>
      );
    },
  );

export interface InputMessageSendControlsProps {
  voice: boolean;
  hiddenSend: boolean;
  disabled: boolean;
  sendDisabled: boolean;
  isEditing: boolean;
  isVoiceRecording: boolean;
  isVoicePaused: boolean;
  sendAddon?: React.ReactNode;
  sendAriaLabel?: string;
  saveAriaLabel?: string;
  voiceAriaLabel?: string;
  stopVoiceAriaLabel?: string;
  pauseVoiceAriaLabel?: string;
  resumeVoiceAriaLabel?: string;
  onSend: React.MouseEventHandler<HTMLButtonElement>;
  onVoiceRecordStart: React.MouseEventHandler<HTMLButtonElement>;
  onVoiceRecordEnd: React.MouseEventHandler<HTMLButtonElement>;
  onVoicePause: React.MouseEventHandler<HTMLButtonElement>;
  onVoiceResume: React.MouseEventHandler<HTMLButtonElement>;
}

/** Кнопки записи и отправки: не перерисовываются при вводе текста */
export const InputMessageSendControls: React.FC<InputMessageSendControlsProps> =
  memo(
    ({
      voice,
      hiddenSend,
      disabled,
      sendDisabled,
      isEditing,
      isVoiceRecording,
      isVoicePaused,
      sendAddon,
      sendAriaLabel,
      saveAriaLabel,
      voiceAriaLabel,
      stopVoiceAriaLabel,
      pauseVoiceAriaLabel,
      resumeVoiceAriaLabel,
      onSend,
      onVoiceRecordStart,
      onVoiceRecordEnd,
      onVoicePause,
      onVoiceResume,
    }) => {
      const theme = useTheme();

      return (
        <>
          {isVoiceRecording &&
            (isVoicePaused ? (
              <InputMessageVoicePlayButton
                aria-label={resumeVoiceAriaLabel}
                onClick={onVoiceResume}
              />
            ) : (
              <InputMessageVoicePauseButton
                aria-label={pauseVoiceAriaLabel}
                onClick={onVoicePause}
              />
            ))}
          {voice && (
            <InputMessageVoiceButton
              $isRecording={isVoiceRecording}
              disabled={disabled || sendDisabled}
              aria-label={
                isVoiceRecording ? stopVoiceAriaLabel : voiceAriaLabel
              }
              aria-pressed={isVoiceRecording}
              onClick={
                !isVoiceRecording ? onVoiceRecordStart : onVoiceRecordEnd
              }
              data-test="submit-message"
            />
          )}
          {!hiddenSend && !isVoiceRecording && sendAddon}
          {!hiddenSend && !isVoiceRecording && (
            <InputMessageSendButton
              disabled={disabled || sendDisabled || isVoiceRecording}
              aria-label={
                isEditing ? (saveAriaLabel ?? sendAriaLabel) : sendAriaLabel
              }
              onClick={onSend}
              {...(theme.bright && {
                iconFill: theme.default.colors.base.black,
              })}
              data-test="submit-message"
            >
              {isEditing ? <CheckSmallIcon /> : <InputMessageSendIcon />}
            </InputMessageSendButton>
          )}
        </>
      );
    },
  );
