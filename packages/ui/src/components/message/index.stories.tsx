import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton as BothubSkeleton } from '@/ui/components/skeleton';
import {
  Message, MessageActions, MessageAvatar, MessageCopyAction, MessageEditAction, MessageTokens 
} from '.';
import { ThemeStoryDecorator } from '@/ui/theme/story-decorator';

export type MessageMeta = Meta<typeof Message>;

export type MessageStory = StoryObj<typeof Message>;

export const Assistant: MessageStory = {
  args: {
    variant: 'assistant',
    avatar: (
      <MessageAvatar variant="bot" />
    ),
    tokens: (
      <MessageTokens>
        -1571 tkn
      </MessageTokens>
    ),
    actions: (
      <MessageActions>
        <MessageCopyAction />
      </MessageActions>
    ),
    children: 'Привет! Чем я могу помочь?'
  }
};

export const AssistantSkeleton: MessageStory = {
  args: {
    variant: 'assistant',
    avatar: (
      <MessageAvatar>
        <BothubSkeleton />
      </MessageAvatar>
    ),
    skeleton: true
  }
};

export const AssistantCode: MessageStory = {
  args: {
    ...Assistant.args,
    children: `Конечно! Вот пример кода на JavaScript для вывода фразы "Hello, World!":
\`\`\`javascript
console.log("Hello, World!");
\`\`\``
  }
};

export const AssistantInlineCode: MessageStory = {
  args: {
    ...AssistantCode.args,
    children: `Конечно! Вот пример кода на JavaScript для вывода фразы "Hello, World!" 
\`console.log("Hello, World!");\``
  }
};

export const User: MessageStory = {
  args: {
    variant: 'user',
    avatar: (
      <MessageAvatar />
    ),
    actions: (
      <MessageActions>
        <MessageCopyAction />
        <MessageEditAction />
      </MessageActions>
    ),
    children: 'Привет бот'
  }
};

export const UserSkeleton: MessageStory = {
  args: {
    variant: 'user',
    avatar: (
      <MessageAvatar>
        <BothubSkeleton />
      </MessageAvatar>
    ),
    skeleton: true
  }
};

export const UserCode: MessageStory = {
  args: {
    ...User.args,
    children: `Исправь ошибки:
\`\`\`javascript
console.log("Hello, World!");
\`\`\``
  }
};

export const UserInlineCode: MessageStory = {
  args: {
    ...UserCode.args,
    children: `Исправь ошибки:
\`console.log("Hello, World!");\``
  }
};

export default {
  title: 'UI Components/Message/Item',
  component: Message,
  decorators: [ThemeStoryDecorator()],
  argTypes: {
    avatar: {
      table: {
        disable: true
      }
    },
    tokens: {
      table: {
        disable: true
      }
    },
    actions: {
      table: {
        disable: true
      }
    }
  }
} as MessageMeta;
