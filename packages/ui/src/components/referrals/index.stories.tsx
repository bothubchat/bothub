import type { Meta, StoryObj } from '@storybook/react';
import { ThemeStoryDecorator } from '@/ui/theme/story-decorator';
import {
  ReferralCard, 
  ReferralCardLink, 
  ReferralCardTable, 
  ReferralCardTableCell, 
  ReferralCardTableHeadCell, 
  ReferralCardTableRow, 
  ReferralCardWithdrawButton 
} from '@/ui/components/referral-card';
import { Referrals } from '.';
import { CreateReferralButton } from './styled';

export type ReferralsMeta = Meta<typeof Referrals>;

export type ReferralsStory = StoryObj<typeof Referrals>;

export const Basic: ReferralsStory = {
  args: {
    create: (
      <CreateReferralButton>
        Создать программу
      </CreateReferralButton>
    ),
    children: [...Array(5)].map(() => (
      <ReferralCard
        name="Реферальная система с ChatGPT-4"
        aiName={'ChatGPT\n4.0'}
        price={{
          value: 16000,
          min: 0,
          max: 20000,
          minText: '0 ₽',
          maxText: '20000 ₽'
        }}
        withdraw={(
          <ReferralCardWithdrawButton>
            Вывести средства
          </ReferralCardWithdrawButton>
        )}
        dateCreated="Дата последнего вывода: 07.09.23, 15:33:47"
      >
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
      </ReferralCard>
    ))
  }
};

export default {
  title: 'UI Components/Referral/List',
  component: Referrals,
  decorators: [ThemeStoryDecorator()]
} as ReferralsMeta;
