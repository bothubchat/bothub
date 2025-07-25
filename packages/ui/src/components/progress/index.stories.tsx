import type { Meta, StoryObj } from '@storybook/react';
import { StoryDecorator } from '@/ui/story-decorator';
import { Progress } from '.';

export type ProgressMeta = Meta<typeof Progress>;

export type ProgressStory = StoryObj<typeof Progress>;

export const Basic: ProgressStory = {
  args: {},
};

export const Skeleton: ProgressStory = {
  args: {
    skeleton: true,
  },
};

export default {
  title: 'UI Components/Progress',
  component: Progress,
  decorators: [StoryDecorator()],
} as ProgressMeta;
