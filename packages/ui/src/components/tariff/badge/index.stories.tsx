import type { Meta, StoryObj } from '@storybook/react';
import { StoryDecorator } from '@/ui/story-decorator';
import { UserTariffBadge } from '.';

export type BadgeMeta = Meta<typeof UserTariffBadge>;

export type BadgeStory = StoryObj<typeof UserTariffBadge>;

export const Free: BadgeStory = {
  args: {
    tariff: 'FREE',
  },
};

export const Basic: BadgeStory = {
  args: {
    ...Free.args,
    tariff: 'BASIC',
  },
};

export const Premium: BadgeStory = {
  args: {
    ...Free.args,
    tariff: 'PREMIUM',
  },
};

export const Elite: BadgeStory = {
  args: {
    ...Free.args,
    tariff: 'ELITE',
  },
};

export const Deluxe: BadgeStory = {
  args: {
    ...Free.args,
    tariff: 'DELUXE',
  },
};

export const Skeleton: BadgeStory = {
  args: {
    ...Free.args,
    skeleton: true,
  },
};

export default {
  title: 'Components/Tariff/Badge',
  component: UserTariffBadge,
  decorators: [StoryDecorator()],
  argTypes: {
    icon: {
      table: {
        disable: true,
      },
    },
  },
} as BadgeMeta;
