import type { Meta, StoryObj } from '@storybook/react';
import { ThemeStoryDecorator } from '@/ui/theme/story-decorator';
import { Notifications } from '.';
import { Notification } from '@/ui/components/notification';

export type NotificationsMeta = Meta<typeof Notifications>;

export type NotificationsStory = StoryObj<typeof Notifications>;

export const Basic: NotificationsStory = {
  args: {
    children: (
      <>
        <Notification
          title="Системное уведомление"
          autoClose={false}
        >
          Это сообщение в системном уведомлении для юзеров.
        </Notification>
        <Notification
          variant="warn"
          title="Предупреждающее уведомление"
          autoClose={2000}
        />
        <Notification
          variant="error"
          title="Уведомление об ошибке"
          autoClose={4000}
        >
          Это сообщение в системном уведомлении для юзеров.
        </Notification>
        <Notification 
          variant="success"
          title="Уведомление об успехе"
          autoClose={6000}
        />
        <Notification
          variant="loading"
          title="Системное уведомление с лоадером"
          autoClose={8000}
        >
          Это сообщение в системном уведомлении для юзеров с лоадером.
        </Notification>
        <Notification
          title="Буфер обмена"
        >
          Скопировано в буфер обмена
        </Notification>
      </>
    )
  }
};

export default {
  title: 'UI Components/Notification/List',
  component: Notifications,
  decorators: [ThemeStoryDecorator()]
} as NotificationsMeta;
