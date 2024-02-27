import type { Meta, StoryObj } from '@storybook/react';
import { StoryDecorator } from '@/ui/story-decorator';
import { Notification } from '.';

export type NotificationMeta = Meta<typeof Notification>;

export type NotificationStory = StoryObj<typeof Notification>;

export const Basic: NotificationStory = {
  args: {
    title: 'Системное уведомление'
  }
};

export const Text: NotificationStory = {
  args: {
    ...Basic.args,
    children: 'Это сообщение в системном уведомлении для юзеров.'
  }
};

export const Clipboard: NotificationStory = {
  args: {
    title: 'Буфер обмена',
    children: 'Скопировано в буфер обмена'
  }
};

export default {
  title: 'UI Components/Notification/Item',
  component: Notification,
  decorators: [StoryDecorator()]
} as NotificationMeta;
