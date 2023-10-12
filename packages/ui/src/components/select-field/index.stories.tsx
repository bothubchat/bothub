import type { Meta, StoryObj } from '@storybook/react';
import { SelectField } from '.';
import { ThemeStoryDecorator } from '@/ui/theme/story-decorator';

export type SelectFieldMeta = Meta<typeof SelectField>;

export type SelectFieldStory = StoryObj<typeof SelectField>;

export const Basic: SelectFieldStory = {
  args: {
    label: 'Label',
    placeholder: 'Placeholder',
    data: [
      'React',
      'Vue',
      'Svelte',
      'Node.js',
      'Yarn',
      'Storybook',
      'styled-components',
      'framer motion',
      'Vite',
      'Bothub',
      'ChatGPT',
      'Midjourney'
    ]
  }
};

export const Color: SelectFieldStory = {
  args: {
    ...Basic.args,
    data: [
      {
        color: 'red',
        value: 'Red'
      },
      {
        color: 'green',
        value: 'Green'
      },
      {
        color: 'blue',
        value: 'Blue'
      },
      {
        color: 'orange',
        value: 'Orange'
      }
    ]
  }
};

export const Error: SelectFieldStory = {
  args: {
    ...Basic.args,
    error: 'Error message'
  }
};

export default {
  title: 'UI Components/SelectField',
  component: SelectField,
  decorators: [ThemeStoryDecorator()]
} as SelectFieldMeta;
