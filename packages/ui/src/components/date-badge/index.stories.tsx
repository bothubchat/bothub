import { StoryObj, Meta } from '@storybook/react-vite';
import { DateBadge } from '.';
import { StoryDecorator } from '@/ui/story-decorator';

export type DateBadgeMeta = Meta<typeof DateBadge>;
export type DateBadgeStory = StoryObj<typeof DateBadge>;

export const Basic: DateBadgeStory = {
  args: {
    date: 'Mon Mar 03 2025 23:23:35 GMT+0400 (Samara Standard Time)',
    locale: 'ru'
  }
};

export default {
  title: 'UI Components/DateBadge',
  component: DateBadge,
  decorators: [StoryDecorator()]
} as DateBadgeMeta;
