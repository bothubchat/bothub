import type { Meta, StoryObj } from '@storybook/react';
import { StoryDecorator } from '@/ui/story-decorator';
import { SliderTabs } from '.';

export type SliderTabsMeta = Meta<typeof SliderTabs>;

export type SliderTabsStory = StoryObj<typeof SliderTabs>;

export const Basic: SliderTabsStory = {
  args: {}
};

export default {
  title: 'UI Components/SliderTabs',
  component: SliderTabs,
  decorators: [StoryDecorator()]
} as SliderTabsMeta;
