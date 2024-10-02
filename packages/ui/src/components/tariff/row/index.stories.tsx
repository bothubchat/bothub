import type { Meta, StoryObj } from '@storybook/react';
import { StoryDecorator } from '@/ui/story-decorator';
import { TariffCardRow } from '.';
import {
  TariffCardStyledGiveCaps, TariffCardGiveCapsBadge, TariffCardGiveCapsText, TariffCardStyledDescription, TariffCardStyledDescriptionIcon, TariffCardGiveCapsBadgeText 
} from './styled';

export type TariffCardMeta = Meta<typeof TariffCardRow>;

export type TariffCardStory = StoryObj<typeof TariffCardRow>;

export const Basic: TariffCardStory = {
  args: {
    name: 'Basic',
    price: '200',
    currency: '₽',
    color: 'white',
    giveCaps: '3 000 000 caps',
    giveCapsText: 'Вы получаете',
    description: 'Хватит, чтобы написать роман «Евгений Онегин» А.С. Пушкина и повесть «Старик и море» Э. Хемингуэя',
  }
};

export default {
  title: 'Components/Tariff/Row',
  component: TariffCardRow,
  decorators: [StoryDecorator()]
} as TariffCardMeta;
