import type { Meta, StoryObj } from '@storybook/react';
import { DescriptionCard } from '.';
import { ThemeStoryDecorator } from '@/theme/story-decorator';
import { DescriptionCardButton, DescriptionCardText, DescriptionCardTitle } from './styled';

export type DescriptionCardMeta = Meta<typeof DescriptionCard>;

export type DescriptionCardStory = StoryObj<typeof DescriptionCard>;

export const Basic: DescriptionCardStory = {
  args: {
    title: (
      <DescriptionCardTitle>ChatGPT: Удобство в Telegram</DescriptionCardTitle>
    ),
    text: (
      <DescriptionCardText>
        Создайте потрясающий опыт взаимодействия с искусственным интеллектом, 
        используя Midjourney и ChatGPT для различных потребностей.
      </DescriptionCardText>
    ),
    button: (
      <DescriptionCardButton>
        Подробнее
      </DescriptionCardButton>
    )
  }
};

export default {
  title: 'DescriptionCard',
  component: DescriptionCard,
  decorators: [ThemeStoryDecorator()],
  parameters: {
    actions: {
      disable: true
    }
  }
} as DescriptionCardMeta;
