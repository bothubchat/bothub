import type { Meta, StoryObj } from '@storybook/react';
import { InputMessage } from '.';
import { StoryDecorator } from '@/ui/story-decorator';

export type InputMessageMeta = Meta<typeof InputMessage>;

export type InputMessageStory = StoryObj<typeof InputMessage>;

export const Basic: InputMessageStory = {
  args: {
    uploadFileLimit: 100
  }
};

export const Voice: InputMessageStory = {
  args: {
    voice: true
  }
};

export const UploadFileDisabled: InputMessageStory = {
  args: {
    uploadFileDisabled: true
  }
};

export const Disabled: InputMessageStory = {
  args: {
    disabled: true
  }
};

export const WithAlternativeKeyModalTexts: InputMessageStory = {
  args: {
    defaultKeySendText: (
      <h6
        style={{
          margin: 0,
          color: '#616D8D'
        }}
      >
        <span
          style={{
            color: '#fff'
          }}
        >
          Enter
        </span>{' '}
        - отправить,{' '}
        <span
          style={{
            color: '#fff'
          }}
        >
          Ctrl/Shift + Enter
        </span>{' '}
        - перенос строки
      </h6>
    ),
    alternativeKeySendText: (
      <h6
        style={{
          margin: 0,
          color: '#616D8D'
        }}
      >
        <span
          style={{
            color: '#fff'
          }}
        >
          Ctrl/Shift + Enter
        </span>{' '}
        - отправить,{' '}
        <span
          style={{
            color: '#fff'
          }}
        >
          Enter
        </span>{' '}
        - перенос строки
      </h6>
    )
  }
};

export default {
  title: 'Components/Message/Input',
  component: InputMessage,
  decorators: [StoryDecorator()],
  args: {
    placeholder: 'Спроси о чем-нибудь...'
  }
} as InputMessageMeta;
