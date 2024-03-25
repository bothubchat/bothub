export interface ImageFullScreenDataItem {
  id?: string;
  url: string;
  width: number;
  height: number;
  previewUrl?: string;
  previewWidth?: number;
  previewHeight?: number;
  name?: string;
}

export type ImageFullScreenData = ImageFullScreenDataItem[];
