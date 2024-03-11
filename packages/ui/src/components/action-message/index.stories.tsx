import type { Meta, StoryObj } from '@storybook/react';
import { StoryDecorator } from '@/ui/story-decorator';
import { ActionMessage } from '.';

export type ActionMessageMeta = Meta<typeof ActionMessage>;

export type ActionMessageStory = StoryObj<typeof ActionMessage>;

export const Basic: ActionMessageStory = {
  args: {
    children: 'Message Action'
  }
};

export default {
  title: 'Components/Message/Action',
  component: ActionMessage,
  decorators: [StoryDecorator()],
  argTypes: {
    children: {
      table: {
        disable: true
      }
    }
  }
} as ActionMessageMeta;
