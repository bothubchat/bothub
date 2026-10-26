import type { Meta, StoryObj } from '@storybook/react-vite';
import { useEffect, useState } from 'react';
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

// Пустой WAV: показать записанные голосовые без микрофона
const emptyWav =
  'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=';

const recordedVoice = (duration: number, waveData: number[]) => ({
  src: `${emptyWav}#${duration}`,
  blob: new Blob([], { type: 'audio/wav' }),
  duration,
  waveData,
});

/** Голосовые передаёт родитель (`voiceFiles`): так их можно вернуть в поле после ошибки отправки */
export const VoiceFiles: InputMessageStory = {
  args: {
    ...Voice.args,
    concatenateText: 'Голосовые будут объединены в одно сообщение',
    voiceFiles: [
      recordedVoice(4, [0.2, 0.5, 0.8, 0.4, 0.6, 0.3, 0.7, 0.2]),
      recordedVoice(9, [0.4, 0.3, 0.6, 0.9, 0.5, 0.2, 0.4, 0.6]),
    ],
  },
};

export const UploadFileDisabled: InputMessageStory = {
  args: { ...Basic.args, uploadFileDisabled: true },
};

export const Disabled: InputMessageStory = {
  args: { ...Basic.args, disabled: true },
};

/**
 * После отправки поле заблокировано 1,5 с, как в чате до ответа сервера.
 * Отправьте сообщение Enter'ом или кнопкой и печатайте дальше без клика по полю
 */
export const FocusAfterSending: InputMessageStory = {
  args: { ...Basic.args, autoFocus: false },
  render: (args) => {
    const [message, setMessage] = useState('');
    const [disabled, setDisabled] = useState(false);

    useEffect(() => {
      if (!disabled) return;

      const timeout = window.setTimeout(() => setDisabled(false), 1500);
      return () => window.clearTimeout(timeout);
    }, [disabled]);

    return (
      <InputMessage
        {...args}
        message={message}
        disabled={disabled}
        onChange={setMessage}
        onSend={() => {
          setMessage('');
          setDisabled(true);
        }}
      />
    );
  },
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

export const SendAddon: InputMessageStory = {
  args: {
    ...Basic.args,
    sendAddon: '≈ 1 200 CAPS',
  },
};

/** sendWarning показывается всегда, sendDisabledReason — только после попытки отправить */
export const SendWarning: InputMessageStory = {
  args: {
    ...Basic.args,
    sendAddon: '≈ 1 200 CAPS',
    sendDisabled: true,
    sendWarning: 'Не хватает CAPS: уменьшите длительность или пополните баланс',
  },
};

/** Нажмите Enter: сообщение не отправится, перенос строки не добавится, появится причина */
export const SendDisabledReason: InputMessageStory = {
  args: {
    ...Basic.args,
    sendDisabled: true,
    sendDisabledReason: 'Сохраняем настройки чата…',
  },
};

/** Предыдущее сообщение отправляется: в кнопке лоадер, а следующее можно набирать */
export const SendLoading: InputMessageStory = {
  args: {
    ...Basic.args,
    sendLoading: true,
    sendDisabledReason: 'Отправляем предыдущее сообщение…',
  },
};

export default {
  title: 'Components/Message/Input',
  component: InputMessage,
  decorators: [StoryDecorator()],
  args: { placeholder: 'Спроси о чем-нибудь...' },
} as InputMessageMeta;
