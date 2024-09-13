import type { Meta, StoryObj } from '@storybook/react';
import { StoryDecorator } from '@/ui/story-decorator';
import { Divider } from '.';
import { Typography } from '../typography';

export type DividerMeta = Meta<typeof Divider>;

export type DividerStory = StoryObj<typeof Divider>;

export const Basic: DividerStory = {
  args: {
    children: '',
  },
};

export const WithText: DividerStory = {
  args: {
    children: <Typography variant="body-m-regular">Divider</Typography>,
  },
};

export default {
  title: 'Components/Divider',
  component: Divider,
  decorators: [StoryDecorator()],
} as DividerMeta;
