import type { Meta, StoryObj } from '@storybook/react';
import { StoryDecorator } from '@/ui/story-decorator';
import { PromptCard } from '.';

export type PromptCardMeta = Meta<typeof PromptCard>;

export type PromptCardStory = StoryObj<typeof PromptCard>;

export const Basic: PromptCardStory = {
  args: {
    children:
      'Мне нужен [тип блогового поста], который напрямую обратится к моему [идеальному покупателю] и убедит его совершить [желаемое действие] на моем [сайте/продукте].',
  },
};

export default {
  title: 'Components/Prompt/Card',
  component: PromptCard,
  decorators: [StoryDecorator()],
} as PromptCardMeta;
