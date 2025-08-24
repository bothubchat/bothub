import type { Meta, StoryObj } from '@storybook/react-vite';
import { LanguageIcon } from '@/ui/icons/language';
import { Button } from '.';
import { StoryDecorator } from '@/ui/story-decorator';
import { Tooltip } from '../tooltip';

export type ButtonMeta = Meta<typeof Button>;

export type ButtonStory = StoryObj<typeof Button>;

export const Basic: ButtonStory = {
  args: {
    children: 'Click Me',
  },
};

export const PrimaryOutline: ButtonStory = {
  args: {
    variant: 'primary-outline',
    children: 'Click Me',
  },
};

export const StartIcon: ButtonStory = {
  args: {
    startIcon: <LanguageIcon />,
    children: 'Click Me',
  },
};

export const EndIcon: ButtonStory = {
  args: {
    endIcon: <LanguageIcon />,
    children: 'Click Me',
  },
};

export const Icon: ButtonStory = {
  args: {
    children: <LanguageIcon />,
  },
  argTypes: {
    children: {
      table: {
        disable: true,
      },
    },
  },
};

export const Disabled: ButtonStory = {
  args: {
    ...Basic.args,
    disabled: true,
  },
};

export const Skeleton: ButtonStory = {
  args: {
    ...Basic.args,
    skeleton: true,
  },
};

export const Help: ButtonStory = {
  args: {
    variant: 'help',
  },
};

export const Gradient: ButtonStory = {
  args: {
    ...Basic.args,
    variant: 'gradient',
  },
};

export const WithTooltip: ButtonStory = {
  args: {
    children: 'Click Me',
    size: 'small',
    variant: 'text',
  },
  decorators: [
    (Story) => (
      <Tooltip
        label="Поиск в интернете при необходимости"
        placement="top"
        inverted
      >
        <Story />
      </Tooltip>
    ),
  ],
};

export default {
  title: 'UI Components/Button',
  component: Button,
  decorators: [StoryDecorator()],
  parameters: {
    actions: {
      disable: true,
    },
  },
  argTypes: {
    disabled: {
      type: 'boolean',
      defaultValue: false,
    },
    startIcon: {
      table: {
        disable: true,
      },
    },
    endIcon: {
      table: {
        disable: true,
      },
    },
  },
} as ButtonMeta;
