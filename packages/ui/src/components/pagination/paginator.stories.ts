import type { Meta, StoryObj } from '@storybook/react';
import { ThemeStoryDecorator } from '@/ui/theme/story-decorator';
import { Paginator } from './paginator';

export type PaginatorMeta = Meta<typeof Paginator>;

export type PaginatorStory = StoryObj<typeof Paginator>;

export const Basic: PaginatorStory = {
  args: {
    lastPage: 80,
    current: 1,
    onChange: (page) => console.log('change page', page),
  }
};

export default {
  title: 'UI Components/Paginator',
  component: Paginator,
  decorators: [ThemeStoryDecorator()],
  argTypes: {
    current: { control: { type: 'number' } },
    lastPage: { control: { type: 'number' } },
  }
} as PaginatorMeta;
