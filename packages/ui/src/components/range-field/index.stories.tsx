import type { Meta, StoryObj } from '@storybook/react';
import { RangeField } from '.';
import { ThemeStoryDecorator } from '../../theme/story-decorator';

export type RangeFieldMeta = Meta<typeof RangeField>;

export type RangeFieldStory = StoryObj<typeof RangeField>;

export const Basic: RangeFieldStory = {
  args: {
    label: 'Label',
    step: 0.1,
    min: 0,
    max: 100
  }
};

export const Error: RangeFieldStory = {
  args: {
    ...Basic.args,
    error: 'Error message'
  }
};

export default {
  title: 'UI Components/RangeField',
  component: RangeField,
  decorators: [ThemeStoryDecorator()]
} as RangeFieldMeta;
