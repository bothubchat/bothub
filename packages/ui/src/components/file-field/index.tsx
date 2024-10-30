import React, { useCallback, useState } from 'react';
import {
  FileFieldBlock,
  FileFieldErrorText,
  FileFieldFile,
  FileFieldFileDeleteButton,
  FileFieldFiles,
  FileFieldIcon,
  FileFieldInput,
  FileFieldLabel,
  FileFieldPlaceholder,
  FileFieldStyled
} from './styled';
import { BadgeText } from '@/ui/components/badge';
import { IconProvider } from '@/ui/components/icon';
import { PdfIcon } from '@/ui/icons/pdf';
import { TxtIcon } from '@/ui/icons/txt';
import { WordIcon } from '@/ui/icons/word';
import { XlsIcon } from '@/ui/icons/xls';
import { AttachFileIcon } from '@/ui/icons/attach-file';

export type FileFieldChangeEventHandler = (files: File[]) => unknown;

export interface FileFieldProps extends Omit<React.ComponentProps<'div'>, 'onChange'> {
  label?: React.ReactNode;
  placeholder?: string;
  error?: string;
  files?: File[];
  disabled?: boolean;
  fullWidth?: boolean;
  onChange?: FileFieldChangeEventHandler;
  icon?: React.ReactNode;
  multiple?: boolean;
  accept?: string;
  id?: string;
}

export const FileField: React.FC<FileFieldProps> = ({
  label, files: initialFiles, placeholder, error, fullWidth = false, disabled = false,
  multiple = true, accept, onChange, id,
  icon = <FileFieldIcon />,
  ...props
}) => {
  const setInitialFilesChange = useCallback<FileFieldChangeEventHandler>((files) => {
    onChange?.(files);
  }, [onChange]);

  const [files, setFiles] = Array.isArray(initialFiles) ? (
    [initialFiles, setInitialFilesChange]
  ) : useState<File[]>([]);

  const handleInputChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>((event) => {
    if (multiple) {
      setFiles([
        ...(
          new Map([
            ...files,
            ...(event.currentTarget.files ?? [])
          ].map((file) => [file.name, file]))
        ).values()
      ]);
    } else {
      setFiles([...(event.currentTarget.files ?? [])].slice(0, 1));
    }
  }, [files, setFiles, multiple]);

  const handleFileDelete = useCallback((file: File, event: React.MouseEvent) => {
    event.preventDefault();

    setFiles(
      files.filter(({ name }) => (
        name !== file.name
      ))
    );
  }, [files, setFiles]);

  return (
    <FileFieldStyled
      $error={!!error}
      $disabled={disabled}
      $fullWidth={fullWidth}
      {...props}
    >
      {typeof label === 'string' && (
        <FileFieldLabel>
          {label}
        </FileFieldLabel>
      )}
      {typeof label !== 'string' && label}
      <FileFieldBlock
        $error={!!error}
        $disabled={disabled}
      >
        {icon}
        <FileFieldInput
          id={id}
          disabled={disabled}
          multiple={multiple}
          accept={accept}
          onChange={handleInputChange}
        />
        {(placeholder && files.length === 0) && (
          <FileFieldPlaceholder>
            {placeholder}
          </FileFieldPlaceholder>
        )}
        {files.length > 0 && (
          <FileFieldFiles>
            {files.map((file) => {
              let iconNode: React.ReactNode;

              if (file.name.match(/.txt$/i)) {
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

              return (
                <FileFieldFile
                  key={file.name}
                >
                  <IconProvider
                    size={12}
                  >
                    {iconNode}
                  </IconProvider>
                  <BadgeText>
                    {file.name.length > 18 && '...'}
                    {file.name.slice(-18)}
                  </BadgeText>
                  <FileFieldFileDeleteButton
                    disabled={disabled}
                    onClick={handleFileDelete.bind(null, file)}
                  />
                </FileFieldFile>
              );
            })}
          </FileFieldFiles>
        )}
      </FileFieldBlock>
      {error && (
        <FileFieldErrorText>
          {error}
        </FileFieldErrorText>
      )}
    </FileFieldStyled>
  );
};

export * from './styled';
