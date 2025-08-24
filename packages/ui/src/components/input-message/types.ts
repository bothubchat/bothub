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
