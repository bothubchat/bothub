import React, { forwardRef, useCallback, useId, useState } from 'react';
import { Typography } from '@/ui/components/typography';
import * as S from './styled';

export type DropzoneFieldChangeEventHandler = (files: File[]) => void;

export type DropzoneFieldProps = {
  leftLabel?: string | React.ReactNode;
  rightLabels?: string[] | React.ReactNode[];
  placeholder?: React.ReactNode;
  error?: string;
  files?: File[];
  disabled?: boolean;
  fullWidth?: boolean;
  onChange?: DropzoneFieldChangeEventHandler;
  multiple?: boolean;
  accept?: string;
  id?: string;
} & Omit<React.ComponentProps<'div'>, 'placeholder' | 'onChange'>;

export const DropzoneField = forwardRef<HTMLInputElement, DropzoneFieldProps>(
  (
    {
      leftLabel,
      rightLabels,
      placeholder,
      files: initialFiles,
      onChange,
      fullWidth = false,
      disabled = false,
      multiple = true,
      accept,
      ...props
    },
    ref,
  ) => {
    const id = useId();
    const [isDragActive, setIsDragActive] = useState(false);

    const setInitialFilesChange = useCallback<DropzoneFieldChangeEventHandler>(
      (files) => {
        onChange?.(files);
      },
      [onChange],
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
              [...droppedFiles, ...files].map((file) => [file.name, file]),
            ).values(),
          ]);
        } else {
          setFiles([...droppedFiles].slice(0, 1));
        }
      },
      [files, setFiles, multiple],
    );

    const isFileAccepted = (file: File, accept?: string): boolean => {
      if (!accept) return true;

      const acceptTypes = accept.split(',').map((type) => type.trim());

      return acceptTypes.some((type) => {
        if (type.startsWith('.')) {
          return file.name.toLowerCase().endsWith(type.toLowerCase());
        }
        if (type.endsWith('/*')) {
          return file.type.startsWith(type.replace('/*', ''));
        }
        return file.type === type;
      });
    };

    const handleDrop = useCallback(
      (e: React.DragEvent) => {
        e.preventDefault();
        const droppedFiles = [...(e.dataTransfer.files ?? [])].filter((file) =>
          isFileAccepted(file, accept),
        );

        if (multiple) {
          setFiles([
            ...new Map(
              [...droppedFiles, ...files].map((file) => [file.name, file]),
            ).values(),
          ]);
        } else {
          setFiles([...droppedFiles].slice(0, 1));
        }
        setIsDragActive(false);
      },
      [files, setFiles, multiple, accept],
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
      <S.DropzoneFieldStyled
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        $fullWidth={fullWidth}
        data-dragged={isDragActive}
        {...props}
      >
        <S.DropzoneFieldLabels>
          {!!leftLabel && typeof leftLabel === 'string' ? (
            <Typography variant="body-m-regular">{leftLabel}</Typography>
          ) : (
            leftLabel
          )}
          {!!rightLabels && (
            <S.DropzoneFieldRightLabelsContainer>
              {rightLabels.map((label, i) => (
                <React.Fragment key={i}>
                  {typeof label === 'string' ? (
                    <S.DropzoneFieldRightLabel>
                      {label}
                    </S.DropzoneFieldRightLabel>
                  ) : (
                    label
                  )}
                </React.Fragment>
              ))}
            </S.DropzoneFieldRightLabelsContainer>
          )}
        </S.DropzoneFieldLabels>

        <S.DropzoneFieldInput
          id={id}
          type="file"
          multiple={multiple}
          accept={accept}
          onChange={handleInputChange}
          disabled={disabled}
          ref={ref}
        />

        {!!placeholder && (
          <S.DropzoneFieldPlaceholder>{placeholder}</S.DropzoneFieldPlaceholder>
        )}
      </S.DropzoneFieldStyled>
    );
  },
);
