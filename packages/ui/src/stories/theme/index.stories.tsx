import type { Meta, StoryObj } from '@storybook/react-vite';
import { Theme } from '.';
import { StoryDecorator } from '@/ui/story-decorator';

export type ThemeMeta = Meta<typeof Theme>;

export type ThemeStory = StoryObj<typeof Theme>;

export const Basic: ThemeStory = {};

export default {
  title: 'Theme',
  component: Theme,
  decorators: [StoryDecorator()],
} as ThemeMeta;
