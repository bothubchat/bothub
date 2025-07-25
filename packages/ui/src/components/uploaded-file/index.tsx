import {
  CloseIcon,
  LoaderCircularGradientIcon,
  PauseIcon,
  PlayIcon,
  Restore2Icon,
} from '@/ui/icons';
import { Button } from '@/ui/components/button';
import { Typography } from '@/ui/components/typography';
import { FileSize } from '@/ui/components/file-size';
import { FileIcon } from '@/ui/components/file-icon';
import {
  UploadedFileStyled,
  UploadedFileHeader,
  UploadedFileInfo,
  UploadedFileActions,
  UploadedFileFooter,
  UploadedFileProgressBar,
  UploadedFileProgressValue,
  UploadedFileIcon,
  UploadedFileSize,
  UploadedFileStatusChip,
  UploadedFileStatusChipText,
  UploadedFileDeleteButton,
} from './styled';
import { UploadedFileStatus } from './types';

export type Primary = {
  variant?: 'primary';
  sizeInBytes: number;
  fullWidth?: boolean;
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
  onDelete?: {
    disabled?: boolean;
    action: () => void;
  };
  onPause?: () => void;
  onResume?: () => void;
  onRetry?: () => void;
} & (Primary | Secondary);

export const UploadedFile = ({
  filename,
  progress,
  status = 'done',
  doneLabel,
  errorLabel,
  className,
  onDelete,
  onPause,
  onResume,
  onRetry,
  ...props
}: UploadedFileProps) => {
  const isSecondary = props.variant === 'secondary';
  const isPrimary = !isSecondary;

  return (
    <UploadedFileStyled
      $fullWidth={isPrimary ? props.fullWidth : undefined}
      $isPrimary={isPrimary}
      className={className}
    >
      <UploadedFileHeader>
        {isPrimary ? (
          <>
            <UploadedFileIcon>
              <FileIcon
                filename={filename}
                size={18}
              />
            </UploadedFileIcon>

            <UploadedFileInfo>
              <Typography variant="body-s-medium">{filename}</Typography>
              <UploadedFileSize>
                <FileSize sizeInBytes={props.sizeInBytes} />
              </UploadedFileSize>
            </UploadedFileInfo>
          </>
        ) : (
          <Typography variant="body-m-medium">{filename}</Typography>
        )}

        <UploadedFileActions>
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
                <UploadedFileStatusChip>
                  <UploadedFileStatusChipText $status={status}>
                    {doneLabel}
                  </UploadedFileStatusChipText>
                </UploadedFileStatusChip>
              ) : (
                doneLabel
              )}
            </>
          )}
          {status === 'error' && (
            <>
              {typeof errorLabel === 'string' ? (
                <UploadedFileStatusChip>
                  <UploadedFileStatusChipText $status={status}>
                    {errorLabel}
                  </UploadedFileStatusChipText>
                </UploadedFileStatusChip>
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
            <UploadedFileDeleteButton
              variant="text"
              startIcon={<CloseIcon />}
              onClick={() => onDelete.action()}
              disabled={onDelete.disabled}
            />
          )}
        </UploadedFileActions>
      </UploadedFileHeader>

      <UploadedFileFooter>
        <UploadedFileProgressBar
          $error={status === 'error'}
          $isPrimary={isPrimary}
          value={progress}
          min={0}
          max={100}
        />
        {isSecondary && props.loading ? (
          <LoaderCircularGradientIcon />
        ) : (
          <UploadedFileProgressValue>{progress}%</UploadedFileProgressValue>
        )}
      </UploadedFileFooter>
    </UploadedFileStyled>
  );
};
export * from './types';
export { UploadedFileStatusChip, UploadedFileStatusChipText } from './styled';
