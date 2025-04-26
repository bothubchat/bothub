import { Meta, StoryObj } from '@storybook/react';
import { StoryDecorator } from '@/ui/story-decorator';
import { ThemeCards } from '.';

export type ThemesCardMeta = Meta<typeof ThemeCards>;

export type ThemesCardStory = StoryObj<typeof ThemeCards>;

export const Basic: ThemesCardStory = {};

export default {
  title: 'UI Components/ThemeCards',
  component: ThemeCards,
  decorators: [StoryDecorator()]
} as ThemesCardMeta;
