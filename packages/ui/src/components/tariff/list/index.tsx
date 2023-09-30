import React, { useCallback, useRef } from 'react';
import { TariffDesktopList, TariffListStyled, TariffSlider, TariffSliderActions, TariffSliderList } from './styled';
import { Button } from '../../button';
import { ArrowNarrowLeftIcon, ArrowNarrowRightIcon } from '../../icons';
import { SwiperRef } from 'swiper/react';

export type TariffListProps = React.PropsWithChildren;

export const TariffList: React.FC<TariffListProps> = ({ children }) => {
  const sliderRef = useRef<SwiperRef>(null);
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

  return <TariffListStyled>
    <TariffDesktopList>
      {children}
    </TariffDesktopList>
    <TariffSlider>
      <TariffSliderList
        ref={sliderRef}
        slidesPerView="auto"
        spaceBetween={20}
        centeredSlides
      >
        {children}
      </TariffSliderList>
      <TariffSliderActions>
        <Button corner="rounded" size="small" aria-label="Prev Slide Button" onClick={handlePrev}>
          <ArrowNarrowLeftIcon />
        </Button>
        <Button corner="rounded" size="small" aria-label="Next Slide Button" onClick={handleNext}>
          <ArrowNarrowRightIcon />
        </Button>
      </TariffSliderActions>
    </TariffSlider>
  </TariffListStyled>
};