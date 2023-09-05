import type { Meta, StoryObj } from '@storybook/react';
import { Typography } from '.';
import { ThemeStoryDecorator } from '@/theme/story-decorator';

export type TypographyMeta = Meta<typeof Typography>;

export type TypographyStory = StoryObj<typeof Typography>;

export const Basic: TypographyStory = {
  args: {
    children: 'Typography'
  }
};

export default {
  title: 'Typography',
  component: Typography,
  decorators: [ThemeStoryDecorator()]
} as TypographyMeta;
