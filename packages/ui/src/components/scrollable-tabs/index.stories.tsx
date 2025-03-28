import type { Meta, StoryObj } from '@storybook/react';
import { StoryDecorator } from '@/ui/story-decorator';
import { ScrollableTabs } from '.';
import {
  CodeGeneration,
  ImageGeneration,
  SpeechSynthesys,
  Spelling,
  TextGeneration,
  TrafficAnalisys
} from '@/ui/icons';

export type ScrollableTabsMeta = Meta<typeof ScrollableTabs>;

export type ScrollableTabsStory = StoryObj<typeof ScrollableTabs>;

export const Basic: ScrollableTabsStory = {
  args: {
    tabs: [
      {
        id: 'text',
        label: 'Генерация текста',
        href: '/',
        icon: <TextGeneration />
      },
      {
        id: 'image',
        label: 'Генерация изображений',
        href: '/',
        icon: <ImageGeneration />
      },
      {
        id: 'code',
        label: 'Генерация кода',
        href: '/',
        icon: <CodeGeneration />
      },
      {
        id: 'table',
        label: 'Анализ таблиц',
        href: '/',
        icon: <TrafficAnalisys />
      },
      {
        id: 'speech',
        label: 'Синтез речи',
        href: '/',
        icon: <SpeechSynthesys />
      },
      { id: 'spell', label: 'Орфография', href: '/', icon: <Spelling /> }
    ],
    selectedTabId: 'code'
  }
};

export default {
  title: 'UI Components/ScrollableTabs',
  component: ScrollableTabs,
  decorators: [StoryDecorator()]
} as ScrollableTabsMeta;
