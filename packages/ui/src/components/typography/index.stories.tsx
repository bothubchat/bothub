import type { Meta, StoryObj } from '@storybook/react-vite';
import { StoryDecorator } from '@/ui/story-decorator';
import { Skeleton as BothubSkeleton } from '@/ui/components/skeleton';
import { Typography } from '.';

export type TypographyMeta = Meta<typeof Typography>;

export type TypographyStory = StoryObj<typeof Typography>;

export const Basic: TypographyStory = {
  args: {
    children: 'Typography',
  },
};

export const Skeleton: TypographyStory = {
  args: {
    children: <BothubSkeleton />,
  },
};

export default {
  title: 'UI Components/Typography',
  component: Typography,
  decorators: [StoryDecorator()],
  argTypes: {
    children: {
      table: {
        disable: true,
      },
    },
  },
} as TypographyMeta;
