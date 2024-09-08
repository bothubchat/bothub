import type { Meta, StoryObj } from '@storybook/react';
import { StoryDecorator } from '@/ui/story-decorator';
import { TariffListRow } from '.';

export type TariffListRowMeta = Meta<typeof TariffListRow>;

export type TariffListRowStory = StoryObj<typeof TariffListRow>;

export const Basic: TariffListRowStory = {
  args: {
    cardList: [
      {
        name: 'Free',
        giveCapsText: 'Вы получаете',
        giveCaps: '10 000 Caps',
        price: '0',
        currency: '₽',
        color: 'white',
        description: 'Хватит, чтобы написать небольшой абзац для сочинения',
      },
      {
        name: 'Basic',
        giveCapsText: 'Вы получаете',
        giveCaps: '1 000 000 Caps',
        price: '200',
        currency: '₽',
        color: 'blue',
        description:
          'Хватит, чтобы написать роман «Евгений Онегин» А.С. Пушкина и повесть «Старик и море» Э. Хемингуэя',
      },
      {
        name: 'Premium',
        giveCapsText: 'Вы получаете',
        giveCaps: '3 000 000 Caps',
        price: '600',
        currency: '₽',
        color: 'blue-lilac',
        description:
          'Хватит, чтобы переписать весь текст «Конституции РФ» 8 раз',
      },
      {
        name: 'Deluxe',
        giveCapsText: 'Вы получаете',
        giveCaps: '7 500 000 Caps',
        price: '1500',
        currency: '₽',
        color: 'blue-lilac',
        description:
          'Хватит, чтобы собрать полный текст «Большого толкового словаря Русского языка» под. ред. С.А Кузнецова',
      },
      {
        name: 'Elite',
        giveCapsText: 'Вы получаете',
        giveCaps: '30 000 000 Caps',
        price: '5400',
        currency: '₽',
        color: 'blue-lilac',
        description: 'Хватит, чтобы написать всю серию книг о Гарри Поттере',
      },
    ],
  },
};

export default {
  title: 'Components/Tariff/ListRow',
  component: TariffListRow,
  decorators: [StoryDecorator()],
} as TariffListRowMeta;