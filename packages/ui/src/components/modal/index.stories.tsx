import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from '.';
import { ThemeStoryDecorator } from '@/ui/theme/story-decorator';
import { Form, FormButtons, FormText } from '@/ui/components/form';
import { TextField } from '@/ui/components/text-field';
import {
  BookmarksIcon, EmailCircleIcon, LockCircleIcon, TrashIcon 
} from '@/ui/icons';
import { Button } from '@/ui/components/button';
import { Link } from '@/ui/components/link';
import { Typography } from '@/ui/components/typography';
import { Divider } from '@/ui/components/divider';
import { SelectField } from '@/ui/components/select-field';
import {
  ReferralRadio, 
  ReferralRadioGroup, 
  ReferralRadioTable, 
  ReferralRadioTableCell, 
  ReferralRadioTableHeadCell, 
  ReferralRadioTableRow, 
  ReferralRadioTableSelectedCell 
} from '@/ui/components/referral-radio';

export type ModalMeta = Meta<typeof Modal>;

export type ModalStory = StoryObj<typeof Modal>;

export const Auth: ModalStory = {
  args: {
    open: true,
    title: 'Авторизация',
    children: (
      <Form>
        <TextField 
          label="E-Mail"
          placeholder="Ваш E-Mail"
          startIcon={<EmailCircleIcon />}
          fullWidth
        />
        <TextField 
          label="Пароль"
          placeholder="Ваш пароль"
          startIcon={<LockCircleIcon />}
          fullWidth
        />
        <Button fullWidth>
          Войти
        </Button>
        <Link href="#link" align="center" fullWidth>
          Восстановление пароля
        </Link>
        <Divider />
        <Typography align="center" fullWidth>
          Нет аккаунта?
          {' '}
          <Link href="#link">
            Регистрация
          </Link>
        </Typography>
      </Form>
    )
  }
};

export const AuthTelegram: ModalStory = {
  args: {
    open: true,
    title: 'Объединение',
    children: (
      <Form>
        <FormText>
          Вы действительно хотите объединить ваши аккаунты?
        </FormText>
        <FormButtons>
          <Button
            fullWidth
          >
            Да
          </Button>
          <Button
            variant="secondary"
            fullWidth
          >
            Нет
          </Button>
        </FormButtons>
      </Form>
    )
  }
};

export const UpdateBookmark: ModalStory = {
  args: {
    open: true,
    title: 'Редактировать закладку',
    children: (
      <Form>
        <TextField
          startIcon={<BookmarksIcon />}
          name="name"
          label="Название"
          placeholder="Название закладки"
          fullWidth
        />
        <SelectField
          label="Цвет"
          data={[
            {
              color: '#1C64F2',
              value: 'Синий'
            },
            {
              color: '#FE4242',
              value: 'Красный'
            },
            {
              color: '#F29C1C',
              value: 'Оранжевый'
            },
            {
              color: '#941CF2',
              value: 'Фиолетовый'
            },
            {
              color: '#1ABB34',
              value: 'Зеленый'
            },
            {
              color: '#1CB2F2',
              value: 'Аква'
            },
            {
              color: 'linear-gradient(90deg, #1C64F2 -0.39%, #D41CF2 99.61%)',
              value: 'Сине-фиолетовый'
            }
          ]}
          fullWidth
        />
        <Button
          type="submit"
          fullWidth
        >
          Сохранить
        </Button>
      </Form>
    )
  }
};

export const DeleteBookmark: ModalStory = {
  args: {
    open: true,
    title: 'Удалить закладку',
    children: (
      <Form>
        <FormText>
          Вы уверены в том, что хотите удалить закладку?
        </FormText>
        <FormButtons>
          <Button
            startIcon={<TrashIcon />}
            fullWidth
          >
            Удалить
          </Button>
          <Button
            variant="secondary"
            fullWidth
          >
            Отмена
          </Button>
        </FormButtons>
      </Form>
    )
  }
};

export const CreateReferral: ModalStory = {
  args: {
    open: true,
    title: 'Новая партнёрская программа',
    scrollbar: true,
    children: (
      <Form>
        <ReferralRadioGroup>
          {[...Array(3)].map(() => (
            <ReferralRadio
              name="Стандартная реферальная программа"
            >
              <ReferralRadioTable>
                <ReferralRadioTableRow>
                  <ReferralRadioTableHeadCell>
                    Валюта:
                  </ReferralRadioTableHeadCell>
                  <ReferralRadioTableCell>
                    RUB
                  </ReferralRadioTableCell>
                </ReferralRadioTableRow>
                <ReferralRadioTableRow>
                  <ReferralRadioTableHeadCell>
                    Процент вознаграждения:
                  </ReferralRadioTableHeadCell>
                  <ReferralRadioTableCell>
                    5%
                  </ReferralRadioTableCell>
                </ReferralRadioTableRow>
                <ReferralRadioTableRow>
                  <ReferralRadioTableHeadCell>
                    Минимальная сумма вывода:
                  </ReferralRadioTableHeadCell>
                  <ReferralRadioTableCell>
                    3000 RUB
                  </ReferralRadioTableCell>
                </ReferralRadioTableRow>
                <ReferralRadioTableRow>
                  <ReferralRadioTableHeadCell>
                    Подарочная подписка:
                  </ReferralRadioTableHeadCell>
                  <ReferralRadioTableSelectedCell>
                    FREE
                  </ReferralRadioTableSelectedCell>
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
            </ReferralRadio>
          ))}
        </ReferralRadioGroup>
      </Form>
    )
  }
};

export default {
  title: 'UI Components/Modal',
  component: Modal,
  decorators: [ThemeStoryDecorator()],
  args: {
    open: true
  },
  argTypes: {
    children: {
      table: {
        disable: true
      }
    }
  }
} as ModalMeta;
