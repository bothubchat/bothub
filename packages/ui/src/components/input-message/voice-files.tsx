import React, { memo } from 'react';
import { MessageVoice } from '../message';
import { IInputMessageVoiceFile } from './types';
import {
  InputMessageVoiceFileDelete,
  InputMessageVoiceFiles,
  InputMessageVoiceTrack,
} from './styled';

interface InputMessageVoiceFileProps {
  file: IInputMessageVoiceFile;
  onDelete: (file: IInputMessageVoiceFile) => void;
  deleteVoiceAriaLabel?: string;
}

const InputMessageVoiceFile: React.FC<InputMessageVoiceFileProps> = memo(
  ({ file, onDelete, deleteVoiceAriaLabel }) => (
    <InputMessageVoiceTrack>
      <MessageVoice
        variant="input"
        height={18}
        src={file.src}
        duration={file.duration}
        waveData={file.waveData}
        disableTranscription
      />
      <InputMessageVoiceFileDelete
        aria-label={deleteVoiceAriaLabel}
        onClick={() => onDelete(file)}
      />
    </InputMessageVoiceTrack>
  ),
);

export interface InputMessageVoiceFileListProps {
  voiceFiles: IInputMessageVoiceFile[];
  onDelete: (file: IInputMessageVoiceFile) => void;
  deleteVoiceAriaLabel?: string;
}

/** Плееры голосовых не перерисовываются, пока пользователь печатает */
export const InputMessageVoiceFileList: React.FC<InputMessageVoiceFileListProps> =
  memo(({ voiceFiles, onDelete, deleteVoiceAriaLabel }) => {
    if (voiceFiles.length === 0) {
      return null;
    }

    return (
      <InputMessageVoiceFiles>
        {voiceFiles.map((file) => (
          <InputMessageVoiceFile
            key={file.src}
            file={file}
            onDelete={onDelete}
            deleteVoiceAriaLabel={deleteVoiceAriaLabel}
          />
        ))}
      </InputMessageVoiceFiles>
    );
  });
