import React, { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { HeaderMenuContent, HeaderMenuStyled } from './styled';
import { useHeader } from '../context';
import { HeaderMenuProvider } from './context';

export interface HeaderMenuProps extends React.PropsWithChildren {}

export const HeaderMenu: React.FC<HeaderMenuProps> = ({ children }) => {
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
      document.body.style.removeProperty('maxHeight');
    }

    return () => {
      document.body.style.removeProperty('overflow');
      document.body.style.removeProperty('maxHeight');
    };
  }, [isMenuOpen]);

  return (
    <HeaderMenuProvider 
      isInMenu
    >
      <AnimatePresence>
        {isMenuOpen && (
          <HeaderMenuStyled>
            <HeaderMenuContent
              $variant={variant}
              initial={{
                opacity: 0,
                top: -window.innerHeight
              }}
              animate={{
                opacity: 1,
                top: 0
              }}
              exit={{
                opacity: 0,
                top: -window.innerHeight
              }}
              transition={{
                duration: 0.15
              }}
            >
              {children}
            </HeaderMenuContent>
          </HeaderMenuStyled>
        )}
      </AnimatePresence>
    </HeaderMenuProvider>
  );
};

export * from './context';
export * from './toggle-button';
