import type { Meta, StoryObj } from '@storybook/react';
import { LanguageIcon } from '../icons/language';
import { Button } from '.';
import { ThemeStoryDecorator } from '../../theme/story-decorator';

export type ButtonMeta = Meta<typeof Button>;

export type ButtonStory = StoryObj<typeof Button>;

export const Basic: ButtonStory = {
  args: {
    children: 'Click Me'
  }
};

export const StartIcon: ButtonStory = {
  args: {
    startIcon: <LanguageIcon />,
    children: 'Click Me'
  }
};

export const EndIcon: ButtonStory = {
  args: {
    endIcon: <LanguageIcon />,
    children: 'Click Me'
  }
};

export const Icon: ButtonStory = {
  args: {
    children: <LanguageIcon />
  },
  argTypes: {
    children: {
      table: {
        disable: true
      }
    }
  }
};

export default {
  title: 'UI Components/Button',
  component: Button,
  decorators: [ThemeStoryDecorator()],
  parameters: {
    actions: {
      disable: true
    }
  },
  argTypes: {
    startIcon: {
      table: {
        disable: true
      }
    },
    endIcon: {
      table: {
        disable: true
      }
    }
  }
} as ButtonMeta;
