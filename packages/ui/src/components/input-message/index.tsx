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

export type InputMessageChangeEventHandler = (message: string) => unknown;

export type InputMessageFilesChangeEventHandler = (files: IInputMessageFile[]) => unknown;

export type InputMessageSendEventHandler = (message: string, files: IInputMessageFile[]) => unknown;

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
}

export const InputMessage: React.FC<InputMessageProps> = ({
  className, placeholder, message: initialMessage, files: initialFiles,
  disabled = false, sendDisabled = false, textAreaDisabled = false, 
  uploadFileLimit = 5, hideUploadFile = false, uploadFileDisabled = false,
  uploadFileAccept = 'text/plain, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/pdf, image/png, image/jpeg',
  autoFocus = true,
  onChange, onFilesChange, onTextAreaChange, onSend, onFocus, onBlur,
  ...props
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [textareaHeight, setTextareaHeight] = useState('calc(var(--bothub-scale, 1) * 18px)');

  const [message, setMessage] = typeof initialMessage === 'string' ? [initialMessage, onChange] : useState('');
  const [files, setFiles] = typeof initialFiles === 'string' ? [initialFiles, onFilesChange] : useState<IInputMessageFile[]>([]);
  const [isFocus, setIsFocus] = useState(!disabled && autoFocus);
 
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

  const handleUploadFileChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    async (event) => {
      if (!setFiles || !event.target.files) {
        return;
      }

      const nativeFiles: File[] = [...event.target.files];
      const previewsUrls: (string | null)[] = await Promise.all(
        nativeFiles.map((nativeFile) => {
          if (nativeFile.name.match(/.png$/) || nativeFile.name.match(/.jpg$/) || nativeFile.name.match(/.jpeg$/)) {
            return new Promise<string>((resolve, reject) => {
              const reader = new FileReader();
  
              reader.addEventListener('load', () => {
                const previewUrl: string | null = reader.result?.toString() ?? null;
  
                if (previewUrl === null) {
                  return reject(new Error('result not found'));
                }
  
                resolve(previewUrl);
              });
              reader.readAsDataURL(nativeFile);
            });
          }

          return Promise.resolve(null);
        })
      );
      const newFiles: IInputMessageFile[] = nativeFiles.map((nativeFile, index) => ({
        name: nativeFile.name,
        previewUrl: previewsUrls[index],
        native: nativeFile
      }));

      const fileMap = new Map([
        ...files,
        ...newFiles
      ]
        .filter((file) => (
          file.name.match(/.(png|jpg|jpeg|txt|text|docx|xlsx|pdf)$/)
        ))
        .map((file) => [file.name, file]));

      setFiles([...fileMap.values()].slice(0, uploadFileLimit));
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
      $disabled={disabled}
      $textAreaDisabled={textAreaDisabled}
      className={className}
      onClick={handleClick}
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

                if (file.previewUrl && (file.name.match(/.png$/) || file.name.match(/.jpg$/) || file.name.match(/.jpeg$/))) {
                  iconNode = (
                    <ChipImage
                      src={file.previewUrl}
                    />
                  );
                } else if (file.name.match(/.docx$/)) {
                  iconNode = <WordIcon />;
                } else if (file.name.match(/.xlsx$/)) {
                  iconNode = <XlsIcon />;
                } else if (file.name.match(/.pdf$/)) {
                  iconNode = <PdfIcon />;
                } else {
                  iconNode = <TxtIcon />;
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
