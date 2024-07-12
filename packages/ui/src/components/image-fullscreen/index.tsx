import React, {
  useCallback, useRef, useState, useEffect 
} from 'react';
import { Swiper as ReactSwiper, SwiperRef, SwiperSlide } from 'swiper/react';
import Swiper from 'swiper';
import { Zoom } from 'swiper/modules';
import { Portal } from '@/ui/components/portal';
import {
  ImageFullScreenBackdrop,
  ImageFullScreenContainer,
  ImageFullScreenContent,
  ImageFullScreenImage,
  ImageFullScreenMain,
  ImageFullScreenPreview,
  ImageFullScreenPreviewImage,
  ImageFullScreenPreviewImages,
  ImageFullScreenSlideWrapper,
  ImageFullScreenStyled,
  ImageFullScreenSwiper,
  ImageFullScreenSwiperButtons,
  ImageFullScreenSwiperNextButton,
  ImageFullScreenSwiperPrevButton,
  ImageFullScreenTopBlock,
  ImageFullScreenTopBlockContent
} from './styled';
import { ImageFullScreenData, ImageFullScreenDataItem } from './types';
import { ImageFullScreenProvider } from './context';

export type ImageFullScreenCloseEventHandler = () => unknown;

export type ImageFullScreenChangeEventHandler = (item: ImageFullScreenDataItem) => unknown;

export interface ImageFullScreenProps extends Omit<React.ComponentProps<'div'>, 'onChange'> {
  open: boolean;
  data: ImageFullScreenData;
  item?: string | ImageFullScreenDataItem;
  author?: React.ReactNode;
  toolbar?: React.ReactNode;
  onChange?: ImageFullScreenChangeEventHandler;
  onClose?: ImageFullScreenCloseEventHandler;
}

export const ImageFullScreen: React.FC<ImageFullScreenProps> = ({
  open, data, item, author, toolbar, onChange, onClose
}) => {
  const sliderRef = useRef<SwiperRef>(null);

  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(() => {
    if (!item) {
      return 0;
    }

    return data.findIndex(({ id }) => (
      id === (typeof item === 'object' ? item.id : item)
    )) ?? 0;
  });
  const activeItem: ImageFullScreenDataItem = data[activeSlideIndex] ?? null;

  const isPrevAllowed = activeSlideIndex > 0;
  const isNextAllowed = activeSlideIndex !== data.length - 1;

  const handleSlideChange = useCallback((swiper: Swiper) => {
    setActiveSlideIndex(swiper.activeIndex);

    const item: ImageFullScreenDataItem | null = data.find((_, index) => (
      index === swiper.activeIndex
    )) ?? null;

    if (item) {
      onChange?.(item);
    }
  }, [data, onChange]);

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) {
      return;
    }

    sliderRef.current.swiper.slidePrev();
  }, []);
  const handleNext = useCallback(() => {
    if (!sliderRef.current) {
      return;
    }

    sliderRef.current.swiper.slideNext();
  }, []);

  const handleChange = useCallback((slideIndex: number) => {
    if (!sliderRef.current) {
      return;
    }

    sliderRef.current.swiper.slideTo(slideIndex);
  }, []);

  useEffect(() => {
    if (open) {
      const keyDownListener = (event: KeyboardEvent) => {
        if (!sliderRef.current) {
          return;
        }

        switch (event.code) {
          case 'ArrowLeft':
            sliderRef.current.swiper.slidePrev();
            break;
          case 'ArrowRight':
            sliderRef.current.swiper.slideNext();
            break;
        }
      };

      document.addEventListener('keydown', keyDownListener);

      return () => {
        document.removeEventListener('keydown', keyDownListener);
      };
    }
  }, [open]);

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
                  <ImageFullScreenSwiper>
                    <ReactSwiper
                      ref={sliderRef}
                      initialSlide={activeSlideIndex}
                      spaceBetween={0}
                      onSlideChange={handleSlideChange}
                      zoom
                      modules={[Zoom]}
                    >
                      {data.map((item) => (
                        <SwiperSlide
                          key={item.id ?? item.url}
                        >
                          <ImageFullScreenSlideWrapper className="swiper-zoom-container">
                            <ImageFullScreenImage
                              src={item.url}
                              width={item.width}
                              height={item.height}
                              alt={item.name}
                            />
                          </ImageFullScreenSlideWrapper>
                        </SwiperSlide>
                      ))}
                    </ReactSwiper>
                    {data.length > 1 && (
                      <ImageFullScreenSwiperButtons
                        $imageWidth={activeItem.width}
                      >
                        <ImageFullScreenSwiperPrevButton
                          disabled={!isPrevAllowed}
                          onClick={handlePrev}
                        />
                        <ImageFullScreenSwiperNextButton
                          disabled={!isNextAllowed}
                          onClick={handleNext}
                        />
                      </ImageFullScreenSwiperButtons>
                    )}
                  </ImageFullScreenSwiper>
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
                            onClick={handleChange.bind(null, index)}
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
