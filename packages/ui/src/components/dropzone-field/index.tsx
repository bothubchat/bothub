import { useCallback, useId, useState } from 'react';
import { Button } from '@/ui/components/button';
import { Typography } from '@/ui/components/typography';
import { FileIcon } from '@/ui/components/file-icon';
import { CloseIcon } from '@/ui/icons';
import {
  DropzoneFieldFile,
  DropzoneFieldFilesStyled,
  DropzoneFieldInput,
  DropzoneFieldPlaceholder,
  DropzoneFieldStyled,
} from './styled';

export type DropzoneFieldChangeEventHandler = (files: File[]) => void;

export type DropzoneFieldProps = {
  label?: React.ReactNode;
  placeholder?: React.ReactNode;
  error?: string;
  files?: File[];
  disabled?: boolean;
  fullWidth?: boolean;
  onChange?: DropzoneFieldChangeEventHandler;
  multiple?: boolean;
  accept?: string;
  showFiles?: boolean;
  id?: string;
} & Omit<React.ComponentProps<'div'>, 'placeholder' | 'onChange'>;

export const DropzoneField = ({
  label,
  placeholder,
  files: initialFiles,
  onChange,
  fullWidth = false,
  disabled = false,
  multiple = true,
  showFiles = true,
  accept,
  ...props
}: DropzoneFieldProps) => {
  const id = useId();
  const [isDragActive, setIsDragActive] = useState(false);

  const setInitialFilesChange = useCallback<DropzoneFieldChangeEventHandler>(
    (files) => {
      onChange?.(files);
    },
    [onChange]
  );

  const [files, setFiles] = Array.isArray(initialFiles)
    ? [initialFiles, setInitialFilesChange]
    : useState<File[]>([]);

  const handleInputChange = useCallback<
  React.ChangeEventHandler<HTMLInputElement>
  >(
    (event) => {
      const droppedFiles = [...(event.currentTarget.files ?? [])];

      if (multiple) {
        setFiles([
          ...new Map(
            [...files, ...droppedFiles].map((file) => [
              file.name,
              file,
            ])
          ).values(),
        ]);
      } else {
        setFiles([...droppedFiles].slice(0, 1));
      }
    },
    [files, setFiles, multiple]
  );

  const handleFileDelete = useCallback(
    (file: File) => {
      setFiles(files.filter(({ name }) => name !== file.name));
    },
    [files, setFiles]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const droppedFiles = [...(e.dataTransfer.files ?? [])].filter(
        (file) => accept?.includes(file.type)
      );
      
      if (multiple) {
        setFiles([
          ...new Map(
            [...files, ...droppedFiles].map((file) => [file.name, file])
          ).values(),
        ]);
      } else {
        setFiles([...droppedFiles].slice(0, 1));
      }
      setIsDragActive(false);
    },
    [files, setFiles, multiple, accept]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(false);
  }, []);

  return (
    <DropzoneFieldStyled
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      $fullWidth={fullWidth}
      data-dragged={isDragActive}
      {...props}
    >
      {label && (
        <label htmlFor={id}>
          {typeof label === 'string' ? (
            <Typography variant="body-m-regular">{label}</Typography>
          ) : (
            label
          )}
        </label>
      )}

      <DropzoneFieldInput
        id={id}
        type="file"
        multiple={multiple}
        accept={accept}
        onChange={handleInputChange}
        disabled={disabled}
      />
      <DropzoneFieldPlaceholder>
        {showFiles && files.length > 0 ? (
          <DropzoneFieldFiles
            files={files}
            onDelete={handleFileDelete}
          />
        ) : (
          <>
            {placeholder ? (
              typeof placeholder === 'string' ? (
                <Typography variant="body-l-semibold">{placeholder}</Typography>
              ) : (
                placeholder
              )
            ) : null}
          </>
        )}
      </DropzoneFieldPlaceholder>
    </DropzoneFieldStyled>
  );
};

type DropzoneFieldFilesProps = {
  files: File[];
  onDelete: (file: File) => void;
};

const DropzoneFieldFiles = ({ files, onDelete }: DropzoneFieldFilesProps) => (
  <DropzoneFieldFilesStyled>
    {files.map((file) => (
      <DropzoneFieldFile key={file.name}>
        <FileIcon filename={file.name} />
        <Typography variant="body-s-regular">{file.name}</Typography>
        <Button
          onClick={() => onDelete(file)}
          variant="text"
          startIcon={<CloseIcon />}
        />
      </DropzoneFieldFile>
    ))}
  </DropzoneFieldFilesStyled>
);
