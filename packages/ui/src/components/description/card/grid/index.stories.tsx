import type { Meta, StoryObj } from '@storybook/react';
import { DescriptionCardGrid } from '.';
import { StoryDecorator } from '@/ui/story-decorator';
import { DescriptionCard, DescriptionCardText, DescriptionCardTitle } from '..';

export type DescriptionCardGridMeta = Meta<typeof DescriptionCardGrid>;

export type DescriptionCardGridStory = StoryObj<typeof DescriptionCardGrid>;

export const Basic: DescriptionCardGridStory = {
  args: {
    children: (
      <>
        <DescriptionCard
          variant="secondary"
          title={<DescriptionCardTitle>Создание увлекательного контента</DescriptionCardTitle>}
          text={(
            <DescriptionCardText>
              Вы когда-нибудь мечтали написать интересную книгу или статью, но не знали, 
              с чего начать? 
              ChatGPT отлично справляется с генерацией текстов на любые темы. Опишите ему свою идею 
              - и он создаст увлекательный контент, который захватит внимание читателей.
            </DescriptionCardText>
          )}
        />
        <DescriptionCard 
          variant="secondary"
          title={<DescriptionCardTitle>Решение сложных задач</DescriptionCardTitle>}
          text={(
            <DescriptionCardText>
              Задачи по математике или программированию иногда кажутся неразрешимыми головоломками. 
              Но не для ChatGPT! Он проанализирует проблему и предложит пошаговое решение. Вы 
              быстро разберетесь в сложных концепциях благодаря его доступным объяснениям.
            </DescriptionCardText>
          )}
        />
        <DescriptionCard 
          variant="secondary"
          title={<DescriptionCardTitle>Разработка и отладка кода</DescriptionCardTitle>}
          text={(
            <DescriptionCardText>
              ChatGPT может помочь в написании и исправлении кода. Он проанализирует ваш код, 
              найдет ошибки и предложит способы их исправления. 
              Также ChatGPT способен самостоятельно 
              писать код по вашим указаниям - к примеру, для создания веб-сайта или приложения.
            </DescriptionCardText>
          )}
        />
        <DescriptionCard 
          variant="secondary"
          title={<DescriptionCardTitle>Перевод текстов между языками</DescriptionCardTitle>}
          text={(
            <DescriptionCardText>
              ChatGPT отлично справляется с переводом текстов на десятки языков. 
              Теперь вам не нужно тратить время на поиск переводчика - просто попросите ChatGPT, 
              и он мгновенно переведет любой текст на нужный вам язык.
            </DescriptionCardText>
          )}
        />
        <DescriptionCard 
          variant="secondary"
          title={<DescriptionCardTitle>Помощь в написании резюме</DescriptionCardTitle>}
          text={(
            <DescriptionCardText>
              Вы ищете новую работу и нуждаетесь в резюме, которое произведет впечатление 
              на работодателя? ChatGPT поможет создать резюме, идеально подходящее под ваши 
              навыки и опыт. Опишите ему желаемую вакансию - и получите готовое резюме 
              в нужном формате.
            </DescriptionCardText>
          )}
        />
        <DescriptionCard 
          variant="secondary"
          title={<DescriptionCardTitle>Виртуальный помощник в жизни</DescriptionCardTitle>}
          text={(
            <DescriptionCardText>
              Не знаете, как приготовить новое блюдо или спланировать отпуск? 
              Просто спросите ChatGPT! Он выступит в качестве виртуального помощника 
              в повседневных задачах, предоставив полезную информацию 
              и рекомендации в любой сфере жизни.
            </DescriptionCardText>
          )}
        />
      </>
    )
  }
};

export default {
  title: 'UI Components/Description/Grid',
  component: DescriptionCardGrid,
  decorators: [StoryDecorator()],
  argTypes: {
    children: {
      table: {
        disable: true
      }
    }
  }
} as DescriptionCardGridMeta;
