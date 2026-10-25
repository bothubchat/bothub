import { useCallback, useEffect, useRef, useState } from 'react';
import {
  getSupportedAudioMimeType,
  getWaveData,
  useEventCallback,
} from '@/ui/utils';
import { IInputMessageVoiceFile } from './types';

interface UseVoiceProps {
  initialVoiceFiles?: IInputMessageVoiceFile[];
  onVoiceFilesChange?: (files: IInputMessageVoiceFile[]) => unknown;
}

type VoiceStatus = 'idle' | 'starting' | 'recording' | 'stopping';

const VOICE_WAVE_SEGMENTS = 30;

const releaseMediaStream = (mediaStream: MediaStream) => {
  for (const track of mediaStream.getTracks()) {
    track.stop();
  }
};

export const useVoice = ({
  initialVoiceFiles,
  onVoiceFilesChange,
}: UseVoiceProps) => {
  const voiceMediaRecorderRef = useRef<MediaRecorder | null>(null);
  const voiceMediaStreamRef = useRef<MediaStream | null>(null);
  const voicePressedRef = useRef(false);
  // Запись идёт через await (разрешение, декодирование): статус в ref,
  // чтобы двойной клик не создал второй рекордер
  const voiceStatusRef = useRef<VoiceStatus>('idle');
  const isMountedRef = useRef(false);
  // objectURL, созданные здесь: освобождаем их, когда голосовое удаляют
  const ownVoiceUrlsRef = useRef(new Set<string>());
  // Время записи без пауз: таймер и запасная длительность
  const recordedMsRef = useRef(0);
  const resumedAtRef = useRef<number | null>(null);

  const [innerVoiceFiles, setInnerVoiceFiles] = useState<
    IInputMessageVoiceFile[]
  >([]);
  // Как с message и files: если передан проп, голосовыми управляет родитель
  // и может вернуть их, например, после ошибки отправки
  const isControlled = Array.isArray(initialVoiceFiles);
  const isControlledRef = useRef(isControlled);
  isControlledRef.current = isControlled;
  const voiceFiles = isControlled ? initialVoiceFiles : innerVoiceFiles;
  // Запись дописывается по stop, а список мог смениться за время записи
  // (например, родитель вернул голосовые после ошибки отправки)
  const voiceFilesRef = useRef(voiceFiles);
  voiceFilesRef.current = voiceFiles;
  const setVoiceFiles = useEventCallback((files: IInputMessageVoiceFile[]) => {
    if (isControlled) {
      onVoiceFilesChange?.(files);
      return;
    }

    setInnerVoiceFiles(files);
  });
  const [isVoiceRecording, setIsVoiceRecording] = useState(false);
  const [isVoicePaused, setIsVoicePaused] = useState(false);
  const [isVoiceStopping, setIsVoiceStopping] = useState(false);

  const pauseRecordingClock = useCallback(() => {
    if (resumedAtRef.current !== null) {
      recordedMsRef.current += Date.now() - resumedAtRef.current;
      resumedAtRef.current = null;
    }
  }, []);

  const getVoiceRecordingTime = useCallback(() => {
    const runningMs =
      resumedAtRef.current !== null ? Date.now() - resumedAtRef.current : 0;

    return (recordedMsRef.current + runningMs) / 1000;
  }, []);

  const revokeOwnVoiceUrl = useCallback((src: string) => {
    if (ownVoiceUrlsRef.current.delete(src)) {
      URL.revokeObjectURL(src);
    }
  }, []);

  const finishVoiceRecording = useEventCallback(async (chunks: Blob[]) => {
    const blob = new Blob(chunks, {
      type: getSupportedAudioMimeType(),
    });
    let voice = {
      waveData: new Array<number>(VOICE_WAVE_SEGMENTS).fill(0),
      duration: getVoiceRecordingTime(),
    };

    try {
      voice = await getWaveData(blob, VOICE_WAVE_SEGMENTS);
    } catch {
      // Браузер не декодировал запись: оставляем её без волны
    }

    voiceStatusRef.current = 'idle';

    if (!isMountedRef.current) {
      return;
    }

    const src = URL.createObjectURL(blob);
    ownVoiceUrlsRef.current.add(src);

    setVoiceFiles([
      ...voiceFilesRef.current,
      { src, duration: voice.duration, blob, waveData: voice.waveData },
    ]);
    setIsVoiceRecording(false);
    setIsVoicePaused(false);
    setIsVoiceStopping(false);
  });

  const stopVoiceRecording = useCallback(() => {
    const mediaRecorder = voiceMediaRecorderRef.current;
    const mediaStream = voiceMediaStreamRef.current;

    voiceMediaRecorderRef.current = null;
    voiceMediaStreamRef.current = null;
    pauseRecordingClock();

    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      mediaRecorder.stop();
    }
    if (mediaStream) {
      releaseMediaStream(mediaStream);
    }
  }, [pauseRecordingClock]);

  const handleVoiceRecordStart = useCallback<React.ReactEventHandler>(
    async (event) => {
      event.stopPropagation();

      if (voiceStatusRef.current !== 'idle') return;

      voiceStatusRef.current = 'starting';
      voicePressedRef.current = true;

      let mediaStream: MediaStream;
      let mediaRecorder: MediaRecorder;

      try {
        mediaStream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
      } catch {
        // Нет разрешения на микрофон или он недоступен
        voiceStatusRef.current = 'idle';
        return;
      }

      // Запись отменили или компонент размонтировали, пока браузер
      // спрашивал разрешение: выключаем микрофон
      if (!voicePressedRef.current || !isMountedRef.current) {
        releaseMediaStream(mediaStream);
        voiceStatusRef.current = 'idle';
        return;
      }

      try {
        mediaRecorder = new MediaRecorder(mediaStream, {
          mimeType: getSupportedAudioMimeType(),
        });
      } catch {
        releaseMediaStream(mediaStream);
        voiceStatusRef.current = 'idle';
        return;
      }

      const chunks: Blob[] = [];

      mediaRecorder.addEventListener('dataavailable', (blobEvent) => {
        if (blobEvent.data.size > 0) {
          chunks.push(blobEvent.data);
        }
      });
      mediaRecorder.addEventListener('stop', () => {
        finishVoiceRecording(chunks);
      });

      mediaRecorder.start(1000);

      voiceMediaRecorderRef.current = mediaRecorder;
      voiceMediaStreamRef.current = mediaStream;
      voiceStatusRef.current = 'recording';
      recordedMsRef.current = 0;
      resumedAtRef.current = Date.now();

      setIsVoiceRecording(true);
      setIsVoicePaused(false);
    },
    [finishVoiceRecording],
  );

  const handleVoiceRecordEnd = useCallback(() => {
    voicePressedRef.current = false;

    if (voiceStatusRef.current !== 'recording') {
      return;
    }

    voiceStatusRef.current = 'stopping';
    setIsVoiceStopping(true);
    stopVoiceRecording();
  }, [stopVoiceRecording]);

  const handleVoicePause = useCallback(() => {
    const mediaRecorder = voiceMediaRecorderRef.current;

    if (!mediaRecorder || mediaRecorder.state !== 'recording') {
      return;
    }

    mediaRecorder.pause();
    pauseRecordingClock();
    setIsVoicePaused(true);
  }, [pauseRecordingClock]);

  const handleVoiceResume = useCallback(() => {
    const mediaRecorder = voiceMediaRecorderRef.current;

    // Без проверки повторный resume запускал второй таймер
    if (!mediaRecorder || mediaRecorder.state !== 'paused') {
      return;
    }

    mediaRecorder.resume();
    resumedAtRef.current = Date.now();
    setIsVoicePaused(false);
  }, []);

  const handleVoiceFileDelete = useCallback(
    (file: IInputMessageVoiceFile) => {
      setVoiceFiles(voiceFilesRef.current.filter((f) => f.src !== file.src));
      revokeOwnVoiceUrl(file.src);
    },
    [setVoiceFiles, revokeOwnVoiceUrl],
  );

  useEffect(() => {
    isMountedRef.current = true;

    return () => {
      isMountedRef.current = false;
      voicePressedRef.current = false;
      stopVoiceRecording();

      // Неотправленные голосовые без родителя больше никому не нужны.
      // Голосовыми родителя (и отправленными) владеет он сам
      if (!isControlledRef.current) {
        for (const file of voiceFilesRef.current) {
          revokeOwnVoiceUrl(file.src);
        }
      }
    };
  }, [stopVoiceRecording, revokeOwnVoiceUrl]);

  useEffect(() => {
    if (!isControlled) {
      onVoiceFilesChange?.(innerVoiceFiles);
    }
  }, [innerVoiceFiles]);

  return {
    voiceFiles,
    setVoiceFiles,
    isVoiceRecording,
    isVoicePaused,
    isVoiceStopping,
    getVoiceRecordingTime,
    handleVoiceRecordStart,
    handleVoiceRecordEnd,
    handleVoicePause,
    handleVoiceResume,
    handleVoiceFileDelete,
  };
};
