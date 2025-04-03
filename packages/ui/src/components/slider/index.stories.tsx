import type { Meta, StoryObj } from '@storybook/react';
import { StoryDecorator } from '@/ui/story-decorator';
import { Slider } from '.';

export type SliderMeta = Meta<typeof Slider>;

export type SliderStory = StoryObj<typeof Slider>;

export const SliderWithMediumArrows: SliderStory = {
  args: {
    children: (
      <>
        <div
          style={{
            width: 300,
            height: 100,
            background: '#FF0000',
            flexShrink: 0
          }}
        />
        <div
          style={{
            width: 300,
            height: 100,
            background: '#0000FF',
            flexShrink: 0
          }}
        />
        <div
          style={{
            width: 300,
            height: 100,
            background: '#FFFF00',
            flexShrink: 0
          }}
        />
        <div
          style={{
            width: 300,
            height: 100,
            background: '#FF00FF',
            flexShrink: 0
          }}
        />
        <div
          style={{
            width: 300,
            height: 100,
            background: '#00FFFF',
            flexShrink: 0
          }}
        />
        <div
          style={{
            width: 300,
            height: 100,
            background: '#800000',
            flexShrink: 0
          }}
        />
        <div
          style={{
            width: 300,
            height: 100,
            background: '#008000',
            flexShrink: 0
          }}
        />
        <div
          style={{
            width: 300,
            height: 100,
            background: '#000080',
            flexShrink: 0
          }}
        />
      </>
    )
  }
};

export const SliderWithSmallArrows: SliderStory = {
  args: {
    ...SliderWithMediumArrows.args,
    arrowsSize: 'sm'
  }
};

export default {
  title: 'UI Components/Slider',
  component: Slider,
  decorators: [StoryDecorator({ margin: '300px' })]
} as SliderMeta;
