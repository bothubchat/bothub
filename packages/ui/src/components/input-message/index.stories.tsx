import type { Meta, StoryObj } from '@storybook/react';
import { InputMessage } from '.';
import { ThemeStoryDecorator } from '@/ui/theme/story-decorator';

export type InputMessageMeta = Meta<typeof InputMessage>;

export type InputMessageStory = StoryObj<typeof InputMessage>;

export const Basic: InputMessageStory = {};

export const Disabled: InputMessageStory = {
  args: {
    disabled: true
  }
};

export default {
  title: 'UI Components/Message/Input',
  component: InputMessage,
  decorators: [ThemeStoryDecorator()],
  args: {
    placeholder: 'Спроси о чем-нибудь...'
  }
} as InputMessageMeta;
