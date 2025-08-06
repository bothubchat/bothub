import type { Meta, StoryObj } from '@storybook/react-vite';
import { Paginator } from './paginator';
import { StoryDecorator } from '@/ui/story-decorator';

export type PaginatorMeta = Meta<typeof Paginator>;

export type PaginatorStory = StoryObj<typeof Paginator>;

export const Basic: PaginatorStory = {
  args: {
    lastPage: 80,
    current: 1,
  },
};

export default {
  title: 'UI Components/Paginator',
  component: Paginator,
  decorators: [StoryDecorator()],
  argTypes: {
    current: { control: { type: 'number' } },
    lastPage: { control: { type: 'number' } },
  },
} as PaginatorMeta;
