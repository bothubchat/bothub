import type { Meta, StoryObj } from '@storybook/react';
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

export const Basic: MessagesStory = {
  args: {
    children: (
      <>
        <Message avatar={<MessageAvatar />}>Привет бот</Message>
        <Message
          variant="assistant"
          avatar={<MessageAvatar variant="bot" />}
          transaction={<MessageTransaction>-223 CAPS</MessageTransaction>}
        >
          Привет! Чем я могу помочь?
        </Message>
        <Message avatar={<MessageAvatar />}>
          Напиши код Helloworld на Javascript
        </Message>
        <Message
          variant="assistant"
          avatar={<MessageAvatar variant="bot" />}
          transaction={<MessageTransaction>-1571 CAPS</MessageTransaction>}
        >
          {`Конечно! Вот пример кода на JavaScript для вывода фразы "Hello, World!":
\`\`\`javascript
console.log("Hello, world!");
\`\`\``}
        </Message>
        <Message avatar={<MessageAvatar />}>Спасибо бот! то что нужно</Message>
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
          avatar={(
            <MessageAvatar>
              <BothubSkeleton />
            </MessageAvatar>
          )}
          skeleton
        />
        <Message
          variant="assistant"
          avatar={(
            <MessageAvatar>
              <BothubSkeleton />
            </MessageAvatar>
          )}
          skeleton
        />
      </React.Fragment>
    )),
  },
};

export default {
  title: 'Components/Message/List',
  component: Messages,
  decorators: [StoryDecorator()],
  argTypes: {
    children: {
      table: {
        disable: true,
      },
    },
  },
} as MessagesMeta;
