import type { Meta, StoryObj } from '@storybook/react-vite';
import { StoryDecorator } from '@/ui/story-decorator';
import { Radio } from '.';

export type RadioMeta = Meta<typeof Radio>;

export type RadioStory = StoryObj<typeof Radio>;

export const Basic: RadioStory = {
  args: {
    label: 'Отправлять автоматически'
  }
};

export const Disabled: RadioStory = {
  args: {
    ...Basic.args,
    disabled: true
  }
};

export const DisabledChecked: RadioStory = {
  args: {
    ...Disabled.args,
    checked: true
  }
};

export const Skeleton: RadioStory = {
  args: {
    skeleton: true,
    label: true
  }
};

export default {
  title: 'UI Components/Radio',
  component: Radio,
  decorators: [StoryDecorator()]
} as RadioMeta;
