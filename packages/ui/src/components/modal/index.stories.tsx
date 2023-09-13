import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from '.';
import { ThemeStoryDecorator } from '../../theme/story-decorator';
import { Form } from '../form';
import { TextField } from '../text-field';
import { EmailCircleIcon, LockCircleIcon } from '../icons';
import { Button } from '../button';
import { Link } from '../link';
import { Typography } from '../typography';
import { Divider } from '../divider';

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
  }
} as ModalMeta;
