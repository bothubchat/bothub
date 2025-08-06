import React, { useEffect } from 'react';
import { useTransition } from '@react-spring/web';
import {
  HeaderMenuContent,
  HeaderMenuOpenGlobalStyle,
  HeaderMenuStyled,
} from './styled';
import { useHeader } from '../context';
import { HeaderMenuProvider } from './context';

export interface HeaderMenuProps extends React.PropsWithChildren {
  isPreset?: boolean;
}

export const HeaderMenu: React.FC<HeaderMenuProps> = ({
  isPreset,
  children,
}) => {
  const { variant, isMenuOpen } = useHeader();

  useEffect(() => {
    if (isMenuOpen) {
      window.scrollTo({
        top: 0,
      });
    }
  }, [isMenuOpen]);

  const w =
    typeof window !== 'undefined'
      ? window
      : {
          innerHeight: 1920,
        };
  const menuTransition = useTransition(isMenuOpen, {
    from: {
      opacity: 0,
      transform: `translateY(${-w.innerHeight}px)`,
    },
    enter: {
      opacity: 1,
      transform: 'translateY(0px)',
    },
    leave: {
      opacity: 0,
      transform: `translateY(${-w.innerHeight}px)`,
    },
    config: { duration: 150 },
  });

  return (
    <HeaderMenuProvider isInMenu>
      {isMenuOpen && <HeaderMenuOpenGlobalStyle />}
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
          ),
      )}
    </HeaderMenuProvider>
  );
};

export * from './context';
export * from './toggle-button';
