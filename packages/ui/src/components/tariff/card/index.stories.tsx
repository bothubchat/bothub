import type { Meta, StoryObj } from '@storybook/react-vite';
import { StoryDecorator } from '@/ui/story-decorator';
import { TariffCard, TariffCardEnterpriseButton } from '.';

export type TariffCardMeta = Meta<typeof TariffCard>;

export type TariffCardStory = StoryObj<typeof TariffCard>;

export const Basic: TariffCardStory = {
  args: {
    label: 'Basic',
    price: '3 900',
    caps: '9 500 000',
    selected: true,
    currency: '₽',
    extraText: 'Вы получаете',
    variant: 'BASIC',
    description:
      'Хватит, чтобы написать роман «Евгений Онегин» АС. Пушкина и повесть «Старик и море» Э. Хемингуэя',
  },
};

export const Premium: TariffCardStory = {
  args: {
    label: 'Premium',
    price: '3 900',
    caps: '9 500 000',
    selected: true,
    popularText: 'Самый популярный',
    currency: '₽',
    extraText: 'Вы получаете',
    variant: 'PREMIUM',
    description:
      'Хватит, чтобы написать роман «Евгений Онегин» АС. Пушкина и повесть «Старик и море» Э. Хемингуэя',
  },
};

export const Deluxe: TariffCardStory = {
  args: {
    label: 'Deluxe',
    price: '3 900',
    caps: '9 500 000',
    currency: '₽',
    extraText: 'Вы получаете',
    variant: 'DELUXE',
    description:
      'Хватит, чтобы написать роман «Евгений Онегин» АС. Пушкина и повесть «Старик и море» Э. Хемингуэя',
  },
};

export const Enterprise: TariffCardStory = {
  args: {
    label: 'Enterprise',
    extraText: 'Давайте обсудим!',
    variant: 'ENTERPRISE',
    button: <TariffCardEnterpriseButton>Обсудить</TariffCardEnterpriseButton>,
    description:
      'Хватит, чтобы написать роман «Евгений Онегин» АС. Пушкина и повесть «Старик и море» Э. Хемингуэя',
  },
};

export default {
  title: 'Components/Tariff/Card',
  component: TariffCard,
  decorators: [StoryDecorator({ scale: 'main' })],
} as TariffCardMeta;
