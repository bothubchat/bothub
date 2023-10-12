import type { Meta, StoryObj } from '@storybook/react';
import { ThemeStoryDecorator } from '@/ui/theme/story-decorator';
import { Skeleton } from '.';

export type SkeletonMeta = Meta<typeof Skeleton>;

export type SkeletonStory = StoryObj<typeof Skeleton>;

export const Basic: SkeletonStory = {};

export default {
  title: 'UI Components/Skeleton',
  component: Skeleton,
  decorators: [ThemeStoryDecorator()]
} as SkeletonMeta;
