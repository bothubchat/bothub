import type { Meta, StoryObj } from '@storybook/react';
import { StoryDecorator } from '@/ui/story-decorator';
import {
  PresetCard,
  PresetCardActions,
  PresetCardCategories,
  PresetCardCategory,
  PresetCardDeleteAction,
  PresetCardEditAction,
  PresetCardFavoriteAction,
  Presets
} from '@/ui/components/preset';

export type PresetsMeta = Meta<typeof Presets>;

export type PresetsStory = StoryObj<typeof Presets>;

export const Basic: PresetsStory = {
  args: {
    children: [...Array(20)].map((_, index) => (
      <PresetCard
        key={index}
        name="Режим разработчика"
        {...(index % 3 === 0 && {
          color: '#F29C1C'
        })}
        actions={
          <PresetCardActions>
            <PresetCardFavoriteAction />
            <PresetCardEditAction />
            <PresetCardDeleteAction />
          </PresetCardActions>
        }
        description={
          index % 3 === 0 &&
          'Режим разработчика снимает все ограничения модели GPT-3.5'
        }
        categories={
          index % 2 === 0 && (
            <PresetCardCategories>
              <PresetCardCategory>Бизнес</PresetCardCategory>
              <PresetCardCategory>Учеба</PresetCardCategory>
            </PresetCardCategories>
          )
        }
      />
    ))
  }
};

export default {
  title: 'Components/Preset/List',
  component: Presets,
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
} as PresetsMeta;
