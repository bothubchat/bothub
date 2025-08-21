import type { Meta, StoryObj } from '@storybook/react-vite';
import { StoryDecorator } from '@/ui/story-decorator';
import { AdaptiveBlock } from '.';

export type AdaptiveMeta = Meta<typeof AdaptiveBlock>;

export type AdaptiveStory = StoryObj<typeof AdaptiveBlock>;

export const Basic: AdaptiveStory = {};

export const WithoutMiniTablet: AdaptiveStory = {
  args: {
    disableMiniTablet: true,
  },
};

export const Merge: AdaptiveStory = {
  args: {
    merge: true,
  },
};

export default {
  title: 'Adaptive',
  component: AdaptiveBlock,
  decorators: [StoryDecorator()],
} as AdaptiveMeta;
