import type { Meta, StoryObj } from '@storybook/react';
import { LogoHalloween } from '.';
import { StoryDecorator } from '@/ui/story-decorator';

export type LogoMeta = Meta<typeof LogoHalloween>;

export type LogoStory = StoryObj<typeof LogoHalloween>;

export const Basic: LogoStory = {};

export default {
  title: 'UI Components/LogoHalloween',
  component: LogoHalloween,
  decorators: [StoryDecorator()],
} as LogoMeta;
