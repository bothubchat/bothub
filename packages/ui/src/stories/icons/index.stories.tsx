import type { Meta, StoryObj } from '@storybook/react';
import { Icons } from '.';
import { ThemeStoryDecorator } from '@/ui/theme/story-decorator';

export type IconsMeta = Meta<typeof Icons>;

export type IconsStory = StoryObj<typeof Icons>;

export const Basic: IconsStory = {};

export default {
  title: 'Icons',
  component: Icons,
  decorators: [ThemeStoryDecorator()]
} as IconsMeta;
