import type { Meta, StoryObj } from '@storybook/react';
import { ThemeStoryDecorator } from '@/ui/theme/story-decorator';
import { Checkbox } from '.';

export type CheckboxMeta = Meta<typeof Checkbox>;

export type CheckboxStory = StoryObj<typeof Checkbox>;

export const Basic: CheckboxStory = {
  args: {
    label: 'Отправлять автоматически'
  }
};

export const Disabled: CheckboxStory = {
  args: {
    ...Basic.args,
    disabled: true
  }
};

export const DisabledChecked: CheckboxStory = {
  args: {
    ...Disabled.args,
    checked: true
  }
};

export const Skeleton: CheckboxStory = {
  args: {
    ...Basic.args,
    skeleton: true
  }
};

export default {
  title: 'UI Components/Checkbox',
  component: Checkbox,
  decorators: [ThemeStoryDecorator()]
} as CheckboxMeta;
