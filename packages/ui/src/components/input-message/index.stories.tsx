import type { Meta, StoryObj } from '@storybook/react-vite';
import { InputMessage } from '.';
import { StoryDecorator } from '@/ui/story-decorator';
import { Button } from '../button';
import { QueueIcon } from '@/ui/icons';

export type InputMessageMeta = Meta<typeof InputMessage>;

export type InputMessageStory = StoryObj<typeof InputMessage>;

export const Basic: InputMessageStory = {
  args: { onVoiceFilesChange: () => {}, uploadFileLimit: 100 },
};

export const Voice: InputMessageStory = {
  args: { ...Basic.args, voice: true },
};

export const UploadFileDisabled: InputMessageStory = {
  args: { ...Basic.args, uploadFileDisabled: true },
};

export const Disabled: InputMessageStory = {
  ...Basic.args,
  args: { disabled: true },
};

/** Отправка по Enter, новая строка: Ctrl+Enter / Cmd+Enter, Shift+Enter — перенос */
export const SubmitOnEnter: InputMessageStory = {
  args: {
    ...Basic.args,
    messageSubmitKey: 'enter',
  },
};

/** Отправка по Ctrl+Enter / Cmd+Enter, новая строка: Enter, Shift+Enter — перенос */
export const SubmitOnCtrlEnter: InputMessageStory = {
  args: {
    ...Basic.args,
    messageSubmitKey: 'ctrlEnter',
    actions: (
      <Button
        variant="text"
        startIcon={<QueueIcon />}
        iconSize={24}
      />
    ),
  },
};

export default {
  title: 'Components/Message/Input',
  component: InputMessage,
  decorators: [StoryDecorator()],
  args: { placeholder: 'Спроси о чем-нибудь...' },
} as InputMessageMeta;
