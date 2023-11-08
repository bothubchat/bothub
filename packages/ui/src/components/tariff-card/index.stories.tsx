import type { Meta, StoryObj } from '@storybook/react';
import { ThemeStoryDecorator } from '@/ui/theme/story-decorator';
import {
  TariffCard, 
  TariffCardGiveCaps, 
  TariffCardGiveCapsBadge, 
  TariffCardGiveCapsText, 
  TariffCardModel, 
  TariffCardModels 
} from '.';

export type TariffCardMeta = Meta<typeof TariffCard>;

export type TariffCardStory = StoryObj<typeof TariffCard>;

export const Basic: TariffCardStory = {
  args: {
    name: 'Premium',
    giveCaps: (
      <TariffCardGiveCaps>
        <TariffCardGiveCapsText>
          Вы получаете
        </TariffCardGiveCapsText>
        <TariffCardGiveCapsBadge>
          3 000 000 Caps
        </TariffCardGiveCapsBadge>
      </TariffCardGiveCaps>
    ),
    price: '600',
    currency: '₽',
    details: 'Подробнее о стоимости токенов',
    purchase: 'Приобрести',
    validityPeriod: '(срок действия пакета не ограничен, токены не сгорают)',
    color: 'blue-lilac',
    children: (
      <TariffCardModels label="Доступные модели:">
        <TariffCardModel
          name="ChatGPT 4"
          tokens="100 000 Токенов"
        />
        <TariffCardModel
          name="ChatGPT 4-32k"
          tokens="50 000 Токенов"
        />
        <TariffCardModel
          name="Claude v2.0"
          tokens="200 000 Токенов"
        />
        <TariffCardModel
          name="Midjourney 5"
          tokens="300 Caps/Генерация"
        />
      </TariffCardModels>
    )
  }
};

export default {
  title: 'UI Components/Tariff/Card',
  component: TariffCard,
  decorators: [ThemeStoryDecorator()]
} as TariffCardMeta;
