import type { Meta, StoryObj } from '@storybook/react-vite';
import { StoryDecorator } from '@/ui/story-decorator';
import { AIIcon } from '@/ui/icons';
import { Badge } from '.';

export type BadgeMeta = Meta<typeof Badge>;

export type BadgeStory = StoryObj<typeof Badge>;

export const Basic: BadgeStory = {
  args: {
    children: 'Text'
  }
};

export const Icon: BadgeStory = {
  args: {
    ...Basic.args,
    icon: <AIIcon />
  }
};

export const Blue: BadgeStory = {
  args: {
    ...Icon.args,
    variant: 'blue'
  }
};

export const Success: BadgeStory = {
  args: {
    ...Icon.args,
    variant: 'success'
  }
};

export const Critic: BadgeStory = {
  args: {
    ...Icon.args,
    variant: 'critic'
  }
};

export const Info: BadgeStory = {
  args: {
    ...Icon.args,
    variant: 'info'
  }
};

export const Brick: BadgeStory = {
  args: {
    ...Icon.args,
    brick: true
  }
};

export const Error: BadgeStory = {
  args: {
    variant: 'error',
    children: 'Ошибка генерации'
  }
};

export const Skeleton: BadgeStory = {
  args: {
    ...Basic.args,
    variant: 'blue',
    skeleton: true
  }
};

export default {
  title: 'UI Components/Badge',
  component: Badge,
  decorators: [StoryDecorator()],
  argTypes: {
    icon: {
      table: {
        disable: true
      }
    }
  }
} as BadgeMeta;
