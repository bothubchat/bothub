import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { RangeSettings } from '.';
import type { RangeSettingsValue } from './types';
import { StoryDecorator } from '@/ui/story-decorator';

export type RangeSettingsMeta = Meta<typeof RangeSettings>;

export type RangeSettingsStory = StoryObj<typeof RangeSettings>;

export const Basic: RangeSettingsStory = {
  args: {
    min: 0.1,
    max: 0.3,
    step: 0.1,
  },
};

export const Controlled: RangeSettingsStory = {
  render: (args) => {
    const [value, setValue] = useState<RangeSettingsValue>(42);
    return (
      <RangeSettings
        {...args}
        value={value}
        onChange={setValue}
      />
    );
  },
};

export const Disabled: RangeSettingsStory = {
  args: {
    ...Basic.args,
    value: 35,
    disabled: true,
  },
};

export default {
  title: 'UI Components/RangeSettings',
  component: RangeSettings,
  decorators: [StoryDecorator({ margin: '40px 24px' })],
} as RangeSettingsMeta;
