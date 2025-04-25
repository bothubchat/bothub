import React, { useContext } from 'react';
import { ImageFullScreenData, ImageFullScreenDataItem } from './types';

export interface ImageFullScreenContextValue {
  data: ImageFullScreenData;
  activeItem: ImageFullScreenDataItem | null;
}

export const ImageFullScreenContext =
  React.createContext<ImageFullScreenContextValue>({
    data: [],
    activeItem: null
  });

export const ImageFullScreenProvider: React.FC<
  ImageFullScreenContextValue & React.PropsWithChildren
> = ({ children, ...value }) => (
  <ImageFullScreenContext.Provider value={value}>
    {children}
  </ImageFullScreenContext.Provider>
);

export const useImageFullScreen = () => useContext(ImageFullScreenContext);
