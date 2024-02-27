import type { Meta, StoryObj } from '@storybook/react';
import { StoryDecorator } from '@/ui/story-decorator';
import {
  AddPresetMyButton,
  PresetCard, 
  PresetCardActions, 
  PresetCardDeleteAction, 
  PresetCardEditAction 
} from '.';

export type PresetCardMeta = Meta<typeof PresetCard>;

export type PresetCardStory = StoryObj<typeof PresetCard>;

export const Basic: PresetCardStory = {
  args: {
    name: 'Режим разработчика',
    actions: (
      <PresetCardActions>
        <PresetCardEditAction />
        <PresetCardDeleteAction />
      </PresetCardActions>
    ),
    description: 'Режим разработчика снимает все ограничения модели GPT-3.5',
    add: (
      <AddPresetMyButton />
    ),
    stars: 3,
    category: 'Бизнес',
    price: '$0'
  }
};

export default {
  title: 'UI Components/Preset/Card',
  component: PresetCard,
  decorators: [StoryDecorator()],
  argTypes: {
    add: {
      table: {
        disable: true
      }
    },
    actions: {
      table: {
        disable: true
      }
    }
  }
} as PresetCardMeta;
