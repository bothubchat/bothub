import type { Meta, StoryObj } from '@storybook/react-vite';
import { ModalWindow } from '.';
import { StoryDecorator } from '@/ui/story-decorator';
import { Form, FormButtons, FormText } from '@/ui/components/form';
import { TextField } from '@/ui/components/text-field';
import {
  BookmarksIcon,
  EmailCircleIcon,
  LockCircleIcon,
  TrashIcon,
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
  ReferralRadioTableSelectedCell,
} from '@/ui/components/referral';

export type ModalWindowMeta = Meta<typeof ModalWindow>;

export type ModalWindowStory = StoryObj<typeof ModalWindow>;

export const Auth: ModalWindowStory = {
  args: {
    open: true,
    title: 'Авторизация',
    children: (
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          alert('Submitted');
        }}
      >
        <TextField
          label="E-Mail"
          name="email"
          placeholder="Ваш E-Mail"
          startIcon={<EmailCircleIcon />}
          fullWidth
        />
        <TextField
          label="Пароль"
          name="password"
          placeholder="Ваш пароль"
          startIcon={<LockCircleIcon />}
          fullWidth
        />
        <Button
          fullWidth
          type="submit"
        >
          Войти
        </Button>
        <Link
          href="#link"
          align="center"
          fullWidth
        >
          Восстановление пароля
        </Link>
        <Divider />
        <Typography
          align="center"
          fullWidth
        >
          Нет аккаунта? <Link href="#link">Регистрация</Link>
        </Typography>
      </Form>
    ),
  },
};

export const AuthTelegram: ModalWindowStory = {
  args: {
    open: true,
    title: 'Объединение',
    children: (
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          alert('Submitted');
        }}
      >
        <FormText>Вы действительно хотите объединить ваши аккаунты?</FormText>
        <FormButtons>
          <Button
            fullWidth
            type="submit"
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
    ),
  },
};

export const UpdateBookmark: ModalWindowStory = {
  args: {
    open: true,
    title: 'Редактировать закладку',
    children: (
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          alert('Submitted');
        }}
      >
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
              value: 'Синий',
            },
            {
              color: '#FE4242',
              value: 'Красный',
            },
            {
              color: '#F29C1C',
              value: 'Оранжевый',
            },
            {
              color: '#941CF2',
              value: 'Фиолетовый',
            },
            {
              color: '#1ABB34',
              value: 'Зеленый',
            },
            {
              color: '#1CB2F2',
              value: 'Аква',
            },
            {
              color: 'linear-gradient(90deg, #1C64F2 -0.39%, #D41CF2 99.61%)',
              value: 'Сине-фиолетовый',
            },
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
    ),
  },
};

export const DeleteBookmark: ModalWindowStory = {
  args: {
    open: true,
    title: 'Удалить закладку',
    children: (
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          alert('Submitted');
        }}
      >
        <FormText>Вы уверены в том, что хотите удалить закладку?</FormText>
        <FormButtons>
          <Button
            startIcon={<TrashIcon />}
            fullWidth
            type="submit"
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
    ),
  },
};

export const CreateReferral: ModalWindowStory = {
  args: {
    open: true,
    title: 'Новая партнёрская программа',
    scrollbar: true,
    children: (
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          alert('Submitted');
        }}
      >
        <ReferralRadioGroup>
          {[...Array(3)].map(() => (
            <ReferralRadio name="Стандартная реферальная программа">
              <ReferralRadioTable>
                <ReferralRadioTableRow>
                  <ReferralRadioTableHeadCell>
                    Валюта:
                  </ReferralRadioTableHeadCell>
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
    ),
  },
};

export default {
  title: 'UI Components/ModalWindow',
  component: ModalWindow,
  decorators: [StoryDecorator()],
  args: {
    open: true,
  },
  argTypes: {
    children: {
      table: {
        disable: true,
      },
    },
  },
} as ModalWindowMeta;
