import type { Meta, StoryObj } from '@storybook/react';
import { RangeField, RangeFieldLabel } from '.';
import { StoryDecorator } from '@/ui/story-decorator';
import { Tooltip } from '@/ui/components/tooltip';
import { Button } from '@/ui/components/button';

export type RangeFieldMeta = Meta<typeof RangeField>;

export type RangeFieldStory = StoryObj<typeof RangeField>;

export const Basic: RangeFieldStory = {
  args: {
    step: 0.1,
    min: 0,
    max: 100,
  },
};

export const Label: RangeFieldStory = {
  args: {
    ...Basic.args,
    label: 'Label',
  },
};

export const FormattedValue: RangeFieldStory = {
  args: {
    ...Basic.args,
    label: 'Количество символов',
    min: 600,
    max: 7200,
    step: 200,
    fullWidth: true,
    formatValue: (value) => {
      const v = typeof value === 'number' ? value : value[0];
      return (
        `${v} - ${v * 2} символов / ${Math.round(
          v / 6
        )} - ${Math.round(v / 3)} слов (${Math.max(Math.round(
          v / 3600
        ), 1)} - ${Math.max(Math.round(v / 1800), 1)} страниц)`
      );
    },
  },
};

export const Help: RangeFieldStory = {
  args: {
    ...Basic.args,
    label: (
      <RangeFieldLabel>
        Label
        <Tooltip label="Help">
          <Button variant="help" />
        </Tooltip>
      </RangeFieldLabel>
    ),
  },
};

export const Error: RangeFieldStory = {
  args: {
    ...Label.args,
    error: 'Error message',
  },
};

export const Disabled: RangeFieldStory = {
  args: {
    ...Label.args,
    value: 50,
    disabled: true,
  },
};

export const Skeleton: RangeFieldStory = {
  args: {
    ...Label.args,
    skeleton: true,
  },
};

export default {
  title: 'UI Components/Fields/Range',
  component: RangeField,
  decorators: [StoryDecorator({ margin: '50px 0px' })],
} as RangeFieldMeta;
