import type { Meta, StoryObj } from '@storybook/react';
import { StoryDecorator } from '@/ui/story-decorator';
import { TagBadge } from '.';

export type TagBadgeMeta = Meta<typeof TagBadge>;

export type TagBadgeStory = StoryObj<typeof TagBadge>;

export const Basic: TagBadgeStory = {
  args: {
    children: 'Тег 1'
  }
};

export const WithDifferentColor: TagBadgeStory = {
  args: {
    children: 'Тег 2',
    color: 'green'
  }
};

export default {
  title: 'UI Components/TagBadge',
  component: TagBadge,
  decorators: [StoryDecorator()]
} as TagBadgeMeta;
