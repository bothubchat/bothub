import type { Meta, StoryObj } from '@storybook/react';
import { StoryDecorator } from '@/ui/story-decorator';
import { BothubAppBanner } from '.';

export type BothubAppBannerMeta = Meta<typeof BothubAppBanner>;

export type BothubAppBannerStory = StoryObj<typeof BothubAppBanner>;

export const Basic: BothubAppBannerStory = {
  args: {
    href: 'https://bothubq.com',
    title: 'BotHub — все нейросети в одном приложении!',
    description:
      'Получи доступ к ChatGPT, Midjourney, DeepSeek и другим ИИ прямо на своём смартфоне или компьютере. Приложение BotHub теперь доступно для Android, iOS и ПК. Скачивай и начинай пользоваться нейросетями прямо сейчас!'
  }
};

export default {
  title: 'Components/Banner/BothubApp',
  component: BothubAppBanner,
  decorators: [StoryDecorator({ scale: 'main' })]
} as BothubAppBannerMeta;
