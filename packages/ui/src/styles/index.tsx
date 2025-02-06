import React, { useEffect } from 'react';
import { BothubGlobalStyleStyled } from './styled';
import { BothubScaleGlobalStyle, BothubScaleVariant } from './scale';

export interface BothubGlobalStyleProps {
  margin?: string;
  scale?: BothubScaleVariant | null;
}

export const BothubGlobalStyle: React.FC<BothubGlobalStyleProps> = ({
  margin,
  scale = null
}) => {
  useEffect(() => {
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
