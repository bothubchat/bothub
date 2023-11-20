import React, {
  useCallback, useEffect, useRef, useState 
} from 'react';
import { AnimatePresence } from 'framer-motion';
import { useTheme } from '@/ui/theme';
import {
  HeaderUserInfoArrow,
  HeaderUserInfoBody,
  HeaderUserInfoHead, 
  HeaderUserInfoInfo, 
  HeaderUserInfoInfoText, 
  HeaderUserInfoName, 
  HeaderUserInfoStyled, 
  HeaderUserInfoTokens 
} from './styled';
import { HeaderUserInfoProvider } from './context';
import { useHeaderMenu } from '../menu/context';

export interface HeaderUserInfoProps extends React.PropsWithChildren {
  avatar: React.ReactNode;
  name: string;
  tokens: string;
}

export const HeaderUserInfo: React.FC<HeaderUserInfoProps> = ({
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
    <HeaderUserInfoProvider setIsOpen={setIsOpen}>
      <HeaderUserInfoStyled ref={userRef} $inMenu={isInMenu}>
        <HeaderUserInfoHead
          $inMenu={isInMenu}
          ref={headRef}
          initial="default"
          animate="default"
          whileHover="hover"
          variants={{
            default: {
              background: theme.mode === 'light' ? theme.default.colors.base.white : theme.colors.grayScale.gray4
            },
            hover: {
              background: theme.colors.grayScale.gray3
            }
          }}
          onClick={toggle}
        >
          <HeaderUserInfoInfo>
            {avatar}
            <HeaderUserInfoInfoText>
              <HeaderUserInfoName>
                {name}
              </HeaderUserInfoName>
              <HeaderUserInfoTokens>
                {tokens}
              </HeaderUserInfoTokens>
            </HeaderUserInfoInfoText>
          </HeaderUserInfoInfo>
          <HeaderUserInfoArrow 
            initial={{
              transform: `rotateZ(${isOpen ? -180 : 0}deg)`
            }}
            animate={{
              transform: `rotateZ(${isOpen ? -180 : 0}deg)`,
              transition: {
                duration: 0.15
              }
            }}
          />
        </HeaderUserInfoHead>
        <AnimatePresence>
          {isOpen && (
            <HeaderUserInfoBody
              $inMenu={isInMenu}
              style={{ width }}
              {...(!isInMenu ? {
                animate: {
                  opacity: isOpen ? 1 : 0.5,
                  transform: `scale(${isOpen ? 1 : 0.999})`,
                  transition: {
                    duration: 0.15
                  }
                },
                exit: {
                  opacity: 0,
                  transform: 'scale(0.999)'
                }
              } : {})}
            >
              {children}
            </HeaderUserInfoBody>
          )}
        </AnimatePresence>
      </HeaderUserInfoStyled>
    </HeaderUserInfoProvider>
  );
};

export * from './styled';
export * from './item';
