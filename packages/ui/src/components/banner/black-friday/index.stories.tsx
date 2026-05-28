import type { Meta, StoryObj } from '@storybook/react-vite';
import { StoryDecorator } from '@/ui/story-decorator';
import { BlackFridayBanner } from '.';

export type BlackFridayBannerMeta = Meta<typeof BlackFridayBanner>;

export const Basic: StoryObj<typeof BlackFridayBanner> = {
  args: {
    backgroundText: 'Черная \nпятница',
    title: 'Скидки до 25%\nна наши \nнейросети',
    text: '-25% на модели GEMINI \n-10% на все остальные',
    $variant: 'dashboard',
  },
};

export default {
  title: 'Components/Banner/BlackFriday',
  component: BlackFridayBanner,
  decorators: [StoryDecorator({ scale: 'dashboard' })],
} as BlackFridayBannerMeta;
