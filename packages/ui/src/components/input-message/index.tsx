import React, {
  useState, useCallback, useEffect, useRef, useLayoutEffect 
} from 'react';
import {
  InputMessageContent, 
  InputMessageFile, 
  InputMessageFiles, 
  InputMessageMain, 
  InputMessageSendButton,
  InputMessageStyled, 
  InputMessageTextArea,
  InputMessageUploadFile,
  InputMessageUploadFileButton,
  InputMessageUploadFileInput
} from './styled';
import { ChipImage } from '@/ui/components/chip';
import { PdfIcon } from '@/ui/icons/pdf';
import { TxtIcon } from '@/ui/icons/txt';
import { WordIcon } from '@/ui/icons/word';
import { XlsIcon } from '@/ui/icons/xls';
import { IInputMessageFile } from './types';
import { IconProvider } from '@/ui/components/icon';
import { formatUploadFiles, getPreviewUrlForFile } from './utils';
import { AttachFileIcon } from '@/ui/icons/attach-file';

export type InputMessageChangeEventHandler = (message: string) => unknown;

export type InputMessageFilesChangeEventHandler = (files: IInputMessageFile[]) => unknown;

export type InputMessageSendEventHandler = (message: string, files: IInputMessageFile[]) => unknown;

export type InputMessageErrorEvent = {
  name: 'WRONG_FILES';
  payload: File[];
};

export interface InputMessageProps extends Omit<React.ComponentProps<'textarea'>, 'value' | 'onChange'> {
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
  autoFocus?: boolean;
  onChange?: InputMessageChangeEventHandler;
  onFilesChange?: InputMessageFilesChangeEventHandler;
  onTextAreaChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
  onSend?: InputMessageSendEventHandler;
  emitError?(event: InputMessageErrorEvent): void;
}

export const InputMessage: React.FC<InputMessageProps> = ({
  className, placeholder, message: initialMessage, files: initialFiles,
  disabled = false, sendDisabled = false, textAreaDisabled = false, 
  uploadFileLimit = 5, hideUploadFile = false, uploadFileDisabled = false,
  uploadFileAccept,
  autoFocus = true,
  onChange, onFilesChange, onTextAreaChange, onSend, onFocus, onBlur,
  emitError,
  ...props
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [textareaHeight, setTextareaHeight] = useState('calc(var(--bothub-scale, 1) * 18px)');

  const [message, setMessage] = typeof initialMessage === 'string' ? [initialMessage, onChange] : useState('');
  const [files, setFiles] = typeof initialFiles === 'string' ? [initialFiles, onFilesChange] : useState<IInputMessageFile[]>([]);
  const [isFocus, setIsFocus] = useState(!disabled && autoFocus);

  const [dragActive, setDragActive] = useState(false);
 
  const handleFocus = useCallback<React.FocusEventHandler<HTMLTextAreaElement>>((event) => {
    setIsFocus(true);
    onFocus?.(event);
  }, [onFocus]);

  const handleBlur = useCallback<React.FocusEventHandler<HTMLTextAreaElement>>((event) => {
    setIsFocus(false);
    onBlur?.(event);
  }, [onBlur]);

  const handleChange = useCallback<React.ChangeEventHandler<HTMLTextAreaElement>>((event) => {
    setMessage?.(event.target.value);
    onTextAreaChange?.(event);
  }, [setMessage, onTextAreaChange]);

  const handleInput = useCallback<React.ReactEventHandler<HTMLTextAreaElement>>((event) => {
    const textareaEl: HTMLElement | null = textareaRef.current;

    if (textareaEl === null) {
      return;
    }

    textareaEl.style.height = 'calc(var(--bothub-scale, 1) * 18px)';
    textareaEl.style.height = `${event.currentTarget.scrollHeight}px`;
    textareaEl.focus();

    setTextareaHeight(`${event.currentTarget.scrollHeight}px`);
  }, []);
  
  const handleSideUploadFiles = useCallback(async (uploadFiles: File[]) => {
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
  }, [uploadFileAccept, emitError, uploadFileLimit, files]);

  const handlePaste = useCallback<React.ClipboardEventHandler>(async (event) => {
    if (!uploadFileDisabled && event.clipboardData.files.length > 0) {
      event.preventDefault();
      await handleSideUploadFiles([...event.clipboardData.files]);
    }
  }, [handleSideUploadFiles, uploadFileDisabled]);

  const handleUploadFileChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
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

  const handleDeleteFile = useCallback((file: IInputMessageFile) => {
    setFiles?.(
      files.filter(({ name }) => name !== file.name)
    );
  }, [setFiles, files]);

  const handleSend = useCallback<React.MouseEventHandler<HTMLButtonElement>>((event) => {
    event.stopPropagation();

    onSend?.(message, files);
    setMessage?.('');
    setFiles?.([]);
    setTextareaHeight('calc(var(--bothub-scale, 1) * 18px)');
  }, [message, files, onSend, setMessage, setFiles]);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    event.stopPropagation();

    if (isFocus && event.key === 'Enter') {
      if (event.shiftKey || event.ctrlKey) {
        if (message.trim() === '') {
          event.preventDefault();
        }
        if (event.ctrlKey) {
          setMessage?.(`${message}\n`);
        }
      } else {
        event.preventDefault();

        onSend?.(message, files);
        setMessage?.('');
        setFiles?.([]);
        setTextareaHeight('calc(var(--bothub-scale, 1) * 18px)');
      }
    }
  }, [isFocus, message, files, onSend, setMessage, setFiles]);

  const handleClick = useCallback(() => {
    textareaRef.current?.focus();
  }, []);

  const handleUploadFileClick = useCallback<React.MouseEventHandler<HTMLDivElement>>((event) => {
    event.stopPropagation();
  }, []);

  useEffect(() => {
    const textareaEl: HTMLElement | null = textareaRef.current;

    if (textareaEl && autoFocus) {
      textareaEl.focus();
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

  if (typeof window !== 'undefined') {
    useLayoutEffect(() => {
      const textareaEl: HTMLElement | null = textareaRef.current;

      if (textareaEl === null) {
        return;
      }

      textareaEl.style.height = `${textareaEl.scrollHeight}px`;
      textareaEl.focus();
      textareaEl.scrollTop = textareaEl.scrollHeight;
    }, [message]);
  }

  return (
    <InputMessageStyled
      $active={isFocus}
      $dragActive={dragActive}
      $disabled={disabled}
      $textAreaDisabled={textAreaDisabled}
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
        {!hideUploadFile && (
          <InputMessageUploadFile
            onClick={handleUploadFileClick}
          >
            <InputMessageUploadFileInput
              key={files.length}
              type="file"
              accept={uploadFileAccept}
              multiple
              disabled={files.length >= uploadFileLimit || disabled || uploadFileDisabled}
              onChange={handleUploadFileChange}
            />
            <InputMessageUploadFileButton 
              disabled={files.length >= uploadFileLimit || disabled || uploadFileDisabled}
            />
          </InputMessageUploadFile>
        )}
        <InputMessageMain>
          {files.length > 0 && (
            <InputMessageFiles>
              {files.map((file) => {
                let iconNode: React.ReactNode;

                if (file.previewUrl && (file.name.match(/.png$/i) || file.name.match(/.jpg$/i) || file.name.match(/.jpeg$/i))) {
                  iconNode = (
                    <ChipImage
                      src={file.previewUrl}
                    />
                  );
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
                  <IconProvider
                    size={18}
                  >
                    {iconNode}
                  </IconProvider>
                );

                return (
                  <InputMessageFile
                    key={file.name}
                    start={iconNode}
                    onDelete={handleDeleteFile.bind(null, file)}
                  >
                    {file.name.length > 20 ? `...${file.name.slice(-20)}` : file.name}
                  </InputMessageFile>
                );
              })}
            </InputMessageFiles>
          )}
          {(
            !textAreaDisabled 
            || (textAreaDisabled && placeholder && files.length !== uploadFileLimit)
            || (textAreaDisabled && message)
          ) && (
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
              autoFocus={!disabled && autoFocus}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChange={handleChange}
              onInput={handleInput}
              onPaste={handlePaste}
            />
          )}
        </InputMessageMain>
        <InputMessageSendButton
          disabled={disabled || sendDisabled}
          onClick={handleSend} 
        />
      </InputMessageContent>
    </InputMessageStyled>
  );
};

export * from './types';
