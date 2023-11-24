import type { Meta, StoryObj } from '@storybook/react';
import { ThemeStoryDecorator } from '@/ui/theme/story-decorator';
import { Skeleton as BothubSkeleton } from '@/ui/components/skeleton';
import { MessageAction } from '.';

export type MessageActionMeta = Meta<typeof MessageAction>;

export type MessageActionStory = StoryObj<typeof MessageAction>;

export const Basic: MessageActionStory = {
  args: {
    children: 'Message Action'
  }
};

export const Skeleton: MessageActionStory = {
  args: {
    children: <BothubSkeleton />
  }
};

export default {
  title: 'UI Components/Message/Action',
  component: MessageAction,
  decorators: [ThemeStoryDecorator()],
  argTypes: {
    children: {
      table: {
        disable: true
      }
    }
  }
} as MessageActionMeta;
