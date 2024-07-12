import React, {
  useCallback, useRef, useState, useEffect 
} from 'react';
import { Swiper as ReactSwiper, SwiperRef, SwiperSlide } from 'swiper/react';
import Swiper from 'swiper';
import PhotoSwipeLightbox from 'photoswipe/lightbox';
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
import 'photoswipe/style.css';
import { useTheme } from '@/ui/theme';

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
  const galRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const [isLoaded, setIsLoaded] = useState(false);

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

  useEffect(() => {
    if (isLoaded) {
      const lightbox = new PhotoSwipeLightbox({
        gallery: galRef.current as HTMLDivElement,
        children: 'a',
        pswpModule: () => import('photoswipe'),
        zoomSVG: `<svg viewBox="0 0 24 25" width="24" height="24" fill="none" class="sc-hLclGa UXzUv"><path d="M21.6935 20.4925L17.1596 15.9586C18.2511 14.5054 18.8404 12.7367 18.8384 10.9192C18.8384 6.27688 15.0615 2.5 10.4192 2.5C5.77688 2.5 2 6.27688 2 10.9192C2 15.5615 5.77688 19.3384 10.4192 19.3384C12.2367 19.3404 14.0054 18.7511 15.4586 17.6596L19.9925 22.1935C20.222 22.3986 20.5213 22.5081 20.829 22.4995C21.1367 22.4909 21.4295 22.3648 21.6472 22.1472C21.8648 21.9295 21.9909 21.6367 21.9995 21.329C22.0081 21.0213 21.8986 20.722 21.6935 20.4925ZM4.40549 10.9192C4.40549 9.7298 4.75818 8.56711 5.41898 7.57816C6.07977 6.58921 7.01899 5.81842 8.11785 5.36325C9.21671 4.90809 10.4259 4.789 11.5924 5.02104C12.759 5.25308 13.8305 5.82583 14.6715 6.66686C15.5126 7.50789 16.0853 8.57944 16.3174 9.74598C16.5494 10.9125 16.4303 12.1217 15.9751 13.2205C15.52 14.3194 14.7492 15.2586 13.7602 15.9194C12.7713 16.5802 11.6086 16.9329 10.4192 16.9329C8.82485 16.931 7.29635 16.2968 6.16897 15.1694C5.0416 14.0421 4.4074 12.5135 4.40549 10.9192Z" fill=${theme.colors.accent.primaryLight}></path></svg>`,
        closeSVG: `<svg viewBox="0 0 18 18" width="18" height="18" fill="none" class="sc-hLclGa gXkPin"><path d="M15.6899 2.32071C15.5917 2.22227 15.475 2.14417 15.3465 2.09089C15.2181 2.0376 15.0803 2.01017 14.9413 2.01017C14.8022 2.01017 14.6645 2.0376 14.536 2.09089C14.4076 2.14417 14.2909 2.22227 14.1926 2.32071L9 7.50274L3.80736 2.31009C3.70905 2.21178 3.59233 2.1338 3.46388 2.08059C3.33543 2.02738 3.19776 2 3.05873 2C2.91969 2 2.78202 2.02738 2.65357 2.08059C2.52512 2.1338 2.40841 2.21178 2.31009 2.31009C2.21178 2.40841 2.1338 2.52512 2.08059 2.65357C2.02738 2.78202 2 2.91969 2 3.05873C2 3.19776 2.02738 3.33543 2.08059 3.46388C2.1338 3.59233 2.21178 3.70905 2.31009 3.80736L7.50274 9L2.31009 14.1926C2.21178 14.291 2.1338 14.4077 2.08059 14.5361C2.02738 14.6646 2 14.8022 2 14.9413C2 15.0803 2.02738 15.218 2.08059 15.3464C2.1338 15.4749 2.21178 15.5916 2.31009 15.6899C2.40841 15.7882 2.52512 15.8662 2.65357 15.9194C2.78202 15.9726 2.91969 16 3.05873 16C3.19776 16 3.33543 15.9726 3.46388 15.9194C3.59233 15.8662 3.70905 15.7882 3.80736 15.6899L9 10.4973L14.1926 15.6899C14.291 15.7882 14.4077 15.8662 14.5361 15.9194C14.6646 15.9726 14.8022 16 14.9413 16C15.0803 16 15.218 15.9726 15.3464 15.9194C15.4749 15.8662 15.5916 15.7882 15.6899 15.6899C15.7882 15.5916 15.8662 15.4749 15.9194 15.3464C15.9726 15.218 16 15.0803 16 14.9413C16 14.8022 15.9726 14.6646 15.9194 14.5361C15.8662 14.4077 15.7882 14.291 15.6899 14.1926L10.4973 9L15.6899 3.80736C16.0934 3.40384 16.0934 2.72423 15.6899 2.32071Z" fill=${theme.colors.accent.primaryLight}></path></svg>`,
      });
      lightbox.init();
    }
  }, [isLoaded, theme]);

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
                    <div ref={galRef}>
                      <a
                        href={data[0].url}
                        data-pswp-width={data[0].width}
                        data-pswp-height={data[0].height}
                        data-cropped="true"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <ImageFullScreenImage
                          onLoad={() => setIsLoaded(true)}
                          src={data[0].url}
                          width={data[0].width}
                          height={data[0].height}
                          alt={data[0].name}
                        />
                      </a>
                    </div>
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
