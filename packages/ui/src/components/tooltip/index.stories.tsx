import type { Meta, StoryObj } from '@storybook/react';
import { ThemeStoryDecorator } from '@/ui/theme/story-decorator';
import { Tooltip } from '.';
import { Button } from '@/ui/components/button';

export type TooltipMeta = Meta<typeof Tooltip>;

export type TooltipStory = StoryObj<typeof Tooltip>;

export const Basic: TooltipStory = {
  args: {
    label: 'Tooltip text',
    children: (
      <Button>
        Hover Me
      </Button>
    )
  }
};

export default {
  title: 'UI Components/Tooltip',
  component: Tooltip,
  decorators: [ThemeStoryDecorator({ margin: '50px 0px' })]
} as TooltipMeta;
