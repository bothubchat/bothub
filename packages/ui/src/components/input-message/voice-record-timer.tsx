import React, { memo, useEffect, useState } from 'react';
import { formatSeconds } from '@/ui/utils';
import {
  InputMessageVoiceRecord,
  InputMessageVoiceRecordDot,
  InputMessageVoiceRecordTimeText,
} from './styled';

export interface InputMessageVoiceRecordTimerProps {
  paused: boolean;
  /** Секунды записи без пауз */
  getRecordingTime: () => number;
}

/**
 * Таймер записи отдельным компонентом: раз в секунду перерисовывается только
 * он, а не весь InputMessage
 */
export const InputMessageVoiceRecordTimer: React.FC<InputMessageVoiceRecordTimerProps> =
  memo(({ paused, getRecordingTime }) => {
    const [seconds, setSeconds] = useState(() =>
      Math.floor(getRecordingTime()),
    );

    useEffect(() => {
      const updateSeconds = () => {
        setSeconds(Math.floor(getRecordingTime()));
      };

      updateSeconds();

      if (paused) return;

      const timer = window.setInterval(updateSeconds, 100);

      return () => {
        window.clearInterval(timer);
      };
    }, [paused, getRecordingTime]);

    return (
      <InputMessageVoiceRecord>
        <InputMessageVoiceRecordDot />
        <InputMessageVoiceRecordTimeText>
          {formatSeconds(seconds)}
        </InputMessageVoiceRecordTimeText>
      </InputMessageVoiceRecord>
    );
  });
