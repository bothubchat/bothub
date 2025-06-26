import type { Meta, StoryObj } from '@storybook/react-vite';
import { LogoNewYear } from '.';
import { StoryDecorator } from '@/ui/story-decorator';

export type LogoNewYearMeta = Meta<typeof LogoNewYear>;

export type LogoNewYearStory = StoryObj<typeof LogoNewYear>;

export const Basic: LogoNewYearStory = {};

export default {
  title: 'UI Components/LogoNewYear',
  component: LogoNewYear,
  decorators: [StoryDecorator()]
} as LogoNewYearMeta;
