import type { Meta, StoryObj } from '@storybook/react';
import { Theme } from '.';
import { ThemeStoryDecorator } from '@/ui/theme/story-decorator';

export type ThemeMeta = Meta<typeof Theme>;

export type ThemeStory = StoryObj<typeof Theme>;

export const Basic: ThemeStory = {};

export default {
  title: 'Theme',
  component: Theme,
  decorators: [ThemeStoryDecorator()]
} as ThemeMeta;
