import React from 'react';

export interface IInputMessageFile {
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

export interface IConfigureOption {
  icon?: React.ReactNode;
  children?: React.ReactNode;
  onClick?: () => unknown;
}
