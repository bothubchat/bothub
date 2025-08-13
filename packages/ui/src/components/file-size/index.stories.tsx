import { Meta, StoryObj } from '@storybook/react-vite';
import { StoryDecorator } from '@/ui/story-decorator';
import { FileSize } from '.';
import { Typography } from '@/ui/components/typography';

export type FileSizeMeta = Meta<typeof FileSize>;

export type FileSizeStory = StoryObj<typeof FileSize>;

export const All = () => (
  <div
    style={{
      display: 'grid',
      gap: '20px',
      gridTemplateColumns: 'repeat(4, 1fr)',
    }}
  >
    <Typography variant="body-s-medium">
      <FileSize sizeInBytes={1024} />
    </Typography>
    <Typography variant="body-s-medium">
      <FileSize sizeInBytes={3 * 1024} />
    </Typography>
    <Typography variant="body-s-medium">
      <FileSize sizeInBytes={23 * 1024 * 1024} />
    </Typography>
    <Typography variant="body-s-medium">
      <FileSize sizeInBytes={13 * 1024 * 1024 * 1024} />
    </Typography>
  </div>
);

export default {
  title: 'UI Components/FileSize',
  component: FileSize,
  decorators: [StoryDecorator({ margin: '50px 0px' })],
  parameters: {
    variants: {
      enable: true,
    },
  },
} as FileSizeMeta;
