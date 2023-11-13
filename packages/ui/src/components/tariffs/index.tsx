import React, { useCallback, useRef, useState } from 'react';
import { SwiperRef } from 'swiper/react';
import Swiper from 'swiper';
import {
  TariffDesktopList, 
  TariffsStyled, 
  TariffSlider, 
  TariffSliderActions, 
  TariffSlideList, 
  TariffSliderContent, 
  TariffSliderShadows,
  TariffSliderLeftShadow,
  TariffSliderRightShadow
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
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const isPrev = activeIndex > 0;
  const isNext = activeIndex !== React.Children.toArray(children).length - 1;

  const handleSlideChange = useCallback((swiper: Swiper) => {
    setActiveIndex(swiper.activeIndex);
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

  return (
    <TariffsStyled>
      <TariffDesktopList
        $variant={variant}
      >
        {children}
      </TariffDesktopList>
      <TariffSlider>
        <TariffSliderContent>
          <TariffSlideList
            ref={sliderRef}
            slidesPerView="auto"
            spaceBetween={20}
            centeredSlides
            onSlideChange={handleSlideChange}
          >
            {children}
          </TariffSlideList>
          <TariffSliderShadows>
            <TariffSliderLeftShadow
              $variant={variant}
              $hidden={!isPrev}
            />
            <TariffSliderRightShadow
              $variant={variant} 
              $hidden={!isNext}
            />
          </TariffSliderShadows>
        </TariffSliderContent>
        <TariffSliderActions>
          <Button 
            corner="rounded"
            size="small" 
            aria-label="Prev Slide Button"
            disabled={!isPrev}
            onClick={handlePrev}
          >
            <ArrowNarrowLeftIcon />
          </Button>
          <Button 
            corner="rounded" 
            size="small" 
            aria-label="Next Slide Button"
            disabled={!isNext}
            onClick={handleNext}
          >
            <ArrowNarrowRightIcon />
          </Button>
        </TariffSliderActions>
      </TariffSlider>
    </TariffsStyled>
  );
};

export * from './types';
