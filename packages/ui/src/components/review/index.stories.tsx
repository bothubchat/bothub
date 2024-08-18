import type { Meta, StoryObj } from '@storybook/react';
import { StoryDecorator } from '@/ui/story-decorator';

import Review from '.';

import avatar1 from './assets/avatar1.png';

export type ReviewMeta = Meta<typeof Review>;

export type ReviewStory = StoryObj<typeof Review>;

export const Basic: ReviewStory = {
  args: {
    src: avatar1,
    alt: 'avatar',
    reviewer: 'Даниил',
    review:
      'Текст отзыва. Длиииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииинный текст.',
  },
};

export default {
  title: 'Components/Review',
  component: Review,
  decorators: [StoryDecorator()],
} as ReviewMeta;
