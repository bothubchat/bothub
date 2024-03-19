import React, {
  useCallback, useRef, useState, useEffect 
} from 'react';
import { Swiper as ReactSwiper, SwiperRef, SwiperSlide } from 'swiper/react';
import Swiper from 'swiper';
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

export interface ImageFullScreenProps extends React.ComponentProps<'div'> {
  open: boolean;
  data: ImageFullScreenData;
  item?: string | ImageFullScreenDataItem;
  author?: React.ReactNode;
  toolbar?: React.ReactNode;
  onClose?: ImageFullScreenCloseEventHandler;
}

export const ImageFullScreen: React.FC<ImageFullScreenProps> = ({
  open, data, item, author, toolbar, onClose
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
  }, []);

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
                  {data.length === 1 && (
                    <ImageFullScreenImage
                      src={data[0].url}
                      width={data[0].width}
                      height={data[0].height}
                      alt={data[0].name}
                    />
                  )}
                  {data.length > 1 && (
                    <ImageFullScreenSwiper>
                      <ReactSwiper
                        ref={sliderRef}
                        initialSlide={activeSlideIndex}
                        spaceBetween={0}
                        onSlideChange={handleSlideChange}
                      >
                        {data.map((item) => (
                          <SwiperSlide
                            key={item.id ?? item.url}
                          >
                            <ImageFullScreenImage
                              src={item.url}
                              width={item.width}
                              height={item.height}
                              alt={item.name}
                            />
                          </SwiperSlide>
                        ))}
                      </ReactSwiper>
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
                    </ImageFullScreenSwiper>
                  )}
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
