import type { Meta, StoryObj } from '@storybook/react';
import { ThemeStoryDecorator } from '@/ui/theme/story-decorator';
import {
  TariffCard, 
  TariffCardGiveCaps, 
  TariffCardGiveCapsBadge, 
  TariffCardGiveCapsText, 
  TariffCardModel, 
  TariffCardModels 
} from '@/ui/components/tariff-card';
import { Tariffs } from '.';

export type TariffsMeta = Meta<typeof Tariffs>;

export type TariffsStory = StoryObj<typeof Tariffs>;

export const Basic: TariffsStory = {
  args: {
    children: (
      <>
        <TariffCard
          name="Free"
          giveCaps={(
            <TariffCardGiveCaps>
              <TariffCardGiveCapsText>
                Вы получаете
              </TariffCardGiveCapsText>
              <TariffCardGiveCapsBadge>
                10 000 Caps
              </TariffCardGiveCapsBadge>
            </TariffCardGiveCaps>
          )}
          price="0"
          currency="₽"
          details="Подробнее о стоимости токенов"
          purchase="Приобрести"
          validityPeriod="(срок действия пакета не ограничен, токены не сгорают)"
        >
          <TariffCardModels label="Доступные модели:">
            <TariffCardModel
              name="ChatGPT 3.5"
              tokens="10 000 Токенов"
            />
          </TariffCardModels>
        </TariffCard>
        <TariffCard
          color="blue"
          name="Basic"
          giveCaps={(
            <TariffCardGiveCaps>
              <TariffCardGiveCapsText>
                Вы получаете
              </TariffCardGiveCapsText>
              <TariffCardGiveCapsBadge>
                1 000 000 Caps
              </TariffCardGiveCapsBadge>
            </TariffCardGiveCaps>
          )}
          price="200"
          currency="₽"
          details="Подробнее о стоимости токенов"
          purchase="Приобрести"
          validityPeriod="(срок действия пакета не ограничен, токены не сгорают)"
        >
          <TariffCardModels label="Доступные модели:">
            <TariffCardModel
              name="ChatGPT 3.5"
              tokens="10 000 Токенов"
            />
            <TariffCardModel
              name="ChatGPT 3.5-16k"
              tokens="500 000 Токенов"
            />
          </TariffCardModels>
        </TariffCard>
        <TariffCard
          color="blue-lilac"
          name="Premium"
          giveCaps={(
            <TariffCardGiveCaps>
              <TariffCardGiveCapsText>
                Вы получаете
              </TariffCardGiveCapsText>
              <TariffCardGiveCapsBadge>
                3 000 000 Caps
              </TariffCardGiveCapsBadge>
            </TariffCardGiveCaps>
          )}
          price="600"
          currency="₽"
          details="Подробнее о стоимости токенов"
          purchase="Приобрести"
          validityPeriod="(срок действия пакета не ограничен, токены не сгорают)"
        >
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
        </TariffCard>
        <TariffCard
          color="blue-lilac"
          name="Elite"
          giveCaps={(
            <TariffCardGiveCaps>
              <TariffCardGiveCapsText>
                Вы получаете
              </TariffCardGiveCapsText>
              <TariffCardGiveCapsBadge>
                30 000 000 Caps
              </TariffCardGiveCapsBadge>
            </TariffCardGiveCaps>
          )}
          price="6 000"
          currency="₽"
          details="Подробнее о стоимости токенов"
          purchase="Приобрести"
          validityPeriod="(срок действия пакета не ограничен, токены не сгорают)"
        >
          <TariffCardModels label="Доступные модели:">
            <TariffCardModel
              name="ChatGPT 4"
              tokens="1 000 000 Токенов"
            />
            <TariffCardModel
              name="ChatGPT 4-32k"
              tokens="500 000 Токенов"
            />
            <TariffCardModel
              name="Claude v2.0"
              tokens="2 000 000 Токенов"
            />
            <TariffCardModel
              name="Midjourney 5"
              tokens="300 Caps/Генерация"
            />
          </TariffCardModels>
        </TariffCard>
      </>
    )
  }
};

export default {
  title: 'UI Components/Tariffs',
  component: Tariffs,
  decorators: [ThemeStoryDecorator()],
  argTypes: {
    children: {
      table: {
        disable: true
      }
    }
  }
} as TariffsMeta;
