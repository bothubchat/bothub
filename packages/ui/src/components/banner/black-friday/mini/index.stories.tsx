import { Meta, StoryObj } from '@storybook/react-vite';
import { StoryDecorator } from '@/ui/story-decorator';
import { BannerMiniBlackFriday } from '.';

export type BannerMiniBlackFridayMeta = Meta<typeof BannerMiniBlackFriday>;

export const Basic: StoryObj<typeof BannerMiniBlackFriday> = {
  args: {
    title: 'Волна\nскидок \nДо 30%',
    text: 'Только в эту пятницу',
  },
};

export default {
  title: 'Components/Banner/BlackFriday/Mini',
  component: BannerMiniBlackFriday,
  decorators: [StoryDecorator({ scale: 'dashboard' })],
} as BannerMiniBlackFridayMeta;
