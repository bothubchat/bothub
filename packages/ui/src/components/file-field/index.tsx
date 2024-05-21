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

export type FileFieldChangeEventHandler = (files: File[]) => unknown;

export interface FileFieldProps extends Omit<React.ComponentProps<'label'>, 'onChange'> {
  label?: React.ReactNode;
  placeholder?: string;
  error?: string;
  files?: File[];
  accept?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  onChange?: FileFieldChangeEventHandler;
}

export const FileField: React.FC<FileFieldProps> = ({
  label, files: initialFiles, placeholder, error, fullWidth = false, disabled = false, accept,
  onChange,
  ...props
}) => {
  const setInitialFilesChange = useCallback<FileFieldChangeEventHandler>((files) => {
    onChange?.(files);
  }, [onChange]);

  const [files, setFiles] = Array.isArray(initialFiles) ? (
    [initialFiles, setInitialFilesChange]
  ) : useState<File[]>([]);

  const handleInputChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>((event) => {
    setFiles([
      ...(
        new Map([
          ...files, 
          ...(event.currentTarget.files ?? [])
        ].map((file) => [file.name, file]))
      ).values()
    ]);
  }, [files, setFiles]);

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
        <FileFieldIcon />
        <FileFieldInput
          disabled={disabled}
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

              if (file.name.match(/.doc$/) || file.name.match(/.docx$/)) {
                iconNode = <WordIcon />;
              } else if (file.name.match(/.xls$/) || file.name.match(/.xlsx$/)) {
                iconNode = <XlsIcon />;
              } else if (file.name.match(/.pdf$/)) {
                iconNode = <PdfIcon />;
              } else {
                iconNode = <TxtIcon />;
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
