import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
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

export const Primary: ScrollableTabsStory = {
  args: {
    tabs: [
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
    ],
    defaultTabId: 'code'
  }
};

export const Secondary: ScrollableTabsStory = {
  args: {
    ...Primary.args,
    variant: 'secondary'
  }
};

export const TabsAsButtons: ScrollableTabsStory = {
  render() {
    const [selectedTab, setSelectedTab] = useState('code');

    const onSelectedTabChange = (id: string) => setSelectedTab(id);

    return (
      <ScrollableTabs
        tabs={Primary.args!.tabs!}
        defaultTabId={selectedTab}
        variant="secondary"
        component="button"
        onClick={onSelectedTabChange}
      />
    );
  }
};

export default {
  title: 'UI Components/ScrollableTabs',
  component: ScrollableTabs,
  decorators: [StoryDecorator()]
} as ScrollableTabsMeta;
