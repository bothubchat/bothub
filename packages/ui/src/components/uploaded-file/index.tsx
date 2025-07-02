import { CloseIcon, PauseIcon, PlayIcon, Restore2Icon } from '@/ui/icons';
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
  UploadedFileStatusChipText
} from './styled';
import { UploadedFileStatus } from './types';

export type Primary = {
  variant?: 'primary';
  sizeInBytes: number;
  fullWidth?: boolean;
};

export type Secondary = {
  variant: 'secondary';
};

export type UploadedFileProps = {
  filename: string;
  progress: number;
  status?: UploadedFileStatus;
  doneLabel?: React.ReactNode;
  errorLabel?: React.ReactNode;
  onDelete?: () => void;
  onPause?: () => void;
  onResume?: () => void;
  onRetry?: () => void;
} & (Primary | Secondary);

export const UploadedFile = (props: UploadedFileProps) => {
  const {
    filename,
    progress,
    status = 'done',
    doneLabel,
    errorLabel,
    variant = 'primary',
    onDelete,
    onPause,
    onResume,
    onRetry
  } = props;

  const isPrimary = variant === 'primary';

  const typedProps = props as Primary;

  return (
    <UploadedFileStyled
      $fullWidth={isPrimary ? typedProps.fullWidth : undefined}
      $isPrimary={isPrimary}
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
                <FileSize sizeInBytes={typedProps.sizeInBytes} />
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
            <Button
              variant="text"
              startIcon={<CloseIcon />}
              onClick={() => onDelete()}
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
        <UploadedFileProgressValue>{progress}%</UploadedFileProgressValue>
      </UploadedFileFooter>
    </UploadedFileStyled>
  );
};
export * from './types';
export { UploadedFileStatusChip, UploadedFileStatusChipText } from './styled';
