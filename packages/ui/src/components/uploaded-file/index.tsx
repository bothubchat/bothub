import { forwardRef } from 'react';
import { PauseIcon, PlayIcon, Restore2Icon } from '@/ui/icons';
import { Button } from '@/ui/components/button';
import { Typography } from '@/ui/components/typography';
import { FileSize } from '@/ui/components/file-size';
import { FileIcon } from '@/ui/components/file-icon';
import * as S from './styled';
import { UploadedFileStatus } from './types';

export type Primary = {
  variant?: 'primary';
  sizeInBytes: number;
};

export type Secondary = {
  variant: 'secondary';
  loading?: boolean;
};

export type UploadedFileProps = {
  filename: string;
  progress: number;
  status?: UploadedFileStatus;
  doneLabel?: React.ReactNode;
  errorLabel?: React.ReactNode;
  className?: string;
  onDelete?:
    | {
        disabled?: boolean;
        action: () => void;
      }
    | (() => void);
  bottomContent?: React.ReactNode;
  fullWidth?: boolean;
  onPause?: () => void;
  onResume?: () => void;
  onRetry?: () => void;
} & (Primary | Secondary);

export const UploadedFile = forwardRef<HTMLDivElement, UploadedFileProps>(
  (
    {
      filename,
      progress,
      status = 'done',
      doneLabel,
      errorLabel,
      className,
      onDelete,
      bottomContent,
      fullWidth,
      onPause,
      onResume,
      onRetry,
      ...props
    },
    ref,
  ) => {
    const isSecondary = props.variant === 'secondary';
    const isPrimary = !isSecondary;

    return (
      <S.UploadedFileStyled
        ref={ref}
        $fullWidth={fullWidth}
        $isPrimary={isPrimary}
        className={className}
      >
        <S.UploadedFileHeader>
          {isPrimary ? (
            <>
              <S.UploadedFileIcon>
                <FileIcon
                  filename={filename}
                  size={18}
                />
              </S.UploadedFileIcon>

              <S.UploadedFileInfo>
                <Typography variant="body-s-medium">{filename}</Typography>
                <S.UploadedFileSize>
                  <FileSize sizeInBytes={props.sizeInBytes} />
                </S.UploadedFileSize>
              </S.UploadedFileInfo>
            </>
          ) : (
            <Typography variant="body-m-medium">{filename}</Typography>
          )}

          <S.UploadedFileActions>
            {onPause && (
              <>
                {status === 'in-progress' && (
                  <Button
                    variant="text"
                    startIcon={<PauseIcon />}
                    onClick={() => onPause()}
                  />
                )}
              </>
            )}
            {onResume && (
              <>
                {status === 'paused' && (
                  <Button
                    variant="text"
                    startIcon={<PlayIcon />}
                    onClick={() => onResume()}
                  />
                )}
              </>
            )}
            {status === 'done' && (
              <>
                {typeof doneLabel === 'string' ? (
                  <S.UploadedFileStatusChip>
                    <S.UploadedFileStatusChipText $status={status}>
                      {doneLabel}
                    </S.UploadedFileStatusChipText>
                  </S.UploadedFileStatusChip>
                ) : (
                  doneLabel
                )}
              </>
            )}
            {status === 'error' && (
              <>
                {typeof errorLabel === 'string' ? (
                  <S.UploadedFileStatusChip>
                    <S.UploadedFileStatusChipText $status={status}>
                      {errorLabel}
                    </S.UploadedFileStatusChipText>
                  </S.UploadedFileStatusChip>
                ) : (
                  errorLabel
                )}
                {onRetry && (
                  <Button
                    variant="text"
                    startIcon={<Restore2Icon />}
                    onClick={() => onRetry()}
                  />
                )}
              </>
            )}
            {onDelete && (
              <S.UploadedFileDeleteButton
                variant="text"
                startIcon={<S.UploadedFileCloseIcon />}
                onClick={'action' in onDelete ? onDelete.action : onDelete}
                disabled={
                  'disabled' in onDelete ? onDelete.disabled : undefined
                }
              />
            )}
          </S.UploadedFileActions>
        </S.UploadedFileHeader>

        <S.UploadedFileFooter>
          <S.UploadedFileProgressBar
            $error={status === 'error'}
            $isPrimary={isPrimary}
            value={progress}
            min={0}
            max={100}
          />
          {isSecondary && props.loading ? (
            <S.UploadedFileLoaderIcon />
          ) : (
            <S.UploadedFileProgressValue>
              {progress}%
            </S.UploadedFileProgressValue>
          )}
        </S.UploadedFileFooter>

        {bottomContent}
      </S.UploadedFileStyled>
    );
  },
);

export * from './types';
export { UploadedFileStatusChip, UploadedFileStatusChipText } from './styled';
