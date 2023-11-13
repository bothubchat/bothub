import React, { useEffect } from 'react';
import { BothubGlobalStyleStyled } from './styled';

export interface BothubGlobalStyleProps {
  margin?: string;
}

export const BothubGlobalStyle: React.FC<BothubGlobalStyleProps> = ({
  margin
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
    <BothubGlobalStyleStyled
      $margin={margin}
    />
  );
};
