import type { Meta, StoryObj } from '@storybook/react';
import { ThemeStoryDecorator } from '@/ui/theme/story-decorator';
import { Skeleton as BothubSkeleton } from '@/ui/components/skeleton';
import { Avatar } from '.';

export type AvatarMeta = Meta<typeof Avatar>;

export type AvatarStory = StoryObj<typeof Avatar>;

export const Basic: AvatarStory = {
  args: {
    src: 'https://lh3.googleusercontent.com/a/AAcHTtdrCPPVWKH7r9JfDe7l99rmfw24zPAJkPOJTXQSg8tgKcc=s96-c',
    alt: '@dev2alert'
  }
};

export const Default: AvatarStory = {
  args: {
    alt: '@dev2alert'
  }
};

export const Bot: AvatarStory = {
  args: {
    variant: 'bot',
    alt: '@bothub'
  }
};

export const Skeleton: AvatarStory = {
  args: {
    children: <BothubSkeleton />
  }
};

export default {
  title: 'UI Components/Avatar',
  component: Avatar,
  decorators: [ThemeStoryDecorator()]
} as AvatarMeta;
