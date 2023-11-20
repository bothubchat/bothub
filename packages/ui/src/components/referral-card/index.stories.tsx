import type { Meta, StoryObj } from '@storybook/react';
import { ThemeStoryDecorator } from '@/ui/theme/story-decorator';
import { Skeleton as BothubSkeleton } from '@/ui/components/skeleton';
import { 
  ReferralCard, 
  ReferralCardLink, 
  ReferralCardTable, 
  ReferralCardTableCell, 
  ReferralCardTableHeadCell, 
  ReferralCardTableRow, 
  ReferralCardWithdrawButton 
} from '.';

export type ReferralCardMeta = Meta<typeof ReferralCard>;

export type ReferralCardStory = StoryObj<typeof ReferralCard>;

export const Basic: ReferralCardStory = {
  args: {
    name: 'Реферальная система с ChatGPT-4',
    price: {
      value: 16000,
      min: 0,
      max: 20000,
      minText: '0 ₽',
      maxText: '20000 ₽'
    },
    withdraw: (
      <ReferralCardWithdrawButton>
        Вывести средства
      </ReferralCardWithdrawButton>
    ),
    dateCreated: 'Дата последнего вывода: 07.09.23, 15:33:47',
    children: (
      <ReferralCardTable>
        <ReferralCardTableRow>
          <ReferralCardTableHeadCell>
            Реферальная ссылка:
          </ReferralCardTableHeadCell>
          <ReferralCardTableCell>
            <ReferralCardLink>
              https://bothub.chat/?invitedBy=xfpyL2Gt3y86vYOAus0Fa
            </ReferralCardLink>
          </ReferralCardTableCell>
        </ReferralCardTableRow>
        <ReferralCardTableRow>
          <ReferralCardTableHeadCell>
            Код:
          </ReferralCardTableHeadCell>
          <ReferralCardTableCell>
            <ReferralCardLink>
              T2Yasv23azILMH21
            </ReferralCardLink>
          </ReferralCardTableCell>
        </ReferralCardTableRow>
        <ReferralCardTableRow>
          <ReferralCardTableHeadCell>
            Всего пользователей:
          </ReferralCardTableHeadCell>
          <ReferralCardTableCell>
            24
          </ReferralCardTableCell>
        </ReferralCardTableRow>
      </ReferralCardTable>
    )
  }
};

export const AI: ReferralCardStory = {
  args: {
    ...Basic.args,
    skeleton: false,
    aiName: 'ChatGPT\n4.0'
  }
};

export const Skeleton: ReferralCardStory = {
  args: {
    skeleton: true,
    withdraw: (
      <ReferralCardWithdrawButton disabled>
        Вывести средства
      </ReferralCardWithdrawButton>
    ),
    children: (
      <ReferralCardTable>
        <ReferralCardTableRow>
          <ReferralCardTableHeadCell>
            <BothubSkeleton />
          </ReferralCardTableHeadCell>
          <ReferralCardTableCell>
            <BothubSkeleton />
          </ReferralCardTableCell>
        </ReferralCardTableRow>
        <ReferralCardTableRow>
          <ReferralCardTableHeadCell>
            <BothubSkeleton />
          </ReferralCardTableHeadCell>
          <ReferralCardTableCell>
            <BothubSkeleton />
          </ReferralCardTableCell>
        </ReferralCardTableRow>
        <ReferralCardTableRow>
          <ReferralCardTableHeadCell>
            <BothubSkeleton />
          </ReferralCardTableHeadCell>
          <ReferralCardTableCell>
            <BothubSkeleton />
          </ReferralCardTableCell>
        </ReferralCardTableRow>
      </ReferralCardTable>
    )
  }
};

export default {
  title: 'UI Components/Referral/Card',
  component: ReferralCard,
  decorators: [ThemeStoryDecorator()]
} as ReferralCardMeta;
