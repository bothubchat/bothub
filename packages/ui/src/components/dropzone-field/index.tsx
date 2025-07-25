import React, { forwardRef, useCallback, useId, useState } from 'react';
import { Typography } from '@/ui/components/typography';
import * as S from './styled';

export type DropzoneFieldChangeEventHandler = (files: File[]) => void;

export type DropzoneFieldProps = {
  leftLabel?: string;
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
              [...files, ...droppedFiles].map((file) => [file.name, file]),
            ).values(),
          ]);
        } else {
          setFiles([...droppedFiles].slice(0, 1));
        }
      },
      [files, setFiles, multiple],
    );

    const handleDrop = useCallback(
      (e: React.DragEvent) => {
        e.preventDefault();
        const droppedFiles = [...(e.dataTransfer.files ?? [])].filter((file) =>
          accept?.includes(file.type),
        );

        if (multiple) {
          setFiles([
            ...new Map(
              [...files, ...droppedFiles].map((file) => [file.name, file]),
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
          {leftLabel && (
            <Typography variant="body-m-regular">{leftLabel}</Typography>
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
