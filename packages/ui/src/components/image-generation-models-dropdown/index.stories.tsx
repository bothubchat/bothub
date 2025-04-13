import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { DropDownModelItem } from '.';
import { StoryDecorator } from '@/ui/story-decorator';
import { DropDownModelItemListItem } from './item';

export type DropDownModelItemMeta = Meta<typeof DropDownModelItem>;

export type DropDownModelItemStory = StoryObj<typeof DropDownModelItem>;

const DropDownModelItemStoryComponent: React.FC = () => {
  const [activeItem, setActiveItem] = useState('Select Model');

  return (
    <DropDownModelItem activeDropDownItem={activeItem}>
      <DropDownModelItemListItem
        $active={activeItem === 'Select Model'}
        onClick={() => setActiveItem('Select Model')}
      >
        Select Model
      </DropDownModelItemListItem>
      <DropDownModelItemListItem
        $active={activeItem === 'Model 1'}
        onClick={() => setActiveItem('Model 1')}
      >
        Model 1
      </DropDownModelItemListItem>
      <DropDownModelItemListItem
        $active={activeItem === 'Model 2'}
        onClick={() => setActiveItem('Model 2')}
      >
        Model 2
      </DropDownModelItemListItem>
      <DropDownModelItemListItem
        $active={activeItem === 'Model 3'}
        onClick={() => setActiveItem('Model 3')}
      >
        Model 3
      </DropDownModelItemListItem>
    </DropDownModelItem>
  );
};

export const Basic: DropDownModelItemStory = {
  render: () => <DropDownModelItemStoryComponent />
};

export default {
  title: 'ImageGeneration/DropdownModelItem',
  component: DropDownModelItem,
  decorators: [StoryDecorator()],
  argTypes: {
    activeDropDownItem: { control: 'text' },
    children: { control: 'text' }
  }
} as DropDownModelItemMeta;
