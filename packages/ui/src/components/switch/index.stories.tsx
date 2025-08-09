import { Meta, StoryObj } from '@storybook/react';
import { Switch } from '@/ui/components/switch/index';
import { StoryDecorator } from '@/ui/story-decorator';

export type SwitchFieldMeta = Meta<typeof Switch>;

export type SwitchFieldStory = StoryObj<typeof Switch>;

export const Basic: SwitchFieldStory = {
  args: {},
};

export const Label: SwitchFieldStory = {
  args: {
    label: 'Label',
  },
};

export default {
  title: 'UI Components/Switch',
  component: Switch,
  decorators: [StoryDecorator({ margin: '50px 0px' })],
} as SwitchFieldMeta;
