import React from 'react';
import { BothubGlobalStyleStyled } from './styled';
import { BothubScaleGlobalStyle, BothubScaleVariant } from './scale';
import { useIsomorphicLayoutEffect } from '@/ui/utils/useIsomorphicLayoutEffect';

export interface BothubGlobalStyleProps {
  margin?: string;
  scale?: BothubScaleVariant | null;
}

export const BothubGlobalStyle: React.FC<BothubGlobalStyleProps> = ({
  margin,
  scale = null,
}) => {
  // A layout effect, so that the variable is set before the children read
  // the layout: setting it later restyles the whole page once more
  useIsomorphicLayoutEffect(() => {
    const resizeListener = () => {
      const height = window.innerHeight * 0.01;

      document.documentElement.style.setProperty('--bothub-vh', `${height}px`);
    };

    resizeListener();
    window.addEventListener('resize', resizeListener);

    return () => {
      window.removeEventListener('resize', resizeListener);
    };
  }, []);

  return (
    <>
      <BothubGlobalStyleStyled $margin={margin} />
      {scale !== null && <BothubScaleGlobalStyle variant={scale} />}
    </>
  );
};

export * from './manager';
export * from './scale';
