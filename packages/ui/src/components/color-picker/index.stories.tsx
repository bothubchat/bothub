import { Meta, StoryObj } from '@storybook/react';
import { StoryDecorator } from '@/ui/story-decorator';
import { ColorPicker } from '.';

export type ColorPickerMeta = Meta<typeof ColorPicker>;

export type ColorPickerStory = StoryObj<typeof ColorPicker>;

export const Basic: ColorPickerStory = {
  args: {
    initialColor: '#1C64F2',
    label: 'Акцентный цвет',
    preview: true
  }
};

export default {
  title: 'Components/ColorPicker',
  component: ColorPicker,
  decorators: [StoryDecorator()]
} as ColorPickerMeta;
