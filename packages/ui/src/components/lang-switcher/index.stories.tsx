import type { Meta, StoryObj } from '@storybook/react-vite';
import { LangSwitcher } from '.';
import { StoryDecorator } from '@/ui/story-decorator';
import { FlagKZIcon, FlagRUIcon, LanguageIcon } from '@/ui/icons';

export type LangSwitcherMeta = Meta<typeof LangSwitcher>;

export type LangSwitcherStory = StoryObj<typeof LangSwitcher>;

export const Basic: LangSwitcherStory = {
  args: {
    lang: {
      label: 'Язык:',
      value: 'RU',
    },
    region: {
      label: 'Регион:',
      value: 'RU',
    },
    dataRegions: [
      {
        icon: <FlagRUIcon />,
        value: 'RU',
        label: 'Россия',
      },
      {
        icon: <FlagKZIcon />,
        value: 'KZ',
        label: 'Казахстан',
      },
      {
        icon: <LanguageIcon />,
        value: 'GLOBAL',
        label: 'Все',
      },
    ],
    dataLanguages: [
      {
        value: 'RU',
        label: 'Русский',
      },
      {
        value: 'EN',
        label: 'English',
      },
      {
        value: 'FR',
        label: 'Français',
      },
      {
        value: 'ES',
        label: 'Español',
      },
      {
        value: 'PT',
        label: 'Português',
      },
    ],
  },
};

export default {
  title: 'UI Components/LangSwitcher',
  component: LangSwitcher,
  decorators: [StoryDecorator()],
} as LangSwitcherMeta;
