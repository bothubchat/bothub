import type { Meta, StoryObj } from '@storybook/react-vite';
import { StoryDecorator } from '@/ui/story-decorator';
import { SwitcherSelect } from '.';

export type SwitcherSelectMeta = Meta<typeof SwitcherSelect>;

export type SwitcherSelectStory = StoryObj<typeof SwitcherSelect>;

export const Basic: SwitcherSelectStory = {
  args: {
    options: ['api', 'dashboard'],
  },
};

export default {
  title: 'UI Components/SwitcherSelect',
  component: SwitcherSelect,
  decorators: [StoryDecorator()],
} as SwitcherSelectMeta;
