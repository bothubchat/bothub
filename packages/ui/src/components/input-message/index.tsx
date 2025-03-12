import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  useLayoutEffect
} from 'react';
import { useTransition } from '@react-spring/web';
import { useOnClickOutside } from '@/ui/utils/useOnClickOutside';
import {
  InputMessageContent,
  InputMessageFile,
  InputMessageFiles,
  InputMessageMain,
  InputMessageSendButton,
  InputMessageSendIcon,
  InputMessageStyled,
  InputMessageTextArea,
  InputMessageToggleSendButton,
  InputMessageToggleSendModalOption,
  InputMessageToggleSendModalStyled,
  InputMessageToggleSendStyled,
  InputMessageUploadFile,
  InputMessageUploadFileButton,
  InputMessageUploadFileInput,
  InputMessageVoiceIcon,
  InputMessageVoiceRecord,
  InputMessageVoiceRecordDot,
  InputMessageVoiceRecordTimeText
} from './styled';
import { ChipImage } from '@/ui/components/chip';
import { PdfIcon } from '@/ui/icons/pdf';
import { TxtIcon } from '@/ui/icons/txt';
import { WordIcon } from '@/ui/icons/word';
import { XlsIcon } from '@/ui/icons/xls';
import { IInputMessageFile } from './types';
import { IconProvider } from '@/ui/components/icon';
import {
  formatUploadFiles,
  getPreviewUrlForFile,
  formatSeconds
} from './utils';
import { AttachFileIcon } from '@/ui/icons/attach-file';
import { useTheme } from '@/ui/theme';
import { getSupportedAudioMimeType } from '@/ui/utils/getSupportedAudioMimeType';

export type InputMessageChangeEventHandler = (message: string) => unknown;

export type InputMessageFilesChangeEventHandler = (
  files: IInputMessageFile[]
) => unknown;

export type InputMessageSendEventHandler = (
  message: string,
  files: IInputMessageFile[]
) => unknown;

export type InputMessageVoiceEventHandler = (blob: Blob) => unknown;

export type InputMessageErrorEvent = {
  name: 'WRONG_FILES';
  payload: File[];
};

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
  sendDisabled?: boolean;
  textAreaDisabled?: boolean;
  useAlternativeKeyDefaultValue?: boolean;
  defaultKeySendText?: React.ReactNode;
  alternativeKeySendText?: React.ReactNode;
  autoFocus?: boolean;
  voice?: boolean;
  onSetAlternativeKeyValue?: (value: boolean) => unknown;
  onChange?: InputMessageChangeEventHandler;
  onFilesChange?: InputMessageFilesChangeEventHandler;
  onTextAreaChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
  onSend?: InputMessageSendEventHandler;
  emitError?(event: InputMessageErrorEvent): void;
  onVoice?: InputMessageVoiceEventHandler;
  rightActions?: React.ReactNode;
}

export const InputMessage: React.FC<InputMessageProps> = ({
  className,
  placeholder,
  message: initialMessage,
  files: initialFiles,
  disabled = false,
  sendDisabled = false,
  textAreaDisabled = false,
  useAlternativeKeyDefaultValue = false,
  defaultKeySendText,
  alternativeKeySendText,
  uploadFileLimit = 5,
  hideUploadFile = false,
  uploadFileDisabled = false,
  uploadFileAccept,
  autoFocus = true,
  voice = false,
  onSetAlternativeKeyValue,
  onChange,
  onFilesChange,
  onTextAreaChange,
  onSend,
  onFocus,
  onBlur,
  onVoice,
  emitError,
  rightActions,
  ...props
}) => {
  const theme = useTheme();

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [textareaHeight, setTextareaHeight] = useState(
    'calc(var(--bothub-scale, 1) * 18px)'
  );

  const [message, setMessage] =
    typeof initialMessage === 'string'
      ? [initialMessage, onChange]
      : useState('');
  const [files, setFiles] = Array.isArray(initialFiles)
    ? [initialFiles, onFilesChange]
    : useState<IInputMessageFile[]>([]);
  const [isFocus, setIsFocus] = useState(!disabled && autoFocus);
  const [dragActive, setDragActive] = useState(false);
  const [isVoiceRecording, setIsVoiceRecording] = useState(false);
  const [voiceRecordingTime, setVoiceRecordingTime] = useState<number | null>(
    null
  );
  const voiceMediaRecorderRef = useRef<MediaRecorder | null>(null);
  const voiceMediaStreamRef = useRef<MediaStream | null>(null);
  const voiceChunksRef = useRef<Blob[]>([]);
  const voiceTimerRef = useRef<number | null>(null);
  const voicePressedRef = useRef(false);

  const inputMessageToggleSendKeyRef = useRef<HTMLDivElement | null>(null);

  const [useAlternativeKey, setUseAlternativeKey] = useState(
    useAlternativeKeyDefaultValue
  );
  const [alternativeKeyModalShown, setAlternativeKeyModalShown] =
    useState<boolean>(false);

  const handleDefaultKey = useCallback(() => {
    setUseAlternativeKey(false);
    onSetAlternativeKeyValue?.(false);
    setAlternativeKeyModalShown(false);
  }, []);

  const handleAlternativeKey = useCallback(() => {
    setUseAlternativeKey(true);
    onSetAlternativeKeyValue?.(true);
    setAlternativeKeyModalShown(false);
  }, []);

  const handleFocus = useCallback<React.FocusEventHandler<HTMLTextAreaElement>>(
    (event) => {
      setIsFocus(true);
      onFocus?.(event);
    },
    [onFocus]
  );

  const handleBlur = useCallback<React.FocusEventHandler<HTMLTextAreaElement>>(
    (event) => {
      setIsFocus(false);
      onBlur?.(event);
    },
    [onBlur]
  );

  const handleChange = useCallback<
    React.ChangeEventHandler<HTMLTextAreaElement>
  >(
    (event) => {
      setMessage?.(event.target.value);
      onTextAreaChange?.(event);
    },
    [setMessage, onTextAreaChange]
  );

  const handleInput = useCallback<React.ReactEventHandler<HTMLTextAreaElement>>(
    (event) => {
      const textareaEl: HTMLElement | null = textareaRef.current;

      if (textareaEl === null) {
        return;
      }

      textareaEl.style.height = 'calc(var(--bothub-scale, 1) * 18px)';
      textareaEl.style.height = `${event.currentTarget.scrollHeight}px`;
      textareaEl.focus();

      setTextareaHeight(`${event.currentTarget.scrollHeight}px`);
    },
    []
  );

  const handleSideUploadFiles = useCallback(
    async (uploadFiles: File[]) => {
      if (!uploadFiles.length) return;
      const newFiles: IInputMessageFile[] = [];
      const rejectedFiles: File[] = [];
      const previewsUrls: (string | null)[] = await Promise.all(
        uploadFiles?.map(getPreviewUrlForFile)
      );
      for (const [idx, file] of uploadFiles.entries()) {
        const isValidFile = uploadFileAccept?.includes(file.type) ?? true;

        if (isValidFile) {
          newFiles.push({
            previewUrl: previewsUrls[idx],
            name: file.name,
            native: file
          });
        } else {
          rejectedFiles.push(file);
        }
      }
      if (rejectedFiles.length > 0) {
        emitError?.({ name: 'WRONG_FILES', payload: rejectedFiles });
      }
      if (newFiles?.length > 0) {
        setFiles?.([...files, ...newFiles].slice(0, uploadFileLimit));
      }
    },
    [uploadFileAccept, emitError, uploadFileLimit, files]
  );

  const handlePaste = useCallback<React.ClipboardEventHandler>(
    async (event) => {
      if (!uploadFileDisabled && event.clipboardData.files.length > 0) {
        event.preventDefault();
        await handleSideUploadFiles([...event.clipboardData.files]);
      }
    },
    [handleSideUploadFiles, uploadFileDisabled]
  );

  const handleUploadFileChange = useCallback<
    React.ChangeEventHandler<HTMLInputElement>
  >(
    async (event) => {
      if (!setFiles || !event.target.files) {
        return;
      }
      const formattedFiles = await formatUploadFiles([
        ...files.map(({ native }) => native),
        ...event.target.files
      ]);
      setFiles(formattedFiles.slice(0, uploadFileLimit));
    },
    [files, setFiles, uploadFileLimit]
  );

  const handleDeleteFile = useCallback(
    (file: IInputMessageFile) => {
      setFiles?.(files.filter(({ name }) => name !== file.name));
    },
    [setFiles, files]
  );

  const handleSend = useCallback<React.MouseEventHandler<HTMLButtonElement>>(
    (event) => {
      event.stopPropagation();

      onSend?.(message, files);
      setTextareaHeight('calc(var(--bothub-scale, 1) * 18px)');
    },
    [message, files, onSend, setMessage, setFiles]
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      event.stopPropagation();

      const newLineKey = useAlternativeKey ? 'enter' : 'ctrl/shift+enter';

      let keyboardEvent = '';
      if (event.key === 'Enter' && (event.shiftKey || event.ctrlKey)) {
        keyboardEvent = 'ctrl/shift+enter';
      } else if (event.key === 'Enter') {
        keyboardEvent = 'enter';
      } else {
        return;
      }

      if (isFocus && event.key === 'Enter') {
        if (keyboardEvent === newLineKey) {
          // handle only ctrlKey, other cases are handled by browsers
          if (event.ctrlKey) {
            event.preventDefault();

            const el = textareaRef.current;
            if (!el) return;

            const allText = el.value;
            const currentPos = el.selectionStart;
            const beforeText = allText.slice(0, currentPos);
            const afterText = allText.slice(currentPos);

            setMessage?.(`${beforeText}\n${afterText}`);
            setCursorPosition(el, currentPos + 1);
          }
        }
        // Message is submitted
        if (newLineKey !== keyboardEvent && keyboardEvent !== '') {
          event.preventDefault();
          onSend?.(message, files);
          setTextareaHeight('calc(var(--bothub-scale, 1) * 18px)');
        }
      }
    },
    [isFocus, message, files, onSend, setMessage, setFiles]
  );

  const handleClick = useCallback(() => {
    textareaRef.current?.focus();
  }, []);

  const handleUploadFileClick = useCallback<
    React.MouseEventHandler<HTMLDivElement>
  >((event) => {
    event.stopPropagation();
  }, []);

  const handleVoiceRecordClick = useCallback<React.MouseEventHandler>(
    (event) => {
      event.preventDefault();
      event.stopPropagation();
      if (isVoiceRecording) {
        handleVoiceRecordEnd();
      } else {
        handleVoiceRecordStart(event);
      }
    },
    [isVoiceRecording]
  );

  const handleVoiceRecordStart = useCallback<React.ReactEventHandler>(
    async (event) => {
      voicePressedRef.current = true;
      event.stopPropagation();

      const mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: true
      });
      const mediaRecorder = new MediaRecorder(mediaStream, {
        mimeType: getSupportedAudioMimeType()
      });

      if (!voicePressedRef.current) {
        return;
      }

      mediaRecorder.start();

      voiceMediaRecorderRef.current = mediaRecorder;
      voiceMediaStreamRef.current = mediaStream;
      voiceTimerRef.current = window.setInterval(() => {
        setVoiceRecordingTime((recordingTime) => (recordingTime ?? 0) + 0.1);
      }, 100);

      setIsVoiceRecording(true);
      setVoiceRecordingTime(0);
    },
    [voicePressedRef.current, voiceChunksRef.current]
  );

  const stopVoiceRecording = useCallback(() => {
    const mediaRecorder = voiceMediaRecorderRef.current;
    const mediaStream = voiceMediaStreamRef.current;
    const timer = voiceTimerRef.current;

    if (!isVoiceRecording || !mediaRecorder || !mediaStream || !timer) {
      return;
    }

    mediaRecorder.stop();
    for (const track of mediaStream.getTracks()) {
      track.stop();
    }

    window.clearInterval(timer);
  }, [
    isVoiceRecording,
    voiceMediaRecorderRef.current,
    voiceMediaStreamRef.current,
    voiceTimerRef.current
  ]);

  const handleVoiceRecordEnd = useCallback(async () => {
    voicePressedRef.current = false;

    if (!isVoiceRecording) {
      return;
    }

    stopVoiceRecording();
  }, [isVoiceRecording, stopVoiceRecording]);

  useEffect(() => {
    const textareaEl: HTMLElement | null = textareaRef.current;
    const focused = document.activeElement === textareaEl;

    if (textareaEl && autoFocus) {
      textareaEl.focus();
    } else if (!focused) {
      setIsFocus(false);
    }
  }, [disabled]);

  useEffect(() => {
    const textareaEl: HTMLElement | null = textareaRef.current;

    if (textareaEl === null) {
      return;
    }

    textareaEl.addEventListener('keydown', handleKeyDown);

    return () => {
      textareaEl.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  useEffect(() => {
    if (setFiles && initialFiles) {
      setFiles(initialFiles);
    }
  }, [initialFiles]);

  if (typeof window !== 'undefined') {
    useLayoutEffect(() => {
      const textareaEl: HTMLElement | null = textareaRef.current;

      if (textareaEl === null) {
        return;
      }

      textareaEl.style.height = `${textareaEl.scrollHeight}px`;
      textareaEl.scrollTop = textareaEl.scrollHeight;
      if (autoFocus) {
        textareaEl.focus();
      }
    }, [message, autoFocus]);
  }

  useEffect(() => {
    const mediaRecorder = voiceMediaRecorderRef.current;

    const dataAvailableListener = (event: BlobEvent) => {
      if (event.data.size > 0) {
        voiceChunksRef.current.push(event.data);
      }
    };
    const stopListener = async () => {
      const blob = new Blob(voiceChunksRef.current, {
        type: getSupportedAudioMimeType()
      });

      await onVoice?.(blob);

      voiceMediaRecorderRef.current = null;
      voiceMediaStreamRef.current = null;
      voiceChunksRef.current = [];
      voiceTimerRef.current = null;

      setIsVoiceRecording(false);
      setVoiceRecordingTime(null);
    };

    if (mediaRecorder) {
      mediaRecorder.addEventListener('dataavailable', dataAvailableListener);
      mediaRecorder.addEventListener('stop', stopListener);
    }

    return () => {
      if (mediaRecorder) {
        mediaRecorder.removeEventListener(
          'dataavailable',
          dataAvailableListener
        );
        mediaRecorder.removeEventListener('stop', stopListener);
      }

      stopVoiceRecording();
    };
  }, [voiceMediaRecorderRef.current]);

  useOnClickOutside(inputMessageToggleSendKeyRef, () => {
    setAlternativeKeyModalShown(false);
  });

  const modalTransition = useTransition(alternativeKeyModalShown, {
    from: {
      opacity: 0,
      y: 10
    },
    enter: {
      opacity: 1,
      y: 0
    },
    leave: {
      opacity: 0,
      y: 10
    },
    config: {
      duration: 150,
      ease: 'easeOut'
    }
  });

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
        {!hideUploadFile && !isVoiceRecording && (
          <InputMessageUploadFile onClick={handleUploadFileClick}>
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
              onChange={handleUploadFileChange}
            />
            <InputMessageUploadFileButton
              disabled={
                files.length >= uploadFileLimit ||
                disabled ||
                uploadFileDisabled
              }
            />
          </InputMessageUploadFile>
        )}
        <InputMessageMain>
          {isVoiceRecording && voiceRecordingTime !== null && (
            <InputMessageVoiceRecord>
              <InputMessageVoiceRecordDot />
              <InputMessageVoiceRecordTimeText>
                {formatSeconds(voiceRecordingTime)}
              </InputMessageVoiceRecordTimeText>
            </InputMessageVoiceRecord>
          )}
          {!isVoiceRecording && (
            <>
              {files.length > 0 && (
                <InputMessageFiles>
                  {files.map((file) => {
                    let iconNode: React.ReactNode;

                    if (
                      file.previewUrl &&
                      (file.name.match(/.png$/i) ||
                        file.name.match(/.jpg$/i) ||
                        file.name.match(/.jpeg$/i))
                    ) {
                      iconNode = <ChipImage src={file.previewUrl} />;
                    } else if (file.name.match(/.txt$/i)) {
                      iconNode = <TxtIcon />;
                    } else if (file.name.match(/.docx$/i)) {
                      iconNode = <WordIcon />;
                    } else if (file.name.match(/.xlsx$/i)) {
                      iconNode = <XlsIcon />;
                    } else if (file.name.match(/.pdf$/i)) {
                      iconNode = <PdfIcon />;
                    } else {
                      iconNode = <AttachFileIcon />;
                    }

                    iconNode = (
                      <IconProvider size={18}>{iconNode}</IconProvider>
                    );

                    return (
                      <InputMessageFile
                        key={file.name}
                        start={iconNode}
                        onDelete={handleDeleteFile.bind(null, file)}
                      >
                        {file.name.length > 20
                          ? `...${file.name.slice(-20)}`
                          : file.name}
                      </InputMessageFile>
                    );
                  })}
                </InputMessageFiles>
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
                  style={{
                    ...props.style,
                    height: textareaHeight
                  }}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  onInput={handleInput}
                  onPaste={handlePaste}
                />
              )}
            </>
          )}
        </InputMessageMain>
        {!!defaultKeySendText && !!alternativeKeySendText && (
          <InputMessageToggleSendStyled ref={inputMessageToggleSendKeyRef}>
            <InputMessageToggleSendButton
              onClick={(e) => {
                e.stopPropagation();
                setAlternativeKeyModalShown(!alternativeKeyModalShown);
              }}
              disabled={disabled}
            />
            {modalTransition(
              (style, item) =>
                item && (
                  <InputMessageToggleSendModalStyled
                    key="alternative-key-modal"
                    style={style}
                  >
                    <InputMessageToggleSendModalOption
                      active={!useAlternativeKey}
                      onClick={handleDefaultKey}
                    >
                      {defaultKeySendText}
                    </InputMessageToggleSendModalOption>
                    <InputMessageToggleSendModalOption
                      active={useAlternativeKey}
                      onClick={handleAlternativeKey}
                    >
                      {alternativeKeySendText}
                    </InputMessageToggleSendModalOption>
                  </InputMessageToggleSendModalStyled>
                )
            )}
          </InputMessageToggleSendStyled>
        )}
        {rightActions}
        {!voice || message || files.length > 0 ? (
          <InputMessageSendButton
            disabled={disabled || sendDisabled}
            onClick={handleSend}
          >
            <InputMessageSendIcon />
          </InputMessageSendButton>
        ) : (
          <InputMessageSendButton
            {...(isVoiceRecording && {
              color: theme.colors.critic
            })}
            disabled={disabled || sendDisabled}
            onClick={handleVoiceRecordClick}
          >
            {isVoiceRecording ? (
              <InputMessageSendIcon />
            ) : (
              <InputMessageVoiceIcon />
            )}
          </InputMessageSendButton>
        )}
      </InputMessageContent>
    </InputMessageStyled>
  );
};

export * from './types';

function setCursorPosition(input: HTMLTextAreaElement, start: number) {
  setTimeout(() => {
    input.selectionStart = start;
    input.selectionEnd = start;
  }, 1);
}
