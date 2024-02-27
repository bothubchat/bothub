import type { Meta, StoryObj } from '@storybook/react';
import { StoryDecorator } from '@/ui/story-decorator';
import { AddBookmarkButton, Bookmarks } from '.';
import { Bookmark } from '@/ui/components/bookmark';

export type BookmarksMeta = Meta<typeof Bookmarks>;

export type BookmarksStory = StoryObj<typeof Bookmarks>;

export const Basic: BookmarksStory = {
  args: {
    add: (
      <AddBookmarkButton />
    ),
    children: (
      <>
        <Bookmark active>Работа</Bookmark>
        <Bookmark>Код</Bookmark>
        <Bookmark>Диплом</Bookmark>
        <Bookmark>Hello World</Bookmark>
        <Bookmark>Для реферата</Bookmark>
      </>
    )
  }
};

export const Skeleton: BookmarksStory = {
  args: {
    add: (
      <AddBookmarkButton disabled />
    ),
    children: (
      <>
        <Bookmark skeleton />
        <Bookmark skeleton />
        <Bookmark skeleton />
        <Bookmark skeleton />
        <Bookmark skeleton />
      </>
    )
  }
};

export default {
  title: 'UI Components/Bookmark/List',
  component: Bookmarks,
  decorators: [StoryDecorator()],
  argTypes: {
    add: {
      table: {
        disable: true
      }
    },
    children: {
      table: {
        disable: true
      }
    }
  }
} as BookmarksMeta;
