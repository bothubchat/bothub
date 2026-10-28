import React, { useContext, useMemo } from 'react';
import { ImageFullScreenData, ImageFullScreenDataItem } from './types';

export interface ImageFullScreenContextValue {
  data: ImageFullScreenData;
  activeItem: ImageFullScreenDataItem | null;
}

export const ImageFullScreenContext =
  React.createContext<ImageFullScreenContextValue>({
    data: [],
    activeItem: null,
  });

export const ImageFullScreenProvider: React.FC<
  ImageFullScreenContextValue & React.PropsWithChildren
> = ({ children, data, activeItem }) => {
  const value = useMemo(() => ({ data, activeItem }), [data, activeItem]);

  return (
    <ImageFullScreenContext.Provider value={value}>
      {children}
    </ImageFullScreenContext.Provider>
  );
};

export const useImageFullScreen = () => useContext(ImageFullScreenContext);
