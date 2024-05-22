import type { Meta, StoryObj } from '@storybook/react';
import { FileField } from '.';
import { StoryDecorator } from '@/ui/story-decorator';

export type FileFieldMeta = Meta<typeof FileField>;

export type FileFieldStory = StoryObj<typeof FileField>;

export const Basic: FileFieldStory = {
  args: {
    label: 'Файлы',
    placeholder: 'Загрузить файлы'
  }
};

export const Error: FileFieldStory = {
  args: {
    ...Basic.args,
    error: 'Произошла ошибка'
  }
};

export const Disabled: FileFieldStory = {
  args: {
    ...Basic.args,
    disabled: true
  }
};

export default {
  title: 'UI Components/Fields/File',
  component: FileField,
  decorators: [StoryDecorator()]
} as FileFieldMeta;
