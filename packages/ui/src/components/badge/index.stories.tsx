import type { Meta, StoryObj } from '@storybook/react';
import { ThemeStoryDecorator } from '@/ui/theme/story-decorator';
import { AIIcon } from '@/ui/icons';
import { Badge } from '.';

export type BadgeMeta = Meta<typeof Badge>;

export type BadgeStory = StoryObj<typeof Badge>;

export const Basic: BadgeStory = {
  args: {
    children: 'Text'
  }
};

export const Icon: BadgeStory = {
  args: {
    ...Basic.args,
    icon: <AIIcon />
  }
};

export default {
  title: 'UI Components/Badge',
  component: Badge,
  decorators: [ThemeStoryDecorator()],
  argTypes: {
    icon: {
      table: {
        disable: true
      }
    }
  }
} as BadgeMeta;
