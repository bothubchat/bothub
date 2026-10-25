import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useTransition } from '@react-spring/web';
import {
  HeaderUserInfoArrow,
  HeaderUserInfoBody,
  HeaderUserInfoHead,
  HeaderUserInfoInfo,
  HeaderUserInfoInfoText,
  HeaderUserInfoName,
  HeaderUserInfoStyled,
  HeaderUserInfoTokens,
} from './styled';
import { HeaderUserInfoProvider } from './context';
import { useHeaderMenu } from '../menu/context';
import { useOnClickOutside } from '@/ui/utils';

export interface HeaderUserInfoProps extends React.PropsWithChildren {
  avatar: React.ReactNode;
  name: string;
  tokens: string;
}

export const HeaderUserInfo: React.FC<HeaderUserInfoProps> = ({
  avatar,
  name,
  tokens,
  children,
}) => {
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
    setIsOpen((isOpen) => !isOpen);
  }, []);

  const handleClose = useCallback(() => setIsOpen(false), []);

  // Listen to the document and the window only while the dropdown is open.
  useOnClickOutside(userRef, handleClose, isOpen);

  useEffect(() => {
    if (!isOpen) return;

    window.addEventListener('blur', handleClose);

    return () => window.removeEventListener('blur', handleClose);
  }, [isOpen, handleClose]);

  const userInfoTransition = useTransition(
    isOpen,
    !isInMenu
      ? {
          from: {
            opacity: 0,
            transform: 'scale(0)',
          },
          enter: {
            opacity: isOpen ? 1 : 0.5,
            transform: `scale(${isOpen ? 1 : 0.999})`,
            transition: {
              duration: 0.15,
            },
          },
          leave: {
            opacity: 0,
            transform: 'scale(0.999)',
          },
          config: { duration: 150 },
        }
      : {},
  );

  return (
    <HeaderUserInfoProvider setIsOpen={setIsOpen}>
      <HeaderUserInfoStyled
        ref={userRef}
        $inMenu={isInMenu}
        data-test="user-info"
      >
        <HeaderUserInfoHead
          $inMenu={isInMenu}
          ref={headRef}
          onClick={toggle}
        >
          <HeaderUserInfoInfo>
            {avatar}
            <HeaderUserInfoInfoText>
              <HeaderUserInfoName>{name}</HeaderUserInfoName>
              <HeaderUserInfoTokens>{tokens}</HeaderUserInfoTokens>
            </HeaderUserInfoInfoText>
          </HeaderUserInfoInfo>
          <HeaderUserInfoArrow
            style={{
              transform: isOpen ? 'rotateZ(-180deg)' : 'rotateZ(0)',
            }}
          />
        </HeaderUserInfoHead>
        {userInfoTransition(
          (style, item) =>
            item && (
              <HeaderUserInfoBody
                $inMenu={isInMenu}
                style={{ ...style, width }}
              >
                {children}
              </HeaderUserInfoBody>
            ),
        )}
      </HeaderUserInfoStyled>
    </HeaderUserInfoProvider>
  );
};

export * from './styled';
export * from './item';
