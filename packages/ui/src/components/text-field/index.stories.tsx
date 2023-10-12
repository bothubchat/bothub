import type { Meta, StoryObj } from '@storybook/react';
import { TextField } from '.';
import { ThemeStoryDecorator } from '@/ui/theme/story-decorator';
import { EmailCircleIcon } from '@/ui/icons';

export type TextFieldMeta = Meta<typeof TextField>;

export type TextFieldStory = StoryObj<typeof TextField>;

export const Basic: TextFieldStory = {
  args: {
    label: 'Label',
    placeholder: 'Placeholder'
  }
};

export const StartIcon: TextFieldStory = {
  args: {
    label: 'Label',
    placeholder: 'Placeholder',
    startIcon: (
      <EmailCircleIcon />
    )
  }
};

export const EndIcon: TextFieldStory = {
  args: {
    label: 'Label',
    placeholder: 'Placeholder',
    endIcon: (
      <EmailCircleIcon />
    )
  }
};

export const Error: TextFieldStory = {
  args: {
    label: 'Label',
    placeholder: 'Placeholder',
    error: 'Error message'
  }
};

export const Search: TextFieldStory = {
  args: {
    type: 'search',
    label: 'Search',
    placeholder: 'Search'
  }
};

export default {
  title: 'UI Components/TextField',
  component: TextField,
  decorators: [ThemeStoryDecorator()],
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
} as TextFieldMeta;
