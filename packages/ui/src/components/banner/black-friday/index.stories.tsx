import type { Meta, StoryObj } from '@storybook/react-vite';
import { StoryDecorator } from '@/ui/story-decorator';
import { BlackFridayBanner } from '.';

export type BlackFridayBannerMeta = Meta<typeof BlackFridayBanner>;

export const Basic: StoryObj<typeof BlackFridayBanner> = {
  args: {
    backgroundText: 'Волна \nскидок',
    title: 'Скидки до 25%\nна наши \nнейросети',
    text: '-25% на GEMINI\n -10% на все остальные',
    $variant: 'main',
  },
};

export default {
  title: 'Components/Banner/BlackFriday',
  component: BlackFridayBanner,
  decorators: [StoryDecorator({ scale: 'main' })],
} as BlackFridayBannerMeta;
