import type { Meta, StoryObj } from '@storybook/react';
import { StoryDecorator } from '@/ui/story-decorator';
import { Loader } from '.';

export type LoaderMeta = Meta<typeof Loader>;

export type LoaderStory = StoryObj<typeof Loader>;

export const Basic: LoaderStory = {};

export default {
  title: 'UI Components/Loader',
  component: Loader,
  decorators: [StoryDecorator()],
} as LoaderMeta;
