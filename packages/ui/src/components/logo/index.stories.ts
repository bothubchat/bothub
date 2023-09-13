import type { Meta, StoryObj } from '@storybook/react';
import { Logo } from '.';
import { ThemeStoryDecorator } from '../../theme/story-decorator';

export type LogoMeta = Meta<typeof Logo>;

export type LogoStory = StoryObj<typeof Logo>;

export const Basic: LogoStory = {};

export default {
  title: 'UI Components/Logo',
  component: Logo,
  decorators: [ThemeStoryDecorator()]
} as LogoMeta;
