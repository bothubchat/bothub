import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import {
  SelectField,
  SelectFieldConsumer,
  SelectFieldDataItem,
  SelectFieldDataItemComplex,
  SelectFieldItemType,
  SelectFieldLabel
} from '.';
import { StoryDecorator } from '@/ui/story-decorator';
import { Tooltip } from '@/ui/components/tooltip';
import { Button } from '@/ui/components/button';
import {
  ClaudeIcon,
  CodeGenerationIcon,
  DallEIcon,
  Gpt35Icon,
  ImageGenerationIcon,
  LightningIcon,
  LockCircleIcon,
  MjWhiteIcon,
  Plus2Icon,
  PublicIcon,
  SortAlphabetAscendingIcon,
  SortAlphabetDescendingIcon,
  SortAscendingIcon,
  SortDescendingIcon,
  SpeechSynthesysIcon,
  SpellingIcon,
  StarIcon,
  TextGenerationIcon,
  TrafficAnalisysIcon
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
      'Midjourney',
      'o3-mini'
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
        value: 'React'
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
        <Tooltip label="Help">
          <Button variant="help" />
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
          label:
            'Эта модель отсутствует в вашем текущем пакете. Для доступа к ней необходимо приобрести пакет Elite.'
        },
        disabled: true
      }
    ]
  }
};

export const Plans: SelectFieldStory = {
  args: {
    ...Basic.args,
    data: [
      {
        icon: <PublicIcon />,
        value: 'public',
        label: 'Public',
        backgroundHoverColor: 'primary'
      },
      {
        icon: <StarIcon />,
        value: 'premium',
        label: 'Premium',
        backgroundHoverColor: 'primary'
      },
      {
        icon: <LightningIcon />,
        value: 'elite',
        label: 'Elite',
        backgroundHoverColor: 'gradient'
      }
    ]
  }
};

export const Sort: SelectFieldStory = {
  args: {
    ...Basic.args,
    data: [
      {
        label: 'По цене',
        type: 'label'
      },
      {
        icon: <SortDescendingIcon />,
        label: 'По возрастанию'
      },
      {
        label: 'По убыванию',
        icon: <SortAscendingIcon />
      },
      {
        type: 'divider'
      },
      {
        label: 'По длине ответа',
        type: 'label'
      },
      {
        icon: <SortAlphabetAscendingIcon />,
        label: 'По возрастанию'
      },
      {
        label: 'По убыванию',
        icon: <SortAlphabetDescendingIcon />
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
      ...[...Array(10)].map((_, index) => ({
        value: `shortcut-${index + 1}`,
        label: `Быстрое действие #${index + 1}`
      }))
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
        id: 'presets',
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
            label:
              'Большой пресет Большой пресет Большой пресет Большой пресет Большой пресет Большой пресет Большой пресет Большой пресет Большой пресет Большой пресет Большой пресет Большой пресет Большой пресет Большой пресет Большой пресет Большой пресет'
          }
        ]
      },
      {
        id: 'presets-2',
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
            label:
              'Большой пресет Большой пресет Большой пресет Большой пресет Большой пресет Большой пресет Большой пресет Большой пресет Большой пресет Большой пресет Большой пресет Большой пресет Большой пресет Большой пресет Большой пресет Большой пресет'
          }
        ]
      },
      {
        id: 'disabled',
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

export const Bold: SelectFieldStory = {
  args: {
    data: [
      {
        label: 'Сортировать',
        type: 'collapse',
        data: [
          {
            label: 'По возрастанию',
            noSelect: true
          },
          {
            label: 'По убыванию',
            noSelect: true
          }
        ]
      },
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
        label: 'Показать еще',
        bold: true,
        icon: <Plus2Icon d="fill" />,
        noSelect: true
      }
    ]
  }
};

export const Radio: SelectFieldStory = {
  render() {
    const [data, setData] = useState([
      {
        id: 'model-id',
        icon: <Gpt35Icon />,
        type: 'radio' as SelectFieldItemType,
        label: 'long model name '.repeat(2),
        description:
          'Уменьшенная и более дешевая версия самой лучшей модели OpenAi',
        radioName: 'models'
      },
      {
        id: 'o1-mini',
        icon: <Gpt35Icon />,
        type: 'radio' as SelectFieldItemType,
        label: 'o1-mini',
        description:
          'Уменьшенная и более дешевая версия самой лучшей модели OpenAi',
        radioName: 'models'
      },
      {
        id: 'GPT-4o',
        icon: <Gpt35Icon />,
        type: 'radio' as SelectFieldItemType,
        label: 'GPT-4o',
        description:
          'Модель c высоким уровнем креативности, адаптированная для  написания человечных текстов',
        radioName: 'models'
      },
      {
        id: 'GPT-4-turbo',
        icon: <Gpt35Icon />,
        type: 'radio' as SelectFieldItemType,
        label: 'GPT-4-turbo',
        description:
          'Модель хорошо справляется с кодом, обработкой неструктурированых и визуальных данных.',
        radioName: 'models'
      }
    ]);

    const onOptionClick = (item: SelectFieldDataItem) => {
      const selectedItem = item as SelectFieldDataItemComplex;

      setData(
        data.map((item) => ({ ...item, selected: selectedItem.id === item.id }))
      );
    };

    return (
      <SelectField
        data={data}
        onOptionClick={onOptionClick}
      />
    );
  }
};

export const WithTabs: SelectFieldStory = {
  args: {
    ...Basic.args,
    tabs: {
      tabs: [
        {
          id: 'text',
          label: 'Текст',
          icon: <TextGenerationIcon />
        },
        {
          id: 'image',
          label: 'Изображение',
          icon: <ImageGenerationIcon />
        },
        {
          id: 'code',
          label: 'Код',
          icon: <CodeGenerationIcon />
        },
        {
          id: 'table',
          label: 'Анализ таблиц',
          icon: <TrafficAnalisysIcon />
        },
        {
          id: 'speech',
          label: 'Синтез речи',
          icon: <SpeechSynthesysIcon />
        },
        {
          id: 'spell',
          label: 'Орфография',
          icon: <SpellingIcon />
        }
      ],
      onTabClick(id) {
        alert(id);
      },
      defaultTabId: 'code'
    },
    contentWidth: 350
  }
};

export const WithSearch: SelectFieldStory = {
  args: {
    data: [
      {
        id: 'ChatGPT',
        type: 'collapse',
        label: 'ChatGPT',
        icon: <Gpt35Icon />,
        data: ['gpt-4o', 'gpt-4o-mini', 'o1-mini']
      },
      'Midjourney',
      {
        icon: <DallEIcon />,
        value: 'dall-e',
        label: 'DALL-E'
      }
    ],
    search: true,
    searchPlaceholder: 'Поиск...'
  }
};

export const SmallSize: SelectFieldStory = {
  args: {
    data: [
      {
        type: 'collapse',
        label: 'ChatGPT',
        icon: <Gpt35Icon />,
        data: ['gpt-4o', 'gpt-4o-mini', 'o1-mini']
      },
      {
        label: 'Midjourney',
        icon: <MjWhiteIcon />
      },
      'React',
      'Vue',
      'Svelte'
    ]
  }
};

export const MediumSize: SelectFieldStory = {
  args: {
    ...SmallSize.args,
    size: 'md'
  }
};

export const LargeSize: SelectFieldStory = {
  args: {
    ...SmallSize.args,
    size: 'large'
  }
};

export const WithBeforeAndAfter: SelectFieldStory = {
  args: {
    before: Basic.args?.data,
    data: Basic.args?.data,
    after: Basic.args?.data
  }
};

export const ResetStyleState: SelectFieldStory = {
  render() {
    const [shouldResetStyleState, setShouldResetStyleState] = useState(false);

    return (
      <>
        <SelectField
          data={WithSearch.args?.data}
          resetStyleState={shouldResetStyleState}
          placement="top-right"
        />
        <Button
          type="button"
          onClick={() => setShouldResetStyleState((prev) => !prev)}
          style={{
            marginTop: 20
          }}
        >
          Reset opened option and scroll top state
        </Button>
      </>
    );
  }
};

export default {
  title: 'UI Components/Fields/Select',
  component: SelectField,
  decorators: [StoryDecorator({ margin: '300px' })]
} as SelectFieldMeta;
