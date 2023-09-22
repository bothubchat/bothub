import type { Meta, StoryObj } from '@storybook/react';
import { Tariff } from '.';
import { ThemeStoryDecorator } from '../../theme/story-decorator';

export type TariffMeta = Meta<typeof Tariff>;

export type TariffStory = StoryObj<typeof Tariff>;

export const Basic: TariffStory = {
  args: {
    name: 'Premium',
    text: 'Базовый набор функций, рекомендуется для более частого использования платформы',
    price: '600',
    currency: '₽',
    list: [
      'Chatgpt-4-8k',
      '100 000 Токенов',
      'Midjourney',
      'Быстрая генерация до 3 часов'
    ],
    button: 'Приобрести',
    validityPeriod: '(срок действия пакета не ограничен, токены не сгорают)',
    color: 'blue-lilac'
  }
};

export default {
  title: 'UI Components/Tariff',
  component: Tariff,
  decorators: [ThemeStoryDecorator()]
} as TariffMeta;
