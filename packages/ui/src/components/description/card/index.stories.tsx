import type { Meta, StoryObj } from '@storybook/react';
import { DescriptionCard } from '.';
import { StoryDecorator } from '@/ui/story-decorator';

export type DescriptionCardMeta = Meta<typeof DescriptionCard>;

export type DescriptionCardStory = StoryObj<typeof DescriptionCard>;

export const Basic: DescriptionCardStory = {
  args: {
    title: 'ChatGPT: Удобство в Telegram',
    text: 'Создайте потрясающий опыт взаимодействия с искусственным интеллектом, используя Midjourney и ChatGPT для различных потребностей.',
    button: true
  }
};

export default {
  title: 'Components/Description/Card',
  component: DescriptionCard,
  decorators: [StoryDecorator()],
  parameters: {
    actions: {
      disable: true
    }
  },
  argTypes: {
    title: {
      type: 'string'
    },
    text: {
      type: 'string'
    },
    button: {
      type: 'boolean'
    }
  }
} as DescriptionCardMeta;
