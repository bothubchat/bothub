import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { BadgeSelectDropdown } from '.';
import { StoryDecorator } from '@/ui/story-decorator';
import { Variant } from './types';

export type BadgeSelectDropdownMeta = Meta<typeof BadgeSelectDropdown>;

export type BadgeSelectDropdownStory = StoryObj<typeof BadgeSelectDropdown>;

const BadgeSelectDropdownStoryComponent = ({
  variant
}: {
  variant?: Variant;
}) => {
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
      variant={variant}
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
