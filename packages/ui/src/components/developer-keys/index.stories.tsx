import type { Meta, StoryObj } from '@storybook/react';
import { ThemeStoryDecorator } from '@/ui/theme/story-decorator';
import { AddDeveloperKeyButton, DeveloperKeys } from '.';
import { DeveloperKey } from '@/ui/components/developer-key';

export type DeveloperKeysMeta = Meta<typeof DeveloperKeys>;

export type DeveloperKeysStory = StoryObj<typeof DeveloperKeys>;

export const Basic: DeveloperKeysStory = {
  args: {
    title: 'Ключи API',
    add: (
      <AddDeveloperKeyButton>
        Добавить ключ
      </AddDeveloperKeyButton>
    ),
    children: (
      <>
        <DeveloperKey>
          315f5bdb76d078c43b8ac0064e4a0164612b1fce77c869345bfc94c75894edd
          3315f5bdb76d078c43b8ac0064e4a0164612b1fce77c869345bfc94c75894edd3
        </DeveloperKey>
        <DeveloperKey>
          315f5bdb76d078c43b8ac0064e4a0164612b1fce77c869345bfc94c75894edd
          3315f5bdb76d078c43b8ac0064e4a0164612b1fce77c869345bfc94c75894edd3
        </DeveloperKey>
        <DeveloperKey>
          315f5bdb76d078c43b8ac0064e4a0164612b1fce77c869345bfc94c75894edd
          3315f5bdb76d078c43b8ac0064e4a0164612b1fce77c869345bfc94c75894edd3
        </DeveloperKey>
      </>
    )
  }
};

export const Skeleton: DeveloperKeysStory = {
  args: {
    title: 'Ключи API',
    add: (
      <AddDeveloperKeyButton disabled>
        Добавить ключ
      </AddDeveloperKeyButton>
    ),
    children: [...Array(8)].map((_, index) => (
      <DeveloperKey 
        key={index}
        skeleton
      />
    ))
  }
};

export default {
  title: 'UI Components/DeveloperKeys',
  component: DeveloperKeys,
  decorators: [ThemeStoryDecorator()]
} as DeveloperKeysMeta;
