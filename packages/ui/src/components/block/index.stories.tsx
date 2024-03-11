import type { Meta, StoryObj } from '@storybook/react';
import { StoryDecorator } from '@/ui/story-decorator';
import { Block, BlockToolbar, BlockToolbarButtons } from '.';
import { Typography } from '@/ui/components/typography';
import { Button } from '@/ui/components/button';
import { Plus2Icon } from '@/ui/icons/plus-2';

export type BlockMeta = Meta<typeof Block>;

export type BlockStory = StoryObj<typeof Block>;

export const Basic: BlockStory = {
  args: {
    children: (
      [...Array(50)].map((_, index) => (
        <Typography 
          key={index}
          component="h1"
          variant="h1"
        >
          Content
        </Typography>
      ))
    )
  }
};

export const Title: BlockStory = {
  args: {
    ...Basic.args,
    title: 'Title'
  }
};

export const Toolbar: BlockStory = {
  args: {
    ...Title.args,
    toolbar: (
      <BlockToolbar>
        <BlockToolbarButtons>
          <Button
            startIcon={<Plus2Icon />}
          >
            Button
          </Button>
        </BlockToolbarButtons>
      </BlockToolbar>
    ),
  }
};

export default {
  title: 'UI Components/Block',
  component: Block,
  decorators: [StoryDecorator()],
  argTypes: {
    children: {
      table: {
        disable: true
      }
    }
  }
} as BlockMeta;
