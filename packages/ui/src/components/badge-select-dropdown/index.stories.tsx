import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { BadgeSelectDropdown, BadgeSelectDropdownListItem } from '.';
import { StoryDecorator } from '@/ui/story-decorator';

export type BadgeSelectDropdownMeta = Meta<typeof BadgeSelectDropdown>;

export type BadgeSelectDropdownStory = StoryObj<typeof BadgeSelectDropdown>;

const BadgeSelectDropdownStoryComponent: React.FC = () => {
  const [activeItem, setActiveItem] = useState('Select Model');

  return (
    <BadgeSelectDropdown activeDropDownItem={activeItem}>
      <BadgeSelectDropdownListItem
        $active={activeItem === 'Select Model'}
        onClick={() => setActiveItem('Select Model')}
      >
        Select Model
      </BadgeSelectDropdownListItem>
      <BadgeSelectDropdownListItem
        $active={activeItem === 'Model 1'}
        onClick={() => setActiveItem('Model 1')}
      >
        Model 1
      </BadgeSelectDropdownListItem>
      <BadgeSelectDropdownListItem
        $active={activeItem === 'Model 2'}
        onClick={() => setActiveItem('Model 2')}
      >
        Model 2
      </BadgeSelectDropdownListItem>
      <BadgeSelectDropdownListItem
        $active={activeItem === 'Model 3'}
        onClick={() => setActiveItem('Model 3')}
      >
        Model 3
      </BadgeSelectDropdownListItem>
    </BadgeSelectDropdown>
  );
};

export const Basic: BadgeSelectDropdownStory = {
  render: () => <BadgeSelectDropdownStoryComponent />
};

export default {
  title: 'UI Components/BadgeSelectDropdown',
  component: BadgeSelectDropdown,
  decorators: [StoryDecorator()],
  argTypes: {
    activeDropDownItem: { control: 'text' },
    children: { control: 'text' }
  }
} as BadgeSelectDropdownMeta;
