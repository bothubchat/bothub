import { Meta, StoryObj } from '@storybook/react';
import { MultilevelMenu } from '.';
import { StoryDecorator } from '@/ui/story-decorator';

export type MultilevelMenuMeta = Meta<typeof MultilevelMenu>;
export type MultilevelMenuStory = StoryObj<typeof MultilevelMenu>;

export const Basic: MultilevelMenuStory = {};
export default {
  title: 'UI Components/Multi-level-menu',
  component: MultilevelMenu,
  decorators: [StoryDecorator()]
} as MultilevelMenuMeta;
