import type { Meta, StoryObj } from '@storybook/react';
import { Chip, ChipImage } from '@/ui/components/chip';
import { StoryDecorator } from '@/ui/story-decorator';
import image from './assets/image.png';
import { Badge as BothubBadge } from '@/ui/components/badge';

export type ChipMeta = Meta<typeof Chip>;

export type ChipStory = StoryObj<typeof Chip>;

export const Basic: ChipStory = {
  args: {
    children: 'Text'
  }
};

export const Image: ChipStory = {
  args: {
    ...Basic.args,
    image: (
      <ChipImage
        src={image}
        alt="Chip image"
      />
    )
  }
};

export const Badge: ChipStory = {
  args: {
    ...Image.args,
    start: (
      <BothubBadge
        brick
      >
        Source Image
      </BothubBadge>
    )
  }
};

export default {
  title: 'UI Components/Chip',
  component: Chip,
  decorators: [StoryDecorator()]
} as ChipMeta;
