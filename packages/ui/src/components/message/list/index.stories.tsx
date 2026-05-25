import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { StoryDecorator } from '@/ui/story-decorator';
import {
  Message,
  MessageAvatar,
  MessageTransaction,
} from '@/ui/components/message';
import { Skeleton as BothubSkeleton } from '@/ui/components/skeleton';
import { Messages } from '.';
import { ActionMessage } from '@/ui/components/action-message';

export type MessagesMeta = Meta<typeof Messages>;

export type MessagesStory = StoryObj<typeof Messages>;

const MessageAssistant = () => (
  <Message
    edited
    editedText="Изменено"
    variant="assistant"
    avatar={<MessageAvatar variant="bot" />}
    transaction={<MessageTransaction>-223 CAPS</MessageTransaction>}
    onCopy={() => {
      console.log('onCopy');
    }}
    onCodeCopy={() => {
      console.log('onCodeCopy');
    }}
    onEdit={() => {
      console.log('onEdit');
    }}
    onDelete={() => {
      console.log('onDelete');
    }}
    onUpdate={() => {
      console.log('onUpdate');
    }}
    onReport={() => {
      console.log('onReport');
    }}
    onNextVersion={() => {
      console.log('onNextVersion');
    }}
    onPrevVersion={() => {
      console.log('onPrevVersion');
    }}
    onDownload={() => {
      console.log('onDownload');
    }}
    editText="Редактировать"
    copyPlainText="Копировать без форматирования"
    copyTgText="Копировать в TG"
    resendText="Переотправить"
    deleteText="Удалить"
    onReportText="Пожаловаться"
    downloadTooltipLabel="Скачать"
    updateTooltipLabel="Повторная генерация"
    copyTooltipLabel="Копировать"
    encryptionTooltipLabel="Зашифровать"
    disableModal={false}
    disableResend={false}
    disableEdit={false}
    disableDelete={false}
    disableUpdate={false}
    disableCopy={false}
    disableDownload={false}
    disableEncryption={false}
    editOutOfMenu={false}
  >
    Привет! Чем я могу помочь?
  </Message>
);

const MessageUser = () => (
  <Message
    edited
    editedText="Изменено"
    avatar={<MessageAvatar />}
  >
    Привет бот
  </Message>
);
export const Basic: MessagesStory = {
  args: {
    children: (
      <>
        <MessageUser />
        <MessageAssistant />
        <MessageUser />
        <MessageUser />
        <MessageAssistant />
        <MessageUser />
        <MessageAssistant />
        <MessageUser />
        <MessageAssistant />
        <ActionMessage>Контекст сброшен</ActionMessage>
      </>
    ),
  },
};

export const Skeleton: MessagesStory = {
  args: {
    children: [...Array(3)].map((_, index) => (
      <React.Fragment key={index}>
        <Message
          edited
          editedText="Изменено"
          avatar={
            <MessageAvatar>
              <BothubSkeleton />
            </MessageAvatar>
          }
          skeleton
        />
        <Message
          edited={false}
          editedText="Изменено"
          variant="assistant"
          avatar={
            <MessageAvatar>
              <BothubSkeleton />
            </MessageAvatar>
          }
          skeleton
        />
      </React.Fragment>
    )),
  },
};

export default {
  title: 'Components/Message/List',
  component: Messages,
  decorators: [StoryDecorator({ scale: 'main' })],
  argTypes: {
    children: {
      table: {
        disable: true,
      },
    },
  },
} as MessagesMeta;
