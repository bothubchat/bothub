import { useCallback, useEffect, useRef, useState } from 'react';
import { getSupportedAudioMimeType, getWaveData } from '@/ui/utils';
import { IInputMessageVoiceFile } from './types';

interface UseVoiceProps {
  onVoiceFilesChange?: (files: IInputMessageVoiceFile[]) => unknown;
}

export const useVoice = ({ onVoiceFilesChange }: UseVoiceProps) => {
  const voiceMediaRecorderRef = useRef<MediaRecorder | null>(null);
  const voiceMediaStreamRef = useRef<MediaStream | null>(null);
  const voiceChunksRef = useRef<Blob[]>([]);
  const voiceTimerRef = useRef<number | null>(null);
  const voicePressedRef = useRef(false);

  const [voiceFiles, setVoiceFiles] = useState<IInputMessageVoiceFile[]>([]);
  const [isVoiceRecording, setIsVoiceRecording] = useState(false);
  const [isVoicePaused, setIsVoicePaused] = useState(false);
  const [voiceRecordingTime, setVoiceRecordingTime] = useState<number | null>(
    null,
  );

  const handleVoiceRecordStart = useCallback<React.ReactEventHandler>(
    async (event) => {
      if (isVoiceRecording) return;

      voicePressedRef.current = true;
      event.stopPropagation();

      const mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      const mediaRecorder = new MediaRecorder(mediaStream, {
        mimeType: getSupportedAudioMimeType(),
      });

      if (!voicePressedRef.current) {
        return;
      }

      mediaRecorder.start(1000);

      voiceMediaRecorderRef.current = mediaRecorder;
      voiceMediaStreamRef.current = mediaStream;
      voiceTimerRef.current = window.setInterval(() => {
        setVoiceRecordingTime((recordingTime) => (recordingTime ?? 0) + 0.1);
      }, 100);

      setIsVoiceRecording(true);
      setVoiceRecordingTime(0);
      setIsVoicePaused(false);
    },
    [voicePressedRef.current, voiceChunksRef.current, isVoiceRecording],
  );

  const stopVoiceRecording = useCallback(() => {
    const mediaRecorder = voiceMediaRecorderRef.current;
    const mediaStream = voiceMediaStreamRef.current;
    const timer = voiceTimerRef.current;

    if (!isVoiceRecording || !mediaRecorder || !mediaStream || !timer) {
      return;
    }

    mediaRecorder.stop();
    for (const track of mediaStream.getTracks()) {
      track.stop();
    }

    window.clearInterval(timer);
  }, [
    isVoiceRecording,
    voiceMediaRecorderRef.current,
    voiceMediaStreamRef.current,
    voiceTimerRef.current,
  ]);

  const handleVoiceRecordEnd = useCallback(async () => {
    voicePressedRef.current = false;

    if (!isVoiceRecording) {
      return;
    }

    stopVoiceRecording();
  }, [isVoiceRecording, stopVoiceRecording]);

  const handleVoicePause = useCallback(() => {
    const mediaRecorder = voiceMediaRecorderRef.current;
    const timer = voiceTimerRef.current;

    if (!isVoiceRecording || !mediaRecorder || !timer) {
      return;
    }

    mediaRecorder.pause();
    window.clearInterval(timer);
    setIsVoicePaused(true);
  }, [isVoiceRecording]);

  const handleVoiceResume = useCallback(() => {
    const mediaRecorder = voiceMediaRecorderRef.current;

    if (!isVoiceRecording || !mediaRecorder) {
      return;
    }

    mediaRecorder.resume();
    voiceTimerRef.current = window.setInterval(() => {
      setVoiceRecordingTime((recordingTime) => (recordingTime ?? 0) + 0.1);
    }, 100);
    setIsVoicePaused(false);
  }, [isVoiceRecording, setVoiceRecordingTime]);

  const handleVoiceFileDelete = useCallback(
    (file: IInputMessageVoiceFile) => {
      setVoiceFiles(voiceFiles.filter((f) => f.src !== file.src));
    },
    [voiceFiles, setVoiceFiles],
  );

  useEffect(() => {
    const mediaRecorder = voiceMediaRecorderRef.current;

    const dataAvailableListener = (event: BlobEvent) => {
      if (event.data.size > 0) {
        voiceChunksRef.current.push(event.data);
      }
    };
    const stopListener = async () => {
      const blob = new Blob(voiceChunksRef.current, {
        type: getSupportedAudioMimeType(),
      });

      const { waveData, duration } = await getWaveData(blob);

      const newVoiceFile = {
        src: URL.createObjectURL(blob),
        duration,
        blob,
        waveData,
      };

      setVoiceFiles([...voiceFiles, newVoiceFile]);

      voiceMediaRecorderRef.current = null;
      voiceMediaStreamRef.current = null;
      voiceChunksRef.current = [];
      voiceTimerRef.current = null;

      setIsVoiceRecording(false);
      setVoiceRecordingTime(null);
    };

    if (mediaRecorder) {
      mediaRecorder.addEventListener('dataavailable', dataAvailableListener);
      mediaRecorder.addEventListener('stop', stopListener);
    }

    return () => {
      if (mediaRecorder) {
        mediaRecorder.removeEventListener(
          'dataavailable',
          dataAvailableListener,
        );
        mediaRecorder.removeEventListener('stop', stopListener);
      }

      stopVoiceRecording();
    };
  }, [voiceMediaRecorderRef.current]);

  useEffect(() => {
    onVoiceFilesChange?.(voiceFiles);
  }, [voiceFiles]);

  return {
    voiceFiles,
    setVoiceFiles,
    isVoiceRecording,
    isVoicePaused,
    voiceRecordingTime,
    handleVoiceRecordStart,
    handleVoiceRecordEnd,
    handleVoicePause,
    handleVoiceResume,
    handleVoiceFileDelete,
  };
};
