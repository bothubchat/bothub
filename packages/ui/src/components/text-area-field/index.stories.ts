import type { Meta, StoryObj } from '@storybook/react';
import { TextAreaField } from '.';
import { ThemeStoryDecorator } from '../../theme/story-decorator';

export type TextAreaFieldMeta = Meta<typeof TextAreaField>;

export type TextAreaFieldStory = StoryObj<typeof TextAreaField>;

export const Basic: TextAreaFieldStory = {
  args: {
    label: 'Label',
    placeholder: 'Placeholder'
  }
};

export const Error: TextAreaFieldStory = {
  args: {
    ...Basic.args,
    error: 'Error message'
  }
};

export const Disabled: TextAreaFieldStory = {
  args: {
    ...Basic.args,
    disabled: true
  }
};

export const Skeleton: TextAreaFieldStory = {
  args: {
    ...Basic.args,
    skeleton: true
  }
};

export default {
  title: 'UI Components/Fields/TextArea',
  component: TextAreaField,
  decorators: [ThemeStoryDecorator()]
} as TextAreaFieldMeta;
