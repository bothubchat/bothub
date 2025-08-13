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

export const WithAlternativeKeyModalTexts: InputMessageStory = {
  args: {
    ...Basic.args,
    defaultKeySendText: (
      <h6 style={{ margin: 0, color: '#616D8D' }}>
        <span style={{ color: '#fff' }}>Enter</span> - отправить,{' '}
        <span style={{ color: '#fff' }}>Ctrl/Shift + Enter</span> - перенос
        строки
      </h6>
    ),
    alternativeKeySendText: (
      <h6 style={{ margin: 0, color: '#616D8D' }}>
        <span style={{ color: '#fff' }}>Ctrl/Shift + Enter</span> - отправить,{' '}
        <span style={{ color: '#fff' }}>Enter</span> - перенос строки
      </h6>
    ),
    rightActions: (
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
