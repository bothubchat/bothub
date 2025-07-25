import type { Meta, StoryObj } from '@storybook/react';
import { StoryDecorator } from '@/ui/story-decorator';
import { Skeleton as BothubSkeleton } from '@/ui/components/skeleton';
import {
  ReferralRadio,
  ReferralRadioTable,
  ReferralRadioTableCell,
  ReferralRadioTableHeadCell,
  ReferralRadioTableRow,
  ReferralRadioTableSelectedCell,
} from '.';

export type ReferralRadioMeta = Meta<typeof ReferralRadio>;

export type ReferralRadioStory = StoryObj<typeof ReferralRadio>;

export const Basic: ReferralRadioStory = {
  args: {
    name: 'Стандартная реферальная программа',
    children: (
      <ReferralRadioTable>
        <ReferralRadioTableRow>
          <ReferralRadioTableHeadCell>Валюта:</ReferralRadioTableHeadCell>
          <ReferralRadioTableCell>RUB</ReferralRadioTableCell>
        </ReferralRadioTableRow>
        <ReferralRadioTableRow>
          <ReferralRadioTableHeadCell>
            Процент вознаграждения:
          </ReferralRadioTableHeadCell>
          <ReferralRadioTableCell>5%</ReferralRadioTableCell>
        </ReferralRadioTableRow>
        <ReferralRadioTableRow>
          <ReferralRadioTableHeadCell>
            Минимальная сумма вывода:
          </ReferralRadioTableHeadCell>
          <ReferralRadioTableCell>3000 RUB</ReferralRadioTableCell>
        </ReferralRadioTableRow>
        <ReferralRadioTableRow>
          <ReferralRadioTableHeadCell>
            Подарочная подписка:
          </ReferralRadioTableHeadCell>
          <ReferralRadioTableSelectedCell>FREE</ReferralRadioTableSelectedCell>
        </ReferralRadioTableRow>
        <ReferralRadioTableRow>
          <ReferralRadioTableHeadCell>
            Подарочное кол-во токенов:
          </ReferralRadioTableHeadCell>
          <ReferralRadioTableSelectedCell>
            30000 CAPS
          </ReferralRadioTableSelectedCell>
        </ReferralRadioTableRow>
      </ReferralRadioTable>
    ),
  },
};

export const Skeleton: ReferralRadioStory = {
  args: {
    skeleton: true,
    children: (
      <ReferralRadioTable>
        <ReferralRadioTableRow>
          <ReferralRadioTableHeadCell>
            <BothubSkeleton />
          </ReferralRadioTableHeadCell>
          <ReferralRadioTableCell>
            <BothubSkeleton />
          </ReferralRadioTableCell>
        </ReferralRadioTableRow>
        <ReferralRadioTableRow>
          <ReferralRadioTableHeadCell>
            <BothubSkeleton />
          </ReferralRadioTableHeadCell>
          <ReferralRadioTableCell>
            <BothubSkeleton />
          </ReferralRadioTableCell>
        </ReferralRadioTableRow>
        <ReferralRadioTableRow>
          <ReferralRadioTableHeadCell>
            <BothubSkeleton />
          </ReferralRadioTableHeadCell>
          <ReferralRadioTableCell>
            <BothubSkeleton />
          </ReferralRadioTableCell>
        </ReferralRadioTableRow>
        <ReferralRadioTableRow>
          <ReferralRadioTableHeadCell>
            <BothubSkeleton />
          </ReferralRadioTableHeadCell>
          <ReferralRadioTableSelectedCell>
            <BothubSkeleton />
          </ReferralRadioTableSelectedCell>
        </ReferralRadioTableRow>
        <ReferralRadioTableRow>
          <ReferralRadioTableHeadCell>
            <BothubSkeleton />
          </ReferralRadioTableHeadCell>
          <ReferralRadioTableSelectedCell>
            <BothubSkeleton />
          </ReferralRadioTableSelectedCell>
        </ReferralRadioTableRow>
      </ReferralRadioTable>
    ),
  },
};

export default {
  title: 'Components/Referral/Radio',
  component: ReferralRadio,
  decorators: [StoryDecorator()],
} as ReferralRadioMeta;
