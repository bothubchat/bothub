import type { Meta, StoryObj } from '@storybook/react';
import { StoryDecorator } from '@/ui/story-decorator';
import { TariffCard } from '.';
import { TariffCardStyledGiveCaps, TariffCardGiveCapsBadge, TariffCardGiveCapsText, TariffCardStyledDescription, TariffCardStyledDescriptionIcon } from './styled';

export type TariffCardMeta = Meta<typeof TariffCard>;

export type TariffCardStory = StoryObj<typeof TariffCard>;

export const Basic: TariffCardStory = {
  args: {
    name: 'Basic',
    price: '200',
    currency: '₽',
    giveCaps: 
    <TariffCardStyledGiveCaps>
      <TariffCardGiveCapsText>
        Вы получаете
      </TariffCardGiveCapsText>
      <TariffCardGiveCapsBadge>
        3 000 000 Caps
      </TariffCardGiveCapsBadge>
    </TariffCardStyledGiveCaps>,
    children: 
    <>
      <TariffCardStyledDescriptionIcon/>
      <TariffCardStyledDescription>
        Хватит, чтобы написать роман «Евгений Онегин» А.С. Пушкина и повесть «Старик и море» Э. Хемингуэя
      </TariffCardStyledDescription>
    </>,
  }
};

export default {
  title: 'Components/Tariff/Row',
  component: TariffCard,
  decorators: [StoryDecorator()]
} as TariffCardMeta;
