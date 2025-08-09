import type { Meta, StoryObj } from '@storybook/react';
import { StoryDecorator } from '@/ui/story-decorator';
import { AdaptiveButton } from '.';
import { DownloadImgIcon } from '@/ui/icons';

export type AdaptiveButtonMeta = Meta<typeof AdaptiveButton>;

export type AdaptiveButtonStory = StoryObj<typeof AdaptiveButton>;

export const Basic: AdaptiveButtonStory = {
  args: {
    startIcon: <DownloadImgIcon />,
    children: 'Скачать изображение',
  },
};

export default {
  title: 'UI Components/Button/Adaptive',
  component: AdaptiveButton,
  decorators: [StoryDecorator({ margin: '50px 80px' })],
  argTypes: {
    children: {
      table: {
        disable: true,
      },
    },
  },
} as AdaptiveButtonMeta;
