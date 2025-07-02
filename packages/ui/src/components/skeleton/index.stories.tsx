import type { Meta, StoryObj } from '@storybook/react-vite';
import { StoryDecorator } from '@/ui/story-decorator';
import { Skeleton } from '.';

export type SkeletonMeta = Meta<typeof Skeleton>;

export type SkeletonStory = StoryObj<typeof Skeleton>;

export const Basic: SkeletonStory = {};

export default {
  title: 'UI Components/Skeleton',
  component: Skeleton,
  decorators: [StoryDecorator()]
} as SkeletonMeta;
