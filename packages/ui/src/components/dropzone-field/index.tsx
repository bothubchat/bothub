import React, { forwardRef, useCallback, useId, useState } from 'react';
import { Typography } from '@/ui/components/typography';
import { useControllableState } from '@/ui/utils';
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

export const DropzoneField = forwardRef<HTMLInputElement, DropzoneFieldProps>(
  (
    {
      leftLabel,
      rightLabels,
      placeholder,
      error,
      files: initialFiles,
      onChange,
      fullWidth = false,
      disabled = false,
      multiple = true,
      accept,
      id: initialId,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const id = initialId ?? generatedId;
    const errorId = `${id}-error`;
    const [isDragActive, setIsDragActive] = useState(false);

    const [, setFiles] = useControllableState<File[]>({
      value: Array.isArray(initialFiles) ? initialFiles : undefined,
      defaultValue: [],
      onChange,
    });

    const addFiles = useCallback(
      (newFiles: File[]) => {
        if (multiple) {
          setFiles((files) => [
            ...new Map(
              [...newFiles, ...files].map((file) => [file.name, file]),
            ).values(),
          ]);
        } else {
          setFiles(newFiles.slice(0, 1));
        }
      },
      [setFiles, multiple],
    );

    const handleInputChange = useCallback<
      React.ChangeEventHandler<HTMLInputElement>
    >(
      (event) => {
        addFiles([...(event.currentTarget.files ?? [])]);
        // Reset the input, so the same file can be chosen again
        event.currentTarget.value = '';
      },
      [addFiles],
    );

    const handleDrop = useCallback(
      (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragActive(false);

        if (disabled) {
          return;
        }

        addFiles(
          [...(e.dataTransfer.files ?? [])].filter((file) =>
            isFileAccepted(file, accept),
          ),
        );
      },
      [addFiles, accept, disabled],
    );

    const handleDragOver = useCallback(
      (e: React.DragEvent) => {
        e.preventDefault();

        if (disabled) {
          e.dataTransfer.dropEffect = 'none';
          return;
        }

        setIsDragActive(true);
      },
      [disabled],
    );

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
          aria-invalid={!!error || undefined}
          aria-describedby={error ? errorId : undefined}
          ref={ref}
        />

        {!!placeholder && (
          <S.DropzoneFieldPlaceholder>{placeholder}</S.DropzoneFieldPlaceholder>
        )}

        {!!error && (
          <S.DropzoneFieldErrorText id={errorId}>
            {error}
          </S.DropzoneFieldErrorText>
        )}
      </S.DropzoneFieldStyled>
    );
  },
);
