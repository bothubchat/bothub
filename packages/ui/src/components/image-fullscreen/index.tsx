import React, { memo, useCallback, useEffect, useState } from 'react';
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
  ImageFullScreenPreviewImageWrapper,
  ImageFullScreenPreviewImages,
  ImageFullScreenSlide,
  ImageFullScreenStyled,
  ImageFullScreenTopBlock,
  ImageFullScreenTopBlockContent,
} from './styled';
import { ImageFullScreenData, ImageFullScreenDataItem } from './types';
import { ImageFullScreenProvider } from './context';
import { useCarousel, useEscapeLayer, useEventCallback } from '@/ui/utils';

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

/** Slides further than this from the active one render no image. */
const RENDERED_SLIDES_RADIUS = 1;

interface ImageFullScreenSlideContentProps {
  item: ImageFullScreenDataItem;
  isRendered: boolean;
  onZoomStart: () => void;
  onZoomEnd: () => void;
}

const ImageFullScreenSlideContent = memo(
  ({
    item,
    isRendered,
    onZoomStart,
    onZoomEnd,
  }: ImageFullScreenSlideContentProps) => (
    <ImageFullScreenSlide>
      {isRendered && (
        <ImageFullScreenImage
          imageProps={{
            src: item.url,
            alt: item.name,
            width: item.width,
            height: item.height,
            loading: 'skeleton',
          }}
          onZoomStart={onZoomStart}
          onZoomEnd={onZoomEnd}
        />
      )}
    </ImageFullScreenSlide>
  ),
);

interface ImageFullScreenThumbnailProps {
  item: ImageFullScreenDataItem;
  index: number;
  active: boolean;
  onClick: React.MouseEventHandler<HTMLImageElement>;
}

const ImageFullScreenThumbnail = memo(
  ({ item, index, active, onClick }: ImageFullScreenThumbnailProps) => (
    <ImageFullScreenPreviewImageWrapper>
      <ImageFullScreenPreviewImage
        $active={active}
        src={item.previewUrl ?? item.url}
        width={item.previewWidth ?? item.width}
        height={item.previewHeight ?? item.height}
        alt={item.name}
        lazy
        decoding="async"
        data-index={index}
        onClick={onClick}
      />
    </ImageFullScreenPreviewImageWrapper>
  ),
);

type ImageFullScreenOpenedProps = Omit<ImageFullScreenProps, 'open'>;

/*
 * Mounted only while the viewer is open, so every opening starts from the
 * `item` slide and without a zoom left over from the previous time.
 */
const ImageFullScreenOpened: React.FC<ImageFullScreenOpenedProps> = ({
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

      const itemId = typeof item === 'object' ? item.id : item;

      return Math.max(
        0,
        data.findIndex(({ id }) => id === itemId),
      );
    },
  });
  const activeItem: ImageFullScreenDataItem | null =
    data[activeSlideIndex] ?? null;

  const handleZoomStart = useCallback(() => setIsZooming(true), []);
  const handleZoomEnd = useCallback(() => setIsZooming(false), []);

  const handleClose = useEventCallback(onClose);

  const handlePreviewClick = useCallback(
    (event: React.MouseEvent<HTMLImageElement>) => {
      goToSlide(Number(event.currentTarget.dataset.index));
    },
    [goToSlide],
  );

  // Only the topmost overlay closes on Escape, e.g. not a modal underneath.
  useEscapeLayer(true, handleClose);

  useEffect(() => {
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
  }, [goPrev, goNext]);

  return (
    <ImageFullScreenProvider
      data={data}
      activeItem={activeItem}
    >
      <Portal>
        <ImageFullScreenStyled
          role="dialog"
          aria-modal="true"
        >
          <ImageFullScreenBackdrop
            open
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
                    {data.map((item, index) => (
                      <ImageFullScreenSlideContent
                        key={item.id ?? item.url}
                        item={item}
                        isRendered={
                          Math.abs(index - activeSlideIndex) <=
                          RENDERED_SLIDES_RADIUS
                        }
                        onZoomStart={handleZoomStart}
                        onZoomEnd={handleZoomEnd}
                      />
                    ))}
                  </ImageFullScreenCarouselContainer>

                  {data.length > 1 && !isZooming && (
                    <ImageFullScreenCarouselButtons
                      $imageWidth={activeItem?.width ?? 0}
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
                        <ImageFullScreenThumbnail
                          key={item.id ?? item.previewUrl ?? item.url}
                          item={item}
                          index={index}
                          active={item === activeItem}
                          onClick={handlePreviewClick}
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
    </ImageFullScreenProvider>
  );
};

export const ImageFullScreen: React.FC<ImageFullScreenProps> = ({
  open,
  ...props
}) => (open ? <ImageFullScreenOpened {...props} /> : null);

export * from './types';
export * from './context';
export * from './styled';
