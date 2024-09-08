import type { Meta, StoryObj } from '@storybook/react';
import { LanguageIcon } from '@/ui/icons/language';
import { Button } from '.';
import { StoryDecorator } from '@/ui/story-decorator';

export type ButtonMeta = Meta<typeof Button>;

export type ButtonStory = StoryObj<typeof Button>;

export const Basic: ButtonStory = {
  args: {
    children: 'Click Me'
  }
};

export const PrimaryOutline: ButtonStory = {
  args: {
    variant: 'primary-outline',
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

export const Disabled: ButtonStory = {
  args: {
    ...Basic.args,
    disabled: true
  }
};

export const Skeleton: ButtonStory = {
  args: {
    ...Basic.args,
    skeleton: true
  }
};

export const Help: ButtonStory = {
  args: {
    variant: 'help'
  }
};

export default {
  title: 'UI Components/Button',
  component: Button,
  decorators: [StoryDecorator()],
  parameters: {
    actions: {
      disable: true
    }
  },
  argTypes: {
    disabled: {
      type: 'boolean',
      defaultValue: false
    },
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
