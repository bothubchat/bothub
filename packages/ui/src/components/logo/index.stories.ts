import type { Meta, StoryObj } from '@storybook/react';
import { Logo } from '.';
import { StoryDecorator } from '@/ui/story-decorator';

export type LogoMeta = Meta<typeof Logo>;

export type LogoStory = StoryObj<typeof Logo>;

export const Basic: LogoStory = {};

export default {
  title: 'UI Components/Logo',
  component: Logo,
  decorators: [StoryDecorator()],
} as LogoMeta;
