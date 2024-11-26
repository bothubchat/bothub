import type { Meta, StoryObj } from '@storybook/react';
import { StoryDecorator } from '@/ui/story-decorator';
import { BannerMiniBlackFriday } from '.';

export type BlackFridayBannerMiniMeta = Meta<typeof BannerMiniBlackFriday>;

export type BlackFridayBannerMiniStory = StoryObj<typeof BannerMiniBlackFriday>;

export const Basic: BlackFridayBannerMiniStory = {
  args: {
    title: `Волна\nскидок \nДо 30%`,
    text: 'Только в эту пятницу',
  }
};

export default {
  title: 'Components/Banner/Mini',
  component: BannerMiniBlackFriday,
  decorators: [StoryDecorator({ scale: 'dashboard' })]
} as BlackFridayBannerMiniMeta;
