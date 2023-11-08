import type { Meta, StoryObj } from '@storybook/react';
import { ThemeStoryDecorator } from '@/ui/theme/story-decorator';
import {
  BookmarkCard, 
  BookmarkCardActions, 
  BookmarkCardChat, 
  BookmarkCardDeleteAction, 
  BookmarkCardEditAction 
} from '.';

export type BookmarkCardMeta = Meta<typeof BookmarkCard>;

export type BookmarkCardStory = StoryObj<typeof BookmarkCard>;

export const Basic: BookmarkCardStory = {
  args: {
    name: 'Учёба',
    actions: (
      <BookmarkCardActions>
        <BookmarkCardEditAction />
        <BookmarkCardDeleteAction />
      </BookmarkCardActions>
    ),
    children: (
      <>
        <BookmarkCardChat name="Your first chat" />
        <BookmarkCardChat name="Придумать логотип" />
        <BookmarkCardChat name="Дипломная работа" />
      </>
    )
  }
};

export const LongName: BookmarkCardStory = {
  args: {
    ...Basic.args,
    name: 'Длинное название закладки Длинное название закладки Длинное название закладки Длинное название закладки Длинное название закладки Длинное название закладки'
  }
};

export const Skeleton: BookmarkCardStory = {
  args: {
    skeleton: true,
    children: [...Array(3)].map((_, index) => (
      <BookmarkCardChat 
        key={index}
        skeleton
      />
    ))
  }
};

export default {
  title: 'UI Components/Bookmark/Card',
  component: BookmarkCard,
  decorators: [ThemeStoryDecorator()]
} as BookmarkCardMeta;
