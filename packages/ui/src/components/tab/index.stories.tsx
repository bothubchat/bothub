import type { Meta, StoryObj } from '@storybook/react';
import { ThemeStoryDecorator } from '@/ui/theme/story-decorator';
import { Tab } from '.';

export type TabMeta = Meta<typeof Tab>;

export type TabStory = StoryObj<typeof Tab>;

export const Basic: TabStory = {
  args: {
    children: 'Tab item'
  }
};

export default {
  title: 'UI Components/Tab',
  component: Tab,
  decorators: [ThemeStoryDecorator()]
} as TabMeta;
