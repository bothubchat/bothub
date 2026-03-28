import React from 'react';

export interface IInputMessageFile {
  imageId?: string;
  voiceId?: string;
  videoId?: string;
  attachmentId?: string;
  name: string;
  previewUrl: string | null;
  native: File;
}

export interface IInputMessageVoiceFile {
  duration: number;
  waveData: number[];
  src: string;
  blob: Blob;
}

export interface EditingProps {
  editingTitle?: string;
  isEditing?: boolean;
  editString?: string;
  editFiles?: string;
  resetEdit?: () => void;
}

export interface IConfigureOption {
  icon?: React.ReactNode;
  children?: React.ReactNode;
  onClick?: () => unknown;
}

export type InputMessageErrorEvent = { name: 'WRONG_FILES'; payload: File[] };
