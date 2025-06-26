import type { Meta, StoryObj } from '@storybook/react-vite';
import { StoryDecorator } from '@/ui/story-decorator';
import {
  PresetCard,
  PresetCardActions,
  PresetCardCategories,
  PresetCardCategory,
  PresetCardDeleteAction,
  PresetCardEditAction,
  PresetCardFavoriteAction
} from '.';

export type PresetCardMeta = Meta<typeof PresetCard>;

export type PresetCardStory = StoryObj<typeof PresetCard>;

export const Basic: PresetCardStory = {
  args: {
    name: 'Режим разработчика',
    actions: (
      <PresetCardActions>
        <PresetCardFavoriteAction />
        <PresetCardEditAction />
        <PresetCardDeleteAction />
      </PresetCardActions>
    ),
    description: 'Режим разработчика снимает все ограничения модели GPT-3.5'
  }
};

export const Categories: PresetCardStory = {
  args: {
    ...Basic.args,
    categories: (
      <PresetCardCategories>
        <PresetCardCategory>Бизнес</PresetCardCategory>
        <PresetCardCategory>Учеба</PresetCardCategory>
      </PresetCardCategories>
    )
  }
};

export const Loading: PresetCardStory = {
  args: {
    ...Categories.args,
    loading: true
  }
};

export const Skeleton: PresetCardStory = {
  args: {
    ...Basic.args,
    skeleton: true,
    categories: true
  }
};

export default {
  title: 'Components/Preset/Card',
  component: PresetCard,
  decorators: [StoryDecorator({ margin: '100px 0px' })],
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
