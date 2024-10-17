import type { Meta, StoryObj } from '@storybook/react';
import { StoryDecorator } from '@/ui/story-decorator';
import {
  Tooltip,
  TooltipColumn,
  TooltipImage,
  TooltipLabel,
  TooltipLabelBold,
} from '@/ui/components/tooltip';
import { Button } from '@/ui/components/button';
import image from './assets/image.jpg';
import { Badge } from '@/ui/components/badge';
import { LightningIcon } from '@/ui/icons/lightning';

export type TooltipMeta = Meta<typeof Tooltip>;

export type TooltipStory = StoryObj<typeof Tooltip>;

export const Basic: TooltipStory = {
  args: {
    label: 'Tooltip text',
    children: <Button>Hover Me</Button>,
  },
};

export const IconButton: TooltipStory = {
  args: {
    ...Basic.args,
    children: (
      <Button>
        <LightningIcon />
      </Button>
    ),
  },
};

export const Image: TooltipStory = {
  args: {
    ...Basic.args,
    label: (
      <TooltipColumn>
        <TooltipImage
          src={image}
          width={50}
          height={50}
          alt="Tooltip image"
        />
        <TooltipLabel>100</TooltipLabel>
      </TooltipColumn>
    ),
  },
};

export const Bold: TooltipStory = {
  args: {
    label: (
      <TooltipLabel>
        <TooltipLabelBold>Причина:</TooltipLabelBold>
        {' '}
        API не отвечает.
      </TooltipLabel>
    ),
    placement: 'top-left',
    placementX: 5,
    children: <Badge variant="error">Ошибка генерации</Badge>,
  },
};

export const Markdown: TooltipStory = {
  args: {
    ...Basic.args,
    label: '**Markdown** text',
    markdown: true,
  },
};

export const Code: TooltipStory = {
  args: {
    ...Markdown.args,
    label:
      "Параметр настроек 'Стиль' со значением 'raw' использует альтернативную модель, которая может подойти опытным пользователям, желающим получить больший контроль над своими изображениями. Изображения, созданные с параметром 'Стиль raw', имеют меньше автоматического улучшения, что может обеспечить более точное соответствие при запросе с определенным стилем.  Соответствует текстовому параметру ``--style`` в промпте к Midjourney",
  },
};

export const Inverted: TooltipStory = {
  args: {
    inverted: true,
    label: "I'm inverted",
    children: <Button>Hover me</Button>,
  },
};

export default {
  title: 'UI Components/Tooltip',
  component: Tooltip,
  decorators: [StoryDecorator({ margin: '340px 100px' })],
} as TooltipMeta;
