import { Meta, StoryObj } from '@storybook/react';
import { MenuTabs } from '.';
import { StoryDecorator } from '@/ui/story-decorator';

export type MenuTabsMeta = Meta<typeof MenuTabs>;

export type MenuTabsStory = StoryObj<typeof MenuTabs>;

export const Basic: MenuTabsStory = {
  args: {
    tabs: [
      { value: 'tab1', label: 'Tab 1' },
      { value: 'tab2', label: 'Tab 2' },
      { value: 'tab3', label: 'Tab 3' },
    ],
  },
};

export default {
  title: 'UI Components/MenuTabs',
  component: MenuTabs,
  decorators: [StoryDecorator()],
};
