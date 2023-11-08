import type { Meta, StoryObj } from '@storybook/react';
import { ThemeStoryDecorator } from '@/ui/theme/story-decorator';
import { Bookmark } from '.';

export type BookmarkMeta = Meta<typeof Bookmark>;

export type BookmarkStory = StoryObj<typeof Bookmark>;

export const Basic: BookmarkStory = {
  args: {
    children: 'Bookmark'
  }
};

export const LongName: BookmarkStory = {
  args: {
    children: 'Bookmark Bookmark Bookmark Bookmark Bookmark Bookmark Bookmark Bookmark Bookmark Bookmark Bookmark Bookmark Bookmark Bookmark Bookmark'
  }
};

export const Skeleton: BookmarkStory = {
  args: {
    skeleton: true
  }
};

export default {
  title: 'UI Components/Bookmark/Item',
  component: Bookmark,
  decorators: [ThemeStoryDecorator()]
} as BookmarkMeta;
