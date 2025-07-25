import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from '.';
import { StoryDecorator } from '@/ui/story-decorator';
import * as modalWindowStories from './modal-window/index.stories';

export type ModalMeta = Meta<typeof Modal>;

export type ModalStory = StoryObj<typeof Modal>;

export const Auth: ModalStory = {
  args: {
    ...modalWindowStories.Auth.args,
  },
};

export const AuthTelegram: ModalStory = {
  args: {
    ...modalWindowStories.AuthTelegram.args,
  },
};

export const UpdateBookmark: ModalStory = {
  args: {
    ...modalWindowStories.UpdateBookmark.args,
  },
};

export const DeleteBookmark: ModalStory = {
  args: {
    ...modalWindowStories.DeleteBookmark.args,
  },
};

export const CreateReferral: ModalStory = {
  args: {
    ...modalWindowStories.CreateReferral.args,
  },
};

export default {
  title: 'UI Components/Modal',
  component: Modal,
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
} as ModalMeta;
