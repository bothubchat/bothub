import React, { useCallback, useEffect, useState } from 'react';
import { Portal } from '@/ui/components/portal';
import {
  ImageFullScreenBackdrop,
  ImageFullScreenCarousel,
  ImageFullScreenCarouselButtons,
  ImageFullScreenCarouselContainer,
  ImageFullScreenCarouselNextButton,
  ImageFullScreenCarouselPrevButton,
  ImageFullScreenContainer,
  ImageFullScreenContent,
  ImageFullScreenImage,
  ImageFullScreenMain,
  ImageFullScreenPreview,
  ImageFullScreenPreviewImage,
  ImageFullScreenPreviewImages,
  ImageFullScreenSlide,
  ImageFullScreenStyled,
  ImageFullScreenTopBlock,
  ImageFullScreenTopBlockContent,
} from './styled';
import { ImageFullScreenData, ImageFullScreenDataItem } from './types';
import { ImageFullScreenProvider } from './context';
import { useCarousel } from '../../utils/useCarousel';

export type ImageFullScreenCloseEventHandler = () => unknown;

export type ImageFullScreenChangeEventHandler = (
  item: ImageFullScreenDataItem,
) => unknown;

export interface ImageFullScreenProps
  extends Omit<React.ComponentProps<'div'>, 'onChange'> {
  open: boolean;
  data: ImageFullScreenData;
  item?: string | ImageFullScreenDataItem;
  author?: React.ReactNode;
  toolbar?: React.ReactNode;
  onChange?: ImageFullScreenChangeEventHandler;
  onClose?: ImageFullScreenCloseEventHandler;
}

export const ImageFullScreen: React.FC<ImageFullScreenProps> = ({
  open,
  data,
  item,
  author,
  toolbar,
  onChange,
  onClose,
}) => {
  const [isZooming, setIsZooming] = useState(false);

  const handleSlideChange = useCallback(
    (newIndex: number) => {
      onChange?.(data[newIndex]);
    },
    [onChange, data],
  );

  const {
    activeSlideIndex,
    isPrevAllowed,
    isNextAllowed,
    goPrev,
    goNext,
    goToSlide,
    carouselProps,
  } = useCarousel({
    slidesCount: data.length,
    onSlideChange: handleSlideChange,
    enableSwipes: !isZooming,
    defaultIndex: () => {
      if (!item) {
        return 0;
      }

      return (
        data.findIndex(
          ({ id }) => id === (typeof item === 'object' ? item.id : item),
        ) ?? 0
      );
    },
  });
  const activeItem: ImageFullScreenDataItem = data[activeSlideIndex] ?? null;

  useEffect(() => {
    if (open) {
      const keyDownListener = (event: KeyboardEvent) => {
        switch (event.code) {
          case 'ArrowLeft':
            goPrev();
            break;
          case 'ArrowRight':
            goNext();
            break;
        }
      };

      document.addEventListener('keydown', keyDownListener);

      return () => {
        document.removeEventListener('keydown', keyDownListener);
      };
    }
  }, [open, goPrev, goNext]);

  return (
    <ImageFullScreenProvider
      data={data}
      activeItem={activeItem}
    >
      {open && (
        <Portal>
          <ImageFullScreenStyled>
            <ImageFullScreenBackdrop
              open={open}
              onClick={onClose}
            />
            <ImageFullScreenContainer>
              <ImageFullScreenContent>
                {(author || toolbar) && (
                  <ImageFullScreenTopBlock>
                    <ImageFullScreenTopBlockContent>
                      {author}
                      {toolbar}
                    </ImageFullScreenTopBlockContent>
                  </ImageFullScreenTopBlock>
                )}
                <ImageFullScreenMain>
                  <ImageFullScreenCarousel>
                    <ImageFullScreenCarouselContainer {...carouselProps}>
                      {data.map((item) => (
                        <ImageFullScreenSlide key={item.id ?? item.url}>
                          <ImageFullScreenImage
                            imageProps={{
                              src: item.url,
                              alt: item.name,
                              width: item.width,
                              height: item.height,
                              loading: 'skeleton',
                            }}
                            onZoomStart={setIsZooming.bind(null, true)}
                            onZoomEnd={setIsZooming.bind(null, false)}
                          />
                        </ImageFullScreenSlide>
                      ))}
                    </ImageFullScreenCarouselContainer>

                    {data.length > 1 && !isZooming && (
                      <ImageFullScreenCarouselButtons
                        $imageWidth={activeItem.width}
                      >
                        <ImageFullScreenCarouselPrevButton
                          disabled={!isPrevAllowed}
                          onClick={goPrev}
                        />
                        <ImageFullScreenCarouselNextButton
                          disabled={!isNextAllowed}
                          onClick={goNext}
                        />
                      </ImageFullScreenCarouselButtons>
                    )}
                  </ImageFullScreenCarousel>

                  {data.length > 1 && (
                    <ImageFullScreenPreview>
                      <ImageFullScreenPreviewImages>
                        {data.map((item, index) => (
                          <ImageFullScreenPreviewImage
                            $active={item === activeItem}
                            key={item.id ?? item.previewUrl ?? item.url}
                            src={item.previewUrl ?? item.url}
                            width={item.previewWidth ?? item.width}
                            height={item.previewHeight ?? item.height}
                            alt={item.name}
                            onClick={goToSlide.bind(null, index)}
                          />
                        ))}
                      </ImageFullScreenPreviewImages>
                    </ImageFullScreenPreview>
                  )}
                </ImageFullScreenMain>
              </ImageFullScreenContent>
            </ImageFullScreenContainer>
          </ImageFullScreenStyled>
        </Portal>
      )}
    </ImageFullScreenProvider>
  );
};

export * from './types';
export * from './context';
export * from './styled';
