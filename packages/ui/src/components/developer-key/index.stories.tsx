import type { Meta, StoryObj } from '@storybook/react-vite';
import { StoryDecorator } from '@/ui/story-decorator';
import { DeveloperKey } from '.';

export type DeveloperKeyMeta = Meta<typeof DeveloperKey>;

export type DeveloperKeyStory = StoryObj<typeof DeveloperKey>;

export const Basic: DeveloperKeyStory = {
  args: {
    children:
      '315f5bdb76d078c43b8ac0064e4a0164612b1fce77c869345bfc94c75894edd3315f5bdb76d078c43b8ac0064e4a0164612b1fce77c869345bfc94c75894edd3',
  },
};

export const Skeleton: DeveloperKeyStory = {
  args: {
    skeleton: true,
  },
};

export default {
  title: 'Components/DeveloperKey/Item',
  component: DeveloperKey,
  decorators: [StoryDecorator()],
} as DeveloperKeyMeta;
