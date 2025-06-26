import { Meta, StoryObj } from '@storybook/react-vite';
import { StoryDecorator } from '@/ui/story-decorator';
import { defaultTheme } from '@/ui/theme';
import { ThemeButton } from '.';

export type ThemeButtonMeta = Meta<typeof ThemeButton>;

export type ThemeButtonStory = StoryObj<typeof ThemeButton>;

export const Basic: ThemeButtonStory = {
  args: {
    theme: defaultTheme
  }
};

export default {
  title: 'Components/ThemeButton',
  component: ThemeButton,
  decorators: [StoryDecorator()]
} as ThemeButtonMeta;
