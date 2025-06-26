import type { Meta, StoryObj } from '@storybook/react-vite';
import { StoryDecorator } from '@/ui/story-decorator';
import { BothubAppBannerMini } from '.';

export type BothubAppBannerMiniMeta = Meta<typeof BothubAppBannerMini>;

export type BothubAppBannerMiniStory = StoryObj<typeof BothubAppBannerMini>;

export const Basic: BothubAppBannerMiniStory = {
  args: {
    title: 'Скачать приложение',
    text: 'Теперь доступно для Android, iOS и ПК',
    href: 'https://bothubq.com'
  }
};

export default {
  title: 'Components/Banner/BothubApp/Mini',
  component: BothubAppBannerMini,
  decorators: [StoryDecorator({ scale: 'main' })]
} as BothubAppBannerMiniMeta;
