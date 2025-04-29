import { Meta, StoryObj } from '@storybook/react';
import { StoryDecorator } from '@/ui/story-decorator';
import { ThemeButton } from '.';

export type ThemeButtonMeta = Meta<typeof ThemeButton>;

export type ThemeButtonStory = StoryObj<typeof ThemeButton>;

export const Basic: ThemeButtonStory = {
  args: {
    hasActions: true,
    active: true,
    theme: {
      mode: 'dark',
      colors: {
        base: {
          black: '#0E0C15',
          white: '#FFFFFF'
        },
        accent: {
          primary: '#1C64F2',
          primaryLight: '#4785ff',
          strong: '#073CA4',
          strongDown: '#0E3176'
        },
        grayScale: {
          gray1: '#616D8D',
          gray2: '#313E62',
          gray3: '#222B44',
          gray4: '#121825',
          gray5: '#374151',
          gray6: '#9CA3AF',
          gray7: '#171E2F'
        },
        premiumGradient:
          'linear-gradient(90deg, #1C64F2 -0.39%, #D41CF2 99.61%)',
        gradient: {
          basic: 'linear-gradient(90deg, #00247D 0%, #1C64F2 100%)',
          light: 'linear-gradient(90deg, #073DC3 0%, #4785FF 100%)',
          premium: 'linear-gradient(90deg, #4785FF 0%, #7740F2 100%)',
          deluxe: 'linear-gradient(90deg, #5728FF 0%, #A750FF 100%)',
          elite: 'linear-gradient(90deg, #1C64F2 0%, #D41CF2 100%)',
          elite20:
            'linear-gradient(90deg, rgba(28,100,242,0.2) 0%, rgba(212,28,242,0.2) 100%)'
        },
        critic: '#FE4242',
        orange: '#F29C1C',
        purple: '#941CF2',
        aqua: '#1CB2F2',
        green: '#1ABB34',
        gpt3: '#28A08C',
        gpt4: '#735FFA'
      }
    }
  }
};

export default {
  title: 'UI Components/ThemeButton',
  component: ThemeButton,
  decorators: [StoryDecorator()]
} as ThemeButtonMeta;
