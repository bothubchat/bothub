import type { Meta, StoryObj } from '@storybook/react-vite';
import { StoryDecorator } from '@/ui/story-decorator';
import { TariffList } from '.';
import {
  TariffCard,
  TariffCardArrow,
  TariffCardEnterpriseButton
} from '../card';

export type TariffListMeta = Meta<typeof TariffList>;

export type TariffListStory = StoryObj<typeof TariffList>;

export const Basic: TariffListStory = {
  args: {
    children: (
      <>
        <TariffCard
          caps="10 000"
          extraText="Вы получаете"
          description="Хватит, чтобы написать небольшой абзац для сочинения"
          selected
          price="0"
          currency="₽"
          label="Free"
          variant="FREE"
        />
        <TariffCard
          caps="9 500 000"
          description="Хватит, чтобы собрать полный текст «Большого толкового словаря Русского языка» под. ред. С.А Кузнецова"
          extraText="Вы получаете"
          discount="вы экономите 20%"
          price="1 500"
          currency="₽"
          label="Deluxe"
          variant="DELUXE"
        />
        <TariffCard
          caps="1 000 000"
          extraText="Вы получаете"
          description="Хватит, чтобы написать роман «Евгений Онегин» А.С. Пушкина и повесть «Старик и море» Э. Хемингуэя"
          price="200"
          currency="₽"
          label="Basic"
          variant="BASIC"
        />
        <TariffCard
          caps="38 000 000"
          extraText="Вы получаете"
          discount="вы экономите 25%"
          description="Хватит, чтобы написать всю серию книг о Гарри Поттере"
          price="5 500"
          currency="₽"
          label="Elite"
          variant="ELITE"
        />
        <TariffCard
          caps="3 500 000"
          extraText="Вы получаете"
          description="Хватит, чтобы переписать весь текст «Конституции РФ» 8 раз"
          price="600"
          popularText="Самый популярный"
          currency="₽"
          label="Premium"
          variant="PREMIUM"
        />
        <TariffCard
          extraText="Давайте обсудим!"
          description="Для команд и бизнеса, с личным кабинетом и индивидуальными консультациями"
          label="Enterprise"
          button={
            <TariffCardEnterpriseButton
              href="https://bothub.chat"
              endIcon={<TariffCardArrow />}
            >
              Обсудить
            </TariffCardEnterpriseButton>
          }
          variant="ENTERPRISE"
        />
      </>
    )
  }
};

export default {
  title: 'Components/Tariff/List',
  component: TariffList,
  decorators: [StoryDecorator({ scale: 'main' })]
} as TariffListMeta;
