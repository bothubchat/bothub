import type { Meta, StoryObj } from '@storybook/react';
import { StoryDecorator } from '@/ui/story-decorator';
import { Slider } from '.';

export type SliderMeta = Meta<typeof Slider>;

export type SliderStory = StoryObj<typeof Slider>;

export const Basic: SliderStory = {
  args: {
    sliderMultiplier: 3,
    children: (
      <div
        style={{
          width: 3000,
          height: 100,
          background:
            'linear-gradient(90deg, #FF0000, #0000FF, #FFFF00, #FF00FF, #00FFFF, #800000, #008000, #000080)'
        }}
      />
    )
  }
};

export default {
  title: 'UI Components/Slider',
  component: Slider,
  decorators: [StoryDecorator()]
} as SliderMeta;
