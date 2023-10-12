import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from '.';
import { ThemeStoryDecorator } from '@/ui/theme/story-decorator';
import { Form } from '@/ui/components/form';
import { TextField } from '@/ui/components/text-field';
import { EmailCircleIcon, LockCircleIcon } from '@/ui/icons';
import { Button } from '@/ui/components/button';
import { Link } from '@/ui/components/link';
import { Typography } from '@/ui/components/typography';
import { Divider } from '@/ui/components/divider';

export type ModalMeta = Meta<typeof Modal>;

export type ModalStory = StoryObj<typeof Modal>;

export const Basic: ModalStory = {
  args: {
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
