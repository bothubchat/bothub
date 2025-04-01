import type { Meta, StoryObj } from '@storybook/react';
import { StoryDecorator } from '@/ui/story-decorator';
import { ScrollableTabs } from '.';
import {
  CodeGenerationIcon,
  ImageGenerationIcon,
  SpeechSynthesysIcon,
  SpellingIcon,
  TextGenerationIcon,
  TrafficAnalisysIcon
} from '@/ui/icons';

export type ScrollableTabsMeta = Meta<typeof ScrollableTabs>;

export type ScrollableTabsStory = StoryObj<typeof ScrollableTabs>;

const TabsData = [
  {
    id: 'text',
    label: 'Генерация текста',
    href: '/',
    icon: <TextGenerationIcon />
  },
  {
    id: 'image',
    label: 'Генерация изображений',
    href: '/',
    icon: <ImageGenerationIcon />
  },
  {
    id: 'code',
    label: 'Генерация кода',
    href: '/',
    icon: <CodeGenerationIcon />
  },
  {
    id: 'table',
    label: 'Анализ таблиц',
    href: '/',
    icon: <TrafficAnalisysIcon />
  },
  {
    id: 'speech',
    label: 'Синтез речи',
    href: '/',
    icon: <SpeechSynthesysIcon />
  },
  { id: 'spell', label: 'Орфография', href: '/', icon: <SpellingIcon /> }
];

export const Primary: ScrollableTabsStory = {
  args: {
    tabs: TabsData,
    selectedTabId: 'code'
  }
};

export const Secondary: ScrollableTabsStory = {
  args: {
    tabs: TabsData,
    variant: 'secondary',
    selectedTabId: 'code'
  }
};

export const TabsAsButtons: ScrollableTabsStory = {
  args: {
    tabs: TabsData,
    variant: 'secondary',
    selectedTabId: 'code',
    component: 'button',
    onClick(id) {
      alert(id);
    }
  }
};

export default {
  title: 'UI Components/ScrollableTabs',
  component: ScrollableTabs,
  decorators: [StoryDecorator()]
} as ScrollableTabsMeta;
