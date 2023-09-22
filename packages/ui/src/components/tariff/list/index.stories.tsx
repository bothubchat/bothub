import type { Meta, StoryObj } from '@storybook/react';
import { TariffList } from '.';
import { ThemeStoryDecorator } from '../../../theme/story-decorator';
import { Tariff } from '..';

export type TariffListMeta = Meta<typeof TariffList>;

export type TariffListStory = StoryObj<typeof TariffList>;

export const Basic: TariffListStory = {
  args: {
    children: (
      <>
        <Tariff
          name="Free"
          text="Базовый набор функций, рекомендуется для ознакомления с функционалом платформы"
          price="0"
          currency="₽"
          list={[
            "Chatgpt3.5-4k",
            "10 000 Токенов",
            "Midjourney",
            "30 Обычных генераций"
          ]}
          button="Приобрести"
          validityPeriod="(срок действия пакета не ограничен, токены не сгорают)"
        />
        <Tariff
          name="Free"
          text="Базовый набор функций, рекомендуется для ознакомления с функционалом платформы"
          price="0"
          currency="₽"
          list={[
            "Chatgpt3.5-4k",
            "10 000 Токенов",
            "Midjourney",
            "30 Обычных генераций"
          ]}
          button="Приобрести"
          validityPeriod="(срок действия пакета не ограничен, токены не сгорают)"
        />
        <Tariff
          name="Free"
          text="Базовый набор функций, рекомендуется для ознакомления с функционалом платформы"
          price="0"
          currency="₽"
          list={[
            "Chatgpt3.5-4k",
            "10 000 Токенов",
            "Midjourney",
            "30 Обычных генераций"
          ]}
          button="Приобрести"
          validityPeriod="(срок действия пакета не ограничен, токены не сгорают)"
        />
        <Tariff
          name="Free"
          text="Базовый набор функций, рекомендуется для ознакомления с функционалом платформы"
          price="0"
          currency="₽"
          list={[
            "Chatgpt3.5-4k",
            "10 000 Токенов",
            "Midjourney",
            "30 Обычных генераций"
          ]}
          button="Приобрести"
          validityPeriod="(срок действия пакета не ограничен, токены не сгорают)"
        />
      </>
    )
  }
};

export default {
  title: 'UI Components/TariffList',
  component: TariffList,
  decorators: [ThemeStoryDecorator()]
} as TariffListMeta;
