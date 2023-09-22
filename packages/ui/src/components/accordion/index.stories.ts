import type { Meta, StoryObj } from '@storybook/react';
import { Accordion } from '.';
import { ThemeStoryDecorator } from '../../theme/story-decorator';

export type AccordionMeta = Meta<typeof Accordion>;

export type AccordionStory = StoryObj<typeof Accordion>;

export const Basic: AccordionStory = {
  args: {
    label: 'Какие сферы бизнеса могут воспользоваться ChatGPT?',
    children: 'Какие сферы бизнеса могут воспользоваться ChatGPT?'
  }
};

export default {
  title: 'UI Components/Accordion',
  component: Accordion,
  decorators: [ThemeStoryDecorator()]
} as AccordionMeta;
