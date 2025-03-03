import { StoryObj, Meta } from '@storybook/react';
import { DateBadge } from '.';
import { StoryDecorator } from '@/ui/story-decorator';

export type DateBadgeMeta = Meta<typeof DateBadge>;
export type DateBadgeStory = StoryObj<typeof DateBadge>;

export const Basic: DateBadgeStory = {
  args: {
    date: 'Mon Mar 03 2025 23:23:35 GMT+0400 (Samara Standard Time)',
    months: [
      'Января',
      'Февраля',
      'Марта',
      'Апреля',
      'Мая',
      'Июня',
      'Июля',
      'Августа',
      'Сентября',
      'Октября',
      'Ноября',
      'Декабря'
    ]
  }
};

export default {
  title: 'UI Components/DateBadge',
  component: DateBadge,
  decorators: [StoryDecorator()]
} as DateBadgeMeta;
