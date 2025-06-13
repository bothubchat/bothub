import { Meta, StoryObj } from '@storybook/react';
import { StoryDecorator } from '@/ui/story-decorator';
import { Breadcrumbs } from '.';
import { BreadcrumbsItem } from './styled';

export type BreadcrumbsMeta = Meta<typeof Breadcrumbs>;

export type BreadcrumbsStory = StoryObj<typeof Breadcrumbs>;

export const Basic: BreadcrumbsStory = {
  args: {
    children: [
      <BreadcrumbsItem
        component="a"
        href="https://bothub.chat/main"
      >
        Главная
      </BreadcrumbsItem>,
      <BreadcrumbsItem
        component="a"
        href="https://bothub.chat/models"
      >
        Модели
      </BreadcrumbsItem>,
      <BreadcrumbsItem>GPT-4o</BreadcrumbsItem>
    ]
  }
};

export default {
  title: 'Components/Breadcrumbs',
  component: Breadcrumbs,
  decorators: [StoryDecorator()]
} as BreadcrumbsMeta;
