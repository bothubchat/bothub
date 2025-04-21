import { Meta, StoryObj } from '@storybook/react';
import { MultilevelMenu } from '.';
import { StoryDecorator } from '@/ui/story-decorator';
import { menuItems } from './config';

export type MultilevelMenuMeta = Meta<typeof MultilevelMenu>;
export type MultilevelMenuStory = StoryObj<typeof MultilevelMenu>;

export const Basic: MultilevelMenuStory = {
  args: {
    config: menuItems
  }
};
export default {
  title: 'UI Components/MultiLevelMenu',
  component: MultilevelMenu,
  decorators: [StoryDecorator()]
} as MultilevelMenuMeta;
