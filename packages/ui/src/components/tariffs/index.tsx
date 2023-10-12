import React, { useCallback, useRef } from 'react';
import { SwiperRef } from 'swiper/react';
import {
  TariffDesktopList, TariffsStyled, TariffSlider, TariffSliderActions, TariffSliderList 
} from './styled';
import { Button } from '@/ui/components/button';
import { ArrowNarrowLeftIcon, ArrowNarrowRightIcon } from '@/ui/icons';
import { TariffsVariant } from './types';

export interface TariffsProps extends React.PropsWithChildren {
  variant?: TariffsVariant;
}

export const Tariffs: React.FC<TariffsProps> = ({ 
  variant = 'default', children 
}) => {
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

  return (
    <TariffsStyled>
      <TariffDesktopList
        $variant={variant}
      >
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
    </TariffsStyled>
  );
};

export * from './types';
