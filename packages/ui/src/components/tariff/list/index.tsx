import React from 'react';
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
import { ArrowNarrowLeftIcon } from '@/ui/icons/arrow-narrow-left';
import { ArrowNarrowRightIcon } from '@/ui/icons/arrow-narrow-right';
import { TariffsVariant } from './types';
import { useCarousel } from '@/ui/utils/useCarousel';

export interface TariffsProps extends React.PropsWithChildren {
  variant?: TariffsVariant;
}

export const Tariffs: React.FC<TariffsProps> = ({
  variant = 'default',
  children
}) => {
  const { goPrev, goNext, isPrevAllowed, isNextAllowed, carouselProps } =
    useCarousel({
      slidesCount: React.Children.toArray(children).length
    });

  return (
    <TariffsStyled>
      <TariffSlider>
        <TariffSliderContent>
          <TariffSlideList {...carouselProps}>{children}</TariffSlideList>
          <TariffSliderShadows>
            <TariffSliderLeftShadow
              $variant={variant}
              $hidden={!isPrevAllowed}
            />
            <TariffSliderRightShadow
              $variant={variant}
              $hidden={!isNextAllowed}
            />
          </TariffSliderShadows>
        </TariffSliderContent>
        <TariffSliderActions>
          <Button
            corner="rounded"
            size="small"
            aria-label="Prev Slide Button"
            disabled={!isPrevAllowed}
            onClick={goPrev}
          >
            <ArrowNarrowLeftIcon />
          </Button>
          <Button
            corner="rounded"
            size="small"
            aria-label="Next Slide Button"
            disabled={!isNextAllowed}
            onClick={goNext}
          >
            <ArrowNarrowRightIcon />
          </Button>
        </TariffSliderActions>
      </TariffSlider>
      <TariffDesktopList $variant={variant}>{children}</TariffDesktopList>
    </TariffsStyled>
  );
};

export * from './types';
