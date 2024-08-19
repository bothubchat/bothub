import type { Meta, StoryObj } from '@storybook/react';
import { StoryDecorator } from '@/ui/story-decorator';

import { Reviews } from '.';

import avatar1 from '../review/assets/avatar1.png';

import { ArrowNarrowRightIcon } from '@/ui/icons';

export type ReviewsMeta = Meta<typeof Reviews>;

export type ReviewsStory = StoryObj<typeof Reviews>;

export const Basic: ReviewsStory = {
  args: {
    sectionTitle: 'Отзывы в сообществе',
    reviews: [
      {
        src: avatar1,
        alt: 'avatar',
        reviewer: 'Даниил',
        review:
          'Текст отзыва. Длиииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииинный.',
      },
      {
        src: avatar1,
        alt: 'avatar',
        reviewer: 'Даниил',
        review:
          'Текст отзыва. Длиииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииинный.',
      },
      {
        src: avatar1,
        alt: 'avatar',
        reviewer: 'Даниил',
        review:
          'Текст отзыва. Длиииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииинный.',
      },
      {
        src: avatar1,
        alt: 'avatar',
        reviewer: 'Даниил',
        review:
          'Текст отзыва. Длиииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииинный.',
      },
      {
        src: avatar1,
        alt: 'avatar',
        reviewer: 'Даниил',
        review:
          'Текст отзыва. Длиииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииинный.',
      },
      {
        src: avatar1,
        alt: 'avatar',
        reviewer: 'Даниил',
        review:
          'Текст отзыва. Длиииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииинный.',
      },
      {
        src: avatar1,
        alt: 'avatar',
        reviewer: 'Даниил',
        review:
          'Текст отзыва. Длиииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииинный.',
      },
      {
        src: avatar1,
        alt: 'avatar',
        reviewer: 'Даниил',
        review:
          'Текст отзыва. Длиииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииииинный.',
      },
    ],
    buttonProps: {
      label: 'Перейти в сообщество',
      endIcon: <ArrowNarrowRightIcon />,
    },
  },
};

export default {
  title: 'Components/Reviews/Reviews section',
  component: Reviews,
  decorators: [StoryDecorator()],
} as ReviewsMeta;
