import React, {
  useCallback, useEffect, useRef, useState 
} from 'react';
import {
  HeaderAuthUserArrow,
  HeaderAuthUserBody,
  HeaderAuthUserHead, 
  HeaderAuthUserInfo, 
  HeaderAuthUserInfoText, 
  HeaderAuthUserName, 
  HeaderAuthUserStyled, 
  HeaderAuthUserTokens 
} from './styled';
import { HeaderAuthUserProvider } from './context';
import { useHeaderMenu } from '../menu/context';
import { useTheme } from '../../../theme';
import { AnimatePresence } from 'framer-motion';

export interface HeaderAuthUserProps extends React.PropsWithChildren {
  avatar: React.ReactNode;
  name: string;
  tokens: string;
}

export const HeaderAuthUser: React.FC<HeaderAuthUserProps> = ({
  avatar, name, tokens, children 
}) => {
  const theme = useTheme();
  const { isInMenu } = useHeaderMenu();

  const userRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  const [isOpen, setIsOpen] = useState(false);
  const toggle = useCallback(() => {
    let width: number;
    if (headRef.current !== null) {
      width = headRef.current.getBoundingClientRect().width;
    } else {
      width = 0;
    }

    setWidth(width);
    setIsOpen(!isOpen);
  }, [isOpen, headRef]);

  useEffect(() => {
    const userEl: HTMLDivElement | null = userRef.current;

    if (userEl !== null) {
      const clickListener = (event: Event) => {
        if (!userEl.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };
      const blurListener = () => setIsOpen(false);

      document.addEventListener('click', clickListener);
      window.addEventListener('blur', blurListener);

      return () => {
        document.removeEventListener('click', clickListener);
        window.removeEventListener('blur', blurListener);
      };
    }
  }, []);

  return (
    <HeaderAuthUserProvider setIsOpen={setIsOpen}>
      <HeaderAuthUserStyled ref={userRef} $inMenu={isInMenu}>
        <HeaderAuthUserHead
          $inMenu={isInMenu}
          ref={headRef}
          initial={{
            background: theme.colors.grayScale.gray4
          }}
          whileHover={{
            background: theme.colors.grayScale.gray3
          }}
          onClick={toggle}
        >
          <HeaderAuthUserInfo>
            {avatar}
            <HeaderAuthUserInfoText>
              <HeaderAuthUserName>
                {name}
              </HeaderAuthUserName>
              <HeaderAuthUserTokens>
                {tokens}
              </HeaderAuthUserTokens>
            </HeaderAuthUserInfoText>
          </HeaderAuthUserInfo>
          <HeaderAuthUserArrow 
            initial={{
              transform: `rotateZ(${isOpen ? -180 : 0}deg)`
            }}
            animate={{
              transform: `rotateZ(${isOpen ? -180 : 0}deg)`
            }}
          />
        </HeaderAuthUserHead>
        <AnimatePresence>
          {isOpen && (
            <HeaderAuthUserBody 
              $width={width} 
              $inMenu={isInMenu}
              animate={{
                opacity: isOpen ? 1 : 0.5,
                transform: 'scale(' + (isOpen ? 1 : 0.95) + ')'
              }}
              exit={{
                opacity: 0,
                transform: 'scale(0.95)'
              }}
            >
              {children}
            </HeaderAuthUserBody>
          )}
        </AnimatePresence>
      </HeaderAuthUserStyled>
    </HeaderAuthUserProvider>
  );
};

export * from './styled';
export * from './item';
