import type { Meta, StoryObj } from '@storybook/react-vite';
import { FileField, FileFieldLabel } from '.';
import { StoryDecorator } from '@/ui/story-decorator';
import { UploadIcon } from '@/ui/icons';
import { Tooltip } from '@/ui/components/tooltip';
import { Button } from '@/ui/components/button';

export type FileFieldMeta = Meta<typeof FileField>;

export type FileFieldStory = StoryObj<typeof FileField>;

export const Basic: FileFieldStory = {
  args: {
    label: 'Файлы',
    placeholder: 'Загрузить файлы',
  },
};

export const DisableMultiple: FileFieldStory = {
  args: {
    ...Basic.args,
    multiple: false,
  },
};

export const Help: FileFieldStory = {
  args: {
    ...Basic.args,
    label: (
      <FileFieldLabel>
        Label
        <Tooltip label="Help">
          <Button variant="help" />
        </Tooltip>
      </FileFieldLabel>
    ),
  },
};

export const Error: FileFieldStory = {
  args: {
    ...Basic.args,
    error: 'Произошла ошибка',
  },
};

export const Disabled: FileFieldStory = {
  args: {
    ...Basic.args,
    disabled: true,
  },
};

export const CustomIcon: FileFieldStory = {
  args: {
    ...Basic.args,
    icon: <UploadIcon />,
  },
};

export const Closed: FileFieldStory = {
  args: {
    ...Basic.args,
    open: false,
  },
};

export default {
  title: 'UI Components/Fields/File',
  component: FileField,
  decorators: [StoryDecorator()],
} as FileFieldMeta;
