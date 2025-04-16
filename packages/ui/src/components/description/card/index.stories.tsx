import type { Meta, StoryObj } from '@storybook/react';
import {
  DescriptionCard,
  DescriptionCardLiContent,
  DescriptionCardLiStled
} from '.';
import { StoryDecorator } from '@/ui/story-decorator';
import { CheckCircleIcon } from '@/ui/icons';

export type DescriptionCardMeta = Meta<typeof DescriptionCard>;

export type DescriptionCardStory = StoryObj<typeof DescriptionCard>;

export const Collaborate: DescriptionCardStory = {
  args: {
    title: 'ChatGPT: Удобство в Telegram',
    text: 'Создайте потрясающий опыт взаимодействия с искусственным интеллектом, используя Midjourney и ChatGPT для различных потребностей.',
    button: true,
    bgDescriptionCard: 'fav',
    descriptionCardType: 'collaborate',
    children: (
      <>
        <DescriptionCardLiStled>
          <CheckCircleIcon />
          <DescriptionCardLiContent>
            Индивидуальный подход к вашей команде
          </DescriptionCardLiContent>
        </DescriptionCardLiStled>
        <DescriptionCardLiStled>
          <CheckCircleIcon />
          <DescriptionCardLiContent>
            Приоритетная поддержка
          </DescriptionCardLiContent>
        </DescriptionCardLiStled>
        <DescriptionCardLiStled>
          <CheckCircleIcon />
          <DescriptionCardLiContent>
            Аналитика и прозрачное лимитирование токенов по членам команды
          </DescriptionCardLiContent>
        </DescriptionCardLiStled>
      </>
    )
  }
};
export const Products: DescriptionCardStory = {
  args: {
    title: 'ChatGPT: Удобство в Telegram',
    text: 'Создайте потрясающий опыт взаимодействия с искусственным интеллектом, используя Midjourney и ChatGPT для различных потребностей.',
    button: true,
    bgDescriptionCard: 'fav',
    descriptionCardType: 'products'
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
