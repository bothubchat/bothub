import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { BadgeSelectDropdown, BadgeSelectDropdownProps } from '.';
import { StoryDecorator } from '@/ui/story-decorator';

export type BadgeSelectDropdownMeta = Meta<typeof BadgeSelectDropdown>;

export type BadgeSelectDropdownStory = StoryObj<typeof BadgeSelectDropdown>;

const BadgeSelectDropdownStoryComponent = (
  props: Omit<BadgeSelectDropdownProps, 'options'>
) => {
  const [value, setValue] = useState('Very long option label');

  return (
    <BadgeSelectDropdown
      value={value}
      options={[
        'Very long option label',
        'Model 1',
        'Model 2',
        'Model 3',
        'Model 4'
      ]}
      onChange={setValue}
      placement="bottom-center"
      {...props}
    />
  );
};

export const Primary: BadgeSelectDropdownStory = {
  render: () => <BadgeSelectDropdownStoryComponent />
};

export const Secondary: BadgeSelectDropdownStory = {
  render: () => <BadgeSelectDropdownStoryComponent variant="secondary" />
};

export default {
  title: 'UI Components/BadgeSelectDropdown',
  component: BadgeSelectDropdown,
  decorators: [StoryDecorator({ margin: '0 75px' })]
} as BadgeSelectDropdownMeta;
