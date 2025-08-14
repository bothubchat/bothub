import type { Meta, StoryObj } from '@storybook/react-vite';
import { StoryDecorator } from '@/ui/story-decorator';
import { Tab } from '.';

export type TabMeta = Meta<typeof Tab>;

export type TabStory = StoryObj<typeof Tab>;

export const Basic: TabStory = {
  args: {
    children: 'Tab item',
  },
};

export default {
  title: 'UI Components/Tab/Item',
  component: Tab,
  decorators: [StoryDecorator()],
} as TabMeta;
