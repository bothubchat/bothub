import { Meta, StoryObj } from '@storybook/react';
import { Drawer } from '@/ui/components/drawer';
import { StoryDecorator } from '@/ui/story-decorator';

export type DrawerMeta = Meta<typeof Drawer>;

export type DrawerStory = StoryObj<typeof Drawer>;

export default {
  title: 'UI Components/Drawer',
  decorators: [StoryDecorator()],
  component: Drawer
} as DrawerMeta;

export const Basic: DrawerStory = {
  args: {
    children: 'Text',
    open: true,
  }
};
