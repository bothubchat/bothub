import type { Meta, StoryObj } from '@storybook/react';
import { StoryDecorator } from '@/ui/story-decorator';
import { BlackFridayBanner } from '.';

export type BlackFridayBannerMeta = Meta<typeof BlackFridayBanner>;

export type BlackFridayBannerStory = StoryObj<typeof BlackFridayBanner>;

export const Basic: BlackFridayBannerStory = {
  args: {
    backgroundText: 'Черная \nпятница',
    title: 'Волна\nскидок \nДо 30%',
    text: 'Только в эту пятницу',
    date: '29.11-30.11',
    $variant: 'dashboard'
  }
};

export default {
  title: 'Components/Banner/BlackFriday',
  component: BlackFridayBanner,
  decorators: [StoryDecorator({ scale: 'dashboard' })]
} as BlackFridayBannerMeta;
