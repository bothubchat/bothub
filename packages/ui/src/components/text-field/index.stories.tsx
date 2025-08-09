import type { Meta, StoryObj } from '@storybook/react';
import { TextField, TextFieldLabel } from '.';
import { StoryDecorator } from '@/ui/story-decorator';
import { EmailCircleIcon } from '@/ui/icons';
import { Tooltip } from '@/ui/components/tooltip';
import { Button } from '@/ui/components/button';

export type TextFieldMeta = Meta<typeof TextField>;

export type TextFieldStory = StoryObj<typeof TextField>;

export const Basic: TextFieldStory = {
  args: {
    label: 'Label',
    placeholder: 'Placeholder',
  },
};

export const Secondary: TextFieldStory = {
  args: {
    ...Basic.args,
    variant: 'secondary',
  },
};

export const Number: TextFieldStory = {
  args: {
    ...Basic.args,
    type: 'number',
  },
};

export const Help: TextFieldStory = {
  args: {
    label: (
      <TextFieldLabel>
        Label
        <Tooltip label="Help">
          <Button variant="help" />
        </Tooltip>
      </TextFieldLabel>
    ),
  },
};

export const StartIcon: TextFieldStory = {
  args: {
    label: 'Label',
    placeholder: 'Placeholder',
    startIcon: <EmailCircleIcon />,
  },
};

export const EndIcon: TextFieldStory = {
  args: {
    label: 'Label',
    placeholder: 'Placeholder',
    endIcon: <EmailCircleIcon />,
  },
};

export const Error: TextFieldStory = {
  args: {
    label: 'Label',
    placeholder: 'Placeholder',
    error: 'Error message',
  },
};

export const Search: TextFieldStory = {
  args: {
    type: 'search',
    label: 'Search',
    placeholder: 'Search',
  },
};

export const Disabled: TextFieldStory = {
  args: {
    ...Basic.args,
    disabled: true,
  },
};

export const Skeleton: TextFieldStory = {
  args: {
    ...Basic.args,
    skeleton: true,
  },
};

export const Color: TextFieldStory = {
  args: {
    ...Basic.args,
    type: 'color',
  },
};

export const WithCustomInputStyles: TextFieldStory = {
  args: {
    ...Basic.args,
    inputStyles: {
      border: 'none',
      borderRadius: '20px',
    },
  },
};

export const Clearable: TextFieldStory = {
  args: {
    ...Basic.args,
    clearable: true,
  },
};

export default {
  title: 'UI Components/Fields/Text',
  component: TextField,
  decorators: [StoryDecorator({ margin: '50px 0px' })],
  argTypes: {
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
} as TextFieldMeta;
