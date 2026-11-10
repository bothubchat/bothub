import React, { useCallback } from 'react';
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
  FileFieldStyled,
} from './styled';
import { BadgeText } from '@/ui/components/badge';
import { IconProvider } from '@/ui/components/icon';
import { TooltipConsumer } from '../tooltip';
import {
  AttachFileIcon,
  PdfIcon,
  TxtIcon,
  WordIcon,
  XlsIcon,
} from '@/ui/icons';
import { useControllableState } from '@/ui/utils';

export type FileFieldChangeEventHandler = (files: File[]) => unknown;

export interface FileFieldProps
  extends Omit<React.ComponentProps<'div'>, 'onChange'> {
  label?: React.ReactNode;
  placeholder?: string;
  error?: string | boolean;
  files?: File[];
  disabled?: boolean;
  fullWidth?: boolean;
  fullNameFiles?: boolean;
  onChange?: FileFieldChangeEventHandler;
  icon?: React.ReactNode;
  multiple?: boolean;
  accept?: string;
  id?: string;
  open?: boolean;
}

export const FileField: React.FC<FileFieldProps> = ({
  label,
  files: initialFiles,
  placeholder,
  error,
  fullWidth = false,
  disabled = false,
  multiple = true,
  accept,
  fullNameFiles,
  onChange,
  id,
  open = true,
  icon = <FileFieldIcon />,
  ...props
}) => {
  const [files, setFiles] = useControllableState<File[]>({
    value: Array.isArray(initialFiles) ? initialFiles : undefined,
    defaultValue: [],
    onChange,
  });

  const handleInputChange = useCallback<
    React.ChangeEventHandler<HTMLInputElement>
  >(
    (event) => {
      const selectedFiles = [...(event.currentTarget.files ?? [])];

      if (multiple) {
        setFiles((files) => [
          ...new Map(
            [...files, ...selectedFiles].map((file) => [file.name, file]),
          ).values(),
        ]);
      } else {
        setFiles(selectedFiles.slice(0, 1));
      }
    },
    [setFiles, multiple],
  );

  const handleFileDelete = useCallback(
    (file: File, event: React.MouseEvent) => {
      event.preventDefault();

      setFiles((files) => files.filter(({ name }) => name !== file.name));
    },
    [setFiles],
  );

  return (
    <TooltipConsumer>
      {({ handleTooltipMouseEnter, handleTooltipMouseLeave }) => (
        <FileFieldStyled
          onMouseEnter={handleTooltipMouseEnter}
          onMouseLeave={handleTooltipMouseLeave}
          $error={!!error}
          $disabled={disabled}
          $fullWidth={fullWidth}
          $open={open}
          {...props}
        >
          {typeof label === 'string' && open && (
            <FileFieldLabel>{label}</FileFieldLabel>
          )}
          {typeof label !== 'string' && label}
          <FileFieldBlock
            $error={!!error}
            $open={open}
            $disabled={disabled}
          >
            {icon}
            <FileFieldInput
              id={id}
              disabled={disabled}
              multiple={multiple}
              accept={accept}
              value=""
              onChange={handleInputChange}
            />
            {placeholder && files.length === 0 && open && (
              <FileFieldPlaceholder>{placeholder}</FileFieldPlaceholder>
            )}
            {files.length > 0 && open && (
              <FileFieldFiles>
                {files.map((file) => {
                  let iconNode: React.ReactNode;

                  if (file.name.match(/\.txt$/i)) {
                    iconNode = <TxtIcon />;
                  } else if (file.name.match(/\.docx$/i)) {
                    iconNode = <WordIcon />;
                  } else if (file.name.match(/\.xlsx$/i)) {
                    iconNode = <XlsIcon />;
                  } else if (file.name.match(/\.pdf$/i)) {
                    iconNode = <PdfIcon />;
                  } else {
                    iconNode = <AttachFileIcon />;
                  }

                  return (
                    <FileFieldFile key={file.name}>
                      <IconProvider size={12}>{iconNode}</IconProvider>
                      <BadgeText>
                        {!fullNameFiles && file.name.length > 18 && '...'}
                        {fullNameFiles ? file.name : file.name.slice(-18)}
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
          {error && <FileFieldErrorText>{error}</FileFieldErrorText>}
        </FileFieldStyled>
      )}
    </TooltipConsumer>
  );
};

export * from './styled';
