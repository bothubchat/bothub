import { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { BadgeSelectDropdown, BadgeSelectDropdownProps } from '.';
import { StoryDecorator } from '@/ui/story-decorator';
import { SelectFieldDataItem } from '../select-field';
import { Gpt35Icon } from '@/ui/icons';

export type BadgeSelectDropdownMeta = Meta<typeof BadgeSelectDropdown>;

export type BadgeSelectDropdownStory = StoryObj<typeof BadgeSelectDropdown>;

const BadgeSelectDropdownStoryComponent = (
  props: Omit<BadgeSelectDropdownProps, 'options'>,
) => {
  const [value, setValue] = useState<SelectFieldDataItem | null>(
    'Very long option label',
  );

  return (
    <BadgeSelectDropdown
      value={value}
      options={[
        {
          icon: <Gpt35Icon />,
          label: 'Model 1',
        },
        {
          icon: <Gpt35Icon />,
          label: 'Model 2',
        },
        {
          icon: <Gpt35Icon />,
          label: 'Model 3',
        },
        {
          icon: <Gpt35Icon />,
          label: 'Model 4',
        },
        {
          icon: <Gpt35Icon />,
          label: 'Model 5',
        },
        {
          icon: <Gpt35Icon />,
          label: 'Model 6',
        },
      ]}
      onChange={setValue}
      placement="bottom-center"
      {...props}
    />
  );
};

export const Primary: BadgeSelectDropdownStory = {
  render: () => <BadgeSelectDropdownStoryComponent />,
};

export const Secondary: BadgeSelectDropdownStory = {
  render: () => <BadgeSelectDropdownStoryComponent variant="secondary" />,
};

export default {
  title: 'UI Components/BadgeSelectDropdown',
  component: BadgeSelectDropdown,
  decorators: [StoryDecorator({ margin: '0 75px' })],
} as BadgeSelectDropdownMeta;
