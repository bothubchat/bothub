import React, { useEffect } from 'react';
import { useTransition } from '@react-spring/web';
import { HeaderMenuContent, HeaderMenuStyled } from './styled';
import { useHeader } from '../context';
import { HeaderMenuProvider } from './context';

export interface HeaderMenuProps extends React.PropsWithChildren {
  isPreset?: boolean;
}

export const HeaderMenu: React.FC<HeaderMenuProps> = ({
  children,
  isPreset
}) => {
  const { variant, isMenuOpen } = useHeader();

  useEffect(() => {
    if (isMenuOpen) {
      window.scrollTo({
        top: 0
      });
      document.body.style.overflow = 'hidden';
      document.body.style.maxHeight = '100vh';
    } else {
      document.body.style.removeProperty('overflow');
      document.body.style.removeProperty('max-height');
    }

    return () => {
      document.body.style.removeProperty('overflow');
      document.body.style.removeProperty('max-height');
    };
  }, [isMenuOpen]);

  const w =
    typeof window !== 'undefined'
      ? window
      : {
          innerHeight: 1920
        };
  const menuTransition = useTransition(isMenuOpen, {
    from: {
      opacity: 0,
      transform: `translateY(${-w.innerHeight}px)`
    },
    enter: {
      opacity: 1,
      transform: 'translateY(0px)'
    },
    leave: {
      opacity: 0,
      transform: `translateY(${-w.innerHeight}px)`
    },
    config: { duration: 150 }
  });

  return (
    <HeaderMenuProvider isInMenu>
      {menuTransition(
        (style, item) =>
          item && (
            <HeaderMenuStyled>
              <HeaderMenuContent
                $isPreset={isPreset}
                $variant={variant}
                style={style}
              >
                {children}
              </HeaderMenuContent>
            </HeaderMenuStyled>
          )
      )}
    </HeaderMenuProvider>
  );
};

export * from './context';
export * from './toggle-button';
