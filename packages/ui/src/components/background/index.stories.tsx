import type { Meta, StoryObj } from '@storybook/react';
import { StoryDecorator } from '@/ui/story-decorator';
import { Background } from '.';

export type BackgroundMeta = Meta<typeof Background>;

export type BackgroundStory = StoryObj<typeof Background>;

export const Basic: BackgroundStory = {
  args: {
    variant: 'grid',
  },
};

export default {
  title: 'UI Components/Background',
  component: Background,
  decorators: [StoryDecorator()],
} as BackgroundMeta;
