import type { Meta, StoryObj } from '@storybook/react';
import { StoryDecorator } from '@/ui/story-decorator';
import { ThreeDotsLoader } from '.';

export type ThreeDotsLoaderMeta = Meta<typeof ThreeDotsLoader>;

export type ThreeDotsLoaderStory = StoryObj<typeof ThreeDotsLoader>;

export const Basic: ThreeDotsLoaderStory = {};

export default {
  title: 'UI Components/Loader/Three Dots Loader',
  component: ThreeDotsLoader,
  decorators: [StoryDecorator()],
} as ThreeDotsLoaderMeta;
