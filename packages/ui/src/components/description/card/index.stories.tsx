import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  DescriptionCard,
  DescriptionCardButton,
  DescriptionCardButtonsWrapper,
  DescriptionCardLiContent,
  DescriptionCardLiStled,
  DescriptionCardUlStyled,
} from '.';
import { StoryDecorator } from '@/ui/story-decorator';
import { CheckCircleIcon, EmailCircleIcon, TgCircleIcon } from '@/ui/icons';

export type DescriptionCardMeta = Meta<typeof DescriptionCard>;

export type DescriptionCardStory = StoryObj<typeof DescriptionCard>;

export const Products: DescriptionCardStory = {
  args: {
    title: 'ChatGPT: Удобство в Telegram',
    text: 'Создайте потрясающий опыт взаимодействия с искусственным интеллектом, используя Midjourney и ChatGPT для различных потребностей.',
    descriptionCardType: 'products',
    children: (
      <>
        <DescriptionCardButtonsWrapper>
          <DescriptionCardButton>Подробнее</DescriptionCardButton>
        </DescriptionCardButtonsWrapper>
      </>
    ),
  },
};
export const Collaborate: DescriptionCardStory = {
  args: {
    title: 'ChatGPT: Удобство в Telegram',
    text: 'Создайте потрясающий опыт взаимодействия с искусственным интеллектом, используя Midjourney и ChatGPT для различных потребностей.',
    descriptionCardType: 'collaborate',
    children: (
      <>
        <DescriptionCardUlStyled>
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
        </DescriptionCardUlStyled>
        <DescriptionCardButtonsWrapper>
          <DescriptionCardButton startIcon={<TgCircleIcon />}>
            Telegram
          </DescriptionCardButton>
          <DescriptionCardButton startIcon={<EmailCircleIcon />}>
            E-Mail
          </DescriptionCardButton>
        </DescriptionCardButtonsWrapper>
      </>
    ),
  },
};

export default {
  title: 'Components/Description/Card',
  component: DescriptionCard,
  decorators: [StoryDecorator()],
  parameters: {
    actions: {
      disable: true,
    },
  },
  argTypes: {
    title: {
      type: 'string',
    },
    text: {
      type: 'string',
    },
    button: {
      type: 'boolean',
    },
  },
} as DescriptionCardMeta;
