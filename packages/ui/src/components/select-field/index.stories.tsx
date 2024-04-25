import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { SelectField, SelectFieldConsumer, SelectFieldLabel } from '.';
import { StoryDecorator } from '@/ui/story-decorator';
import { Tooltip } from '@/ui/components/tooltip';
import { Button } from '@/ui/components/button';
import {
  ClaudeIcon, 
  DallEIcon, 
  Gpt35Icon, 
  LightningIcon, 
  LockCircleIcon, 
  MjWhiteIcon, 
  Plus2Icon, 
  PublicIcon, 
  StarIcon 
} from '@/ui/icons';

export type SelectFieldMeta = Meta<typeof SelectField>;

export type SelectFieldStory = StoryObj<typeof SelectField>;

export const Basic: SelectFieldStory = {
  args: {
    label: 'Label',
    placeholder: 'Placeholder',
    data: [
      'React',
      'Vue',
      'Svelte',
      'Node.js',
      'Yarn',
      'Storybook',
      'styled-components',
      'framer motion',
      'Vite',
      'Bothub',
      'ChatGPT',
      'Midjourney'
    ]
  }
};

export const Clearable: SelectFieldStory = {
  args: {
    ...Basic.args,
    clearable: true
  }
};

export const Empty: SelectFieldStory = {
  args: {
    ...Basic.args,
    data: [
      {
        type: 'empty',
        label: 'По вашему запросу ничего не найдено'
      }
    ]
  }
};

export const Multiple: SelectFieldStory = {
  args: {
    label: 'Label',
    placeholder: 'Placeholder',
    data: [
      {
        value: 'React',
      },
      'Vue',
      'Svelte',
      'Node.js',
      'Yarn',
      'Storybook',
      'styled-components',
      'framer motion',
      'Vite',
      'Bothub',
      'ChatGPT',
      'Midjourney'
    ],
    multiple: true
  }
};

export const Loading: SelectFieldStory = {
  args: {
    ...Basic.args,
    loading: true
  }
};

export const Input: SelectFieldStory = {
  args: {
    ...Basic.args,
    enableInput: true
  }
};

export const InputLoading: SelectFieldStory = {
  args: {
    ...Input.args,
    loading: true
  }
};

export const Help: SelectFieldStory = {
  args: {
    ...Basic.args,
    label: (
      <SelectFieldLabel>
        Label
        <Tooltip
          label="Help"
        >
          <Button
            variant="help"
          />
        </Tooltip>
      </SelectFieldLabel>
    )
  }
};

export const Color: SelectFieldStory = {
  args: {
    ...Basic.args,
    data: [
      {
        color: 'red',
        value: 'Red'
      },
      {
        color: 'green',
        value: 'Green'
      },
      {
        color: 'blue',
        value: 'Blue'
      },
      {
        color: 'orange',
        value: 'Orange'
      }
    ]
  }
};

export const Icon: SelectFieldStory = {
  args: {
    ...Basic.args,
    data: [
      {
        icon: <Gpt35Icon />,
        value: 'gpt',
        label: 'ChatGPT'
      },
      {
        icon: <DallEIcon />,
        value: 'dall-e',
        label: 'DALL-E'
      },
      {
        icon: <MjWhiteIcon />,
        value: 'mj',
        label: 'Midjourney'
      },
      {
        icon: <ClaudeIcon />,
        value: 'claude',
        label: 'Claude 2',
        end: <LockCircleIcon />,
        tooltip: {
          placement: 'top-right',
          placementX: -2,
          placementY: 0,
          label: 'Эта модель отсутствует в вашем текущем пакете. Для доступа к ней необходимо приобрести пакет Elite.'
        },
        disabled: true
      }
    ]
  }
};

export const Error: SelectFieldStory = {
  args: {
    ...Basic.args,
    error: 'Error message'
  }
};

export const Disabled: SelectFieldStory = {
  args: {
    ...Basic.args,
    disabled: true
  }
};

export const Skeleton: SelectFieldStory = {
  args: {
    ...Basic.args,
    skeleton: true
  }
};

export const Shortcut: SelectFieldStory = {
  args: {
    size: 'md',
    disableSelect: true,
    contentWidth: 269,
    placement: 'top-right',
    data: [
      {
        value: 'next',
        label: 'Далее'
      },
      {
        value: 'text',
        label: 'Продолжи текст'
      },
      ...(
        [...Array(10)].map((_, index) => ({
          value: `shortcut-${index + 1}`,
          label: `Быстрое действие #${index + 1}`
        }))
      )
    ],
    after: [
      {
        type: 'divider'
      },
      {
        value: 'add',
        icon: <Plus2Icon />,
        label: 'Добавить быстрое действие'
      }
    ],
    children: React.createElement(() => (
      <SelectFieldConsumer>
        {({ selectRef, handleSelectClick }) => (
          <Button
            ref={selectRef as React.RefObject<HTMLButtonElement>}
            onClick={handleSelectClick}
          >
            <LightningIcon />
          </Button>
        )}
      </SelectFieldConsumer>
    ))
  }
};

export const Preset: SelectFieldStory = {
  args: {
    label: 'Пресет',
    placeholder: 'Поиск пресета',
    enableInput: true,
    inputType: 'search',
    data: [
      {
        type: 'collapse',
        icon: <StarIcon fill="#F29C1C" />,
        label: 'Избранные пресеты',
        data: [
          {
            value: '1',
            label: 'Пресет #1'
          },
          {
            value: '2',
            label: 'Пресет #2'
          },
          {
            value: '3',
            label: 'Пресет #3'
          },
          {
            value: '4',
            label: 'Пресет #4'
          },
          {
            value: '5',
            label: 'Большой пресет Большой пресет Большой пресет Большой пресет Большой пресет Большой пресет Большой пресет Большой пресет Большой пресет Большой пресет Большой пресет Большой пресет Большой пресет Большой пресет Большой пресет Большой пресет'
          }
        ]
      },
      {
        type: 'collapse',
        icon: <PublicIcon fill="#4785FF" />,
        label: 'Общедоступные пресеты',
        open: true,
        disabled: true,
        data: [
          {
            type: 'empty',
            label: 'По вашему запросу пресеты не найдены'
          }
        ]
      }
    ]
  }
};

export default {
  title: 'UI Components/Fields/Select',
  component: SelectField,
  decorators: [StoryDecorator({ margin: '300px' })]
} as SelectFieldMeta;
