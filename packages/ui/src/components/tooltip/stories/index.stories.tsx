import type { Meta, StoryObj } from '@storybook/react';
import { StoryDecorator } from '@/ui/story-decorator';
import {
  Tooltip, TooltipColumn, TooltipImage, TooltipLabel, TooltipLabelBold 
} from '@/ui/components/tooltip';
import { Button } from '@/ui/components/button';
import image from './assets/image.jpg';
import { Badge } from '@/ui/components/badge';
import { LightningIcon } from '@/ui/icons/lightning';

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

export const IconButton: TooltipStory = {
  args: {
    ...Basic.args,
    children: (
      <Button>
        <LightningIcon />
      </Button>
    )
  }
};

export const Image: TooltipStory = {
  args: {
    ...Basic.args,
    label: (
      <TooltipColumn>
        <TooltipImage
          src={image}
          width={50}
          height={50}
          alt="Tooltip image"
        />
        <TooltipLabel>
          100
        </TooltipLabel>
      </TooltipColumn>
    )
  }
};

export const Bold: TooltipStory = {
  args: {
    label: (
      <TooltipLabel>
        <TooltipLabelBold>
          Причина:
        </TooltipLabelBold>
        {' '}
        API не отвечает.
      </TooltipLabel>
    ),
    placement: 'top-left',
    placementX: 5,
    children: (
      <Badge
        variant="error"
      >
        Ошибка генерации
      </Badge>
    )
  }
};

export const Markdown: TooltipStory = {
  args: {
    ...Basic.args,
    label: '**Markdown** text',
    markdown: true
  }
};

export default {
  title: 'UI Components/Tooltip',
  component: Tooltip,
  decorators: [StoryDecorator({ margin: '100px 100px' })]
} as TooltipMeta;
