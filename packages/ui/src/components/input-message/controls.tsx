import React, { memo, useCallback, useRef } from 'react';
import { CheckSmallIcon } from '@/ui/icons';
import { LoaderCircularIcon } from '@/ui/icons/loader-circular';
import { MicLineIcon } from '@/ui/icons/mic-line';
import { PaperclipLineIcon } from '@/ui/icons/paperclip-line';
import { StopSquareIcon } from '@/ui/icons/stop-square';
import {
  InputMessageSendButton,
  InputMessageSendIcon,
  InputMessageStopButton,
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
            <PaperclipLineIcon size={18} />
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
  /** Сообщение отправляется: лоадер в кнопке отправки */
  sendLoading?: boolean;
  isEditing: boolean;
  isVoiceRecording: boolean;
  isVoicePaused: boolean;
  sendAddon?: React.ReactNode;
  /** Идёт генерация: вместо отправки кнопка остановки */
  onStop?: () => unknown;
  stopAriaLabel?: string;
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
      sendLoading = false,
      isEditing,
      isVoiceRecording,
      isVoicePaused,
      sendAddon,
      onStop,
      stopAriaLabel,
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
      const handleStop = useCallback(
        (event: React.MouseEvent<HTMLButtonElement>) => {
          event.stopPropagation();
          onStop?.();
        },
        [onStop],
      );

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
            >
              <MicLineIcon size={18} />
            </InputMessageVoiceButton>
          )}
          {!hiddenSend && !isVoiceRecording && sendAddon}
          {!hiddenSend && !isVoiceRecording && onStop && (
            <InputMessageStopButton
              aria-label={stopAriaLabel}
              onClick={handleStop}
              data-test="stop-generation"
            >
              <StopSquareIcon size={18} />
            </InputMessageStopButton>
          )}
          {!hiddenSend && !isVoiceRecording && !onStop && (
            <InputMessageSendButton
              disabled={disabled || sendDisabled || isVoiceRecording}
              aria-busy={sendLoading || undefined}
              aria-label={
                isEditing ? (saveAriaLabel ?? sendAriaLabel) : sendAriaLabel
              }
              onClick={onSend}
              data-test="submit-message"
            >
              {sendLoading ? (
                <LoaderCircularIcon fill="currentColor" />
              ) : isEditing ? (
                <CheckSmallIcon fill="currentColor" />
              ) : (
                <InputMessageSendIcon size={18} />
              )}
            </InputMessageSendButton>
          )}
        </>
      );
    },
  );
