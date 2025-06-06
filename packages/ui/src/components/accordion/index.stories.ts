import type { Meta, StoryObj } from '@storybook/react';
import { Accordion } from '.';
import { StoryDecorator } from '@/ui/story-decorator';

export type AccordionMeta = Meta<typeof Accordion>;

export type AccordionStory = StoryObj<typeof Accordion>;

export const Basic: AccordionStory = {
  args: {
    label: 'Какие сферы бизнеса могут воспользоваться ChatGPT?',
    children: 'Какие сферы бизнеса могут воспользоваться ChatGPT?'
  }
};

export const WithALotOfText: AccordionStory = {
  args: {
    variant: 'with-icon',
    label: 'Какие сферы бизнеса могут воспользоваться ChatGPT? '.repeat(3),
    children: 'Какие сферы бизнеса могут воспользоваться ChatGPT? '.repeat(10)
  }
};

export default {
  title: 'UI Components/Accordion',
  component: Accordion,
  decorators: [StoryDecorator()]
} as AccordionMeta;
