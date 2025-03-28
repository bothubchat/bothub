import type { Meta, StoryObj } from '@storybook/react';
import { StoryDecorator } from '@/ui/story-decorator';
import { Scroll } from '.';

export type ScrollMeta = Meta<typeof Scroll>;

export type ScrollStory = StoryObj<typeof Scroll>;

export const Basic: ScrollStory = {
  args: {
    scrollMultiplier: 3,
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
  title: 'UI Components/Scroll',
  component: Scroll,
  decorators: [StoryDecorator()]
} as ScrollMeta;
