import type { Meta, StoryObj } from '@storybook/react';
import { ThemeStoryDecorator } from '@/ui/theme/story-decorator';
import { Background } from '.';

export type BackgroundMeta = Meta<typeof Background>;

export type BackgroundStory = StoryObj<typeof Background>;

export const Basic: BackgroundStory = {
  args: {
    variant: 'grid'
  }
};

export default {
  title: 'UI Components/Background',
  component: Background,
  decorators: [ThemeStoryDecorator()]
} as BackgroundMeta;
