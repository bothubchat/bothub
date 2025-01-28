import { Meta, StoryObj } from '@storybook/react';
import { StoryDecorator } from '@/ui/story-decorator';
import {
  UploadedFile,
  UploadedFileStatusChip,
  UploadedFileStatusChipText,
} from '.';
import { CheckSmallIcon } from '@/ui/icons';
import { useTheme } from '@/ui/theme';
import { Typography } from '@/ui/components/typography';

export type UploadedFileMeta = Meta<typeof UploadedFile>;

export type UploadedFileStory = StoryObj<typeof UploadedFile>;

export const All = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
    <Typography variant="body-s-medium">
      {InProgress.name}
    </Typography>
    <InProgress />

    <Typography variant="body-s-medium">
      {Paused.name}
    </Typography>
    <Paused />

    <Typography variant="body-s-medium">
      {Done.name}
    </Typography>
    <Done />
    
    <Typography variant="body-s-medium">
      {Error.name}
    </Typography>
    <Error />
  </div>
);

export const InProgress = () => (
  <UploadedFile
    filename="Table Name.xls"
    sizeInBytes={3 * 1024 * 1024}
    progress={30}
    onPause={() => {}}
    onDelete={() => {}}
    status="in-progress"
  />
);

export const Paused = () => (
  <UploadedFile
    filename="Table Name.xls"
    sizeInBytes={3 * 1024 * 1024}
    progress={30}
    onResume={() => {}}
    onDelete={() => {}}
    status="paused"
  />
);

export const Done = () => {
  const theme = useTheme();

  return (
    <UploadedFile
      filename="Table Name.xls"
      sizeInBytes={3 * 1024 * 1024}
      progress={30}
      onDelete={() => {}}
      status="done"
      doneLabel={(
        <UploadedFileStatusChip>
          <UploadedFileStatusChipText $status="done">
            Загрузка завершена
          </UploadedFileStatusChipText>
          <CheckSmallIcon
            fill={theme.colors.accent.primary}
            size={18}
          />
        </UploadedFileStatusChip>
      )}
    />
  );
};

export const Error = () => (
  <UploadedFile
    filename="Table Name.xls"
    sizeInBytes={3 * 1024 * 1024}
    progress={30}
    onDelete={() => {}}
    onRetry={() => {}}
    status="error"
    errorLabel="Ошибка"
  />
);

export default {
  title: 'UI Components/UploadedFile',
  component: UploadedFile,
  decorators: [StoryDecorator({ margin: '50px 0px' })],
  parameters: {
    variants: {
      enable: true
    }
  }
} as UploadedFileMeta;
