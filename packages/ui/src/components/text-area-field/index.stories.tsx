import type { Meta, StoryObj } from '@storybook/react';
import { TextAreaField, TextAreaFieldLabel } from '.';
import { StoryDecorator } from '@/ui/story-decorator';
import { Tooltip } from '@/ui/components/tooltip';
import { Button } from '@/ui/components/button';

export type TextAreaFieldMeta = Meta<typeof TextAreaField>;

export type TextAreaFieldStory = StoryObj<typeof TextAreaField>;

export const Basic: TextAreaFieldStory = {
  args: {
    label: 'Label',
    placeholder: 'Placeholder',
    glow: false,
  },
};

export const Help: TextAreaFieldStory = {
  args: {
    label: (
      <TextAreaFieldLabel>
        Label
        <Tooltip label="Help">
          <Button variant="help" />
        </Tooltip>
      </TextAreaFieldLabel>
    ),
  },
};

export const Error: TextAreaFieldStory = {
  args: {
    ...Basic.args,
    error: 'Error message',
  },
};

export const Disabled: TextAreaFieldStory = {
  args: {
    ...Basic.args,
    disabled: true,
  },
};

export const Skeleton: TextAreaFieldStory = {
  args: {
    ...Basic.args,
    skeleton: true,
  },
};

export default {
  title: 'UI Components/Fields/TextArea',
  component: TextAreaField,
  decorators: [StoryDecorator({ margin: '50px 0px' })],
} as TextAreaFieldMeta;
