import React, {
  useState, useCallback, useEffect, useRef 
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
import { IInputMessageFile } from './types';

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

  const handleInput = useCallback<React.FormEventHandler<HTMLTextAreaElement>>((event) => {
    const textareaEl: HTMLElement | null = textareaRef.current;

    if (textareaEl === null) {
      return;
    }

    textareaEl.style.height = 'calc(var(--bothub-scale, 1) * 18px)';
    textareaEl.style.height = `calc(var(--bothub-scale, 1) * ${event.currentTarget.scrollHeight}px)`;

    setTextareaHeight(`calc(var(--bothub-scale, 1) * ${event.currentTarget.scrollHeight}px)`);
  }, []);

  const handleUploadFileChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    async (event) => {
      if (!setFiles || !event.target.files) {
        return;
      }

      const nativeFiles: File[] = [...event.target.files];
      const previewsUrls: string[] = await Promise.all(
        nativeFiles.map((nativeFile) => (
          new Promise<string>((resolve, reject) => {
            const reader = new FileReader();

            reader.addEventListener('load', () => {
              const previewUrl: string | null = reader.result?.toString() ?? null;

              if (previewUrl === null) {
                return reject(new Error('result not found'));
              }

              resolve(previewUrl);
            });
            reader.readAsDataURL(nativeFile);
          })
        ))
      );
      const newFiles: IInputMessageFile[] = nativeFiles.map((nativeFile, index) => ({
        name: nativeFile.name,
        previewUrl: previewsUrls[index],
        native: nativeFile
      }));

      const fileMap = new Map([
        ...files,
        ...newFiles
      ].map((file) => [file.name, file]));

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
              accept="image/png, image/jpeg"
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
              {files.map((file) => (
                <InputMessageFile
                  key={file.name}
                  image={(
                    <ChipImage
                      src={file.previewUrl}
                    />
                  )}
                  onDelete={handleDeleteFile.bind(null, file)}
                >
                  {file.name.length > 20 ? `...${file.name.slice(-20)}` : file.name}
                </InputMessageFile>
              ))}
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
