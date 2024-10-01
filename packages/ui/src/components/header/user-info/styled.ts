import React from 'react';
import { styled, css } from 'styled-components';
import { animated } from '@react-spring/web';
import { Typography } from '@/ui/components/typography';
import { ArrowDownIcon } from '@/ui/icons/arrow-down';
import { Avatar } from '@/ui/components/avatar';

export interface HeaderUserInfoHeadProps {
  $inMenu: boolean;
}

export const HeaderUserInfoHead: React.FC<React.ComponentProps<'div'> & HeaderUserInfoHeadProps> = styled(animated.div)`
  display: flex;
  cursor: pointer;
  align-items: center;
  gap: 22px;
  padding: 8px 14px;
  border: 1px solid ${({ theme }) => theme.colors.grayScale.gray3};
  border-radius: 6px;
  background: ${({ theme }) => (theme.mode === 'light' 
    ? theme.default.colors.base.white 
    : theme.colors.grayScale.gray4)};
  transition: background 0.3s ease-out;
  ${({ $inMenu }) => $inMenu && css`
    width: 100%;
    justify-content: space-between;
  `}
  &:hover {
    background: ${({ theme }) => theme.colors.grayScale.gray3};
  }
`;

export const HeaderUserInfoStyled = styled.div<{ $inMenu: boolean }>`
  user-select: none;
  ${({ $inMenu }) => $inMenu && css`
    width: 100%;
  `}
`;

export const HeaderUserInfoInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const HeaderUserInfoAvatar = styled(Avatar).attrs({ size: 32 })``;

export const HeaderUserInfoInfoText = styled.span`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const HeaderUserInfoName = styled(Typography).attrs({ variant: 'body-s-medium' })``;

export const HeaderUserInfoTokens = styled(Typography).attrs({ variant: 'body-xs-regular' })``;

export const HeaderUserInfoArrow = styled(ArrowDownIcon)<{
  $isOpen?: boolean;
}>`
  pointer-events: none;
  transition: transform 0.15s ease-in-out;
  ${({ $isOpen }) => css`
    transform: ${$isOpen ? 'rotateZ(-180deg)' : 'rotateZ(0)'};
  `}
`;

export interface HeaderUserInfoBodyProps {
  $inMenu: boolean;
}

export const HeaderUserInfoBody = styled(animated.div)<HeaderUserInfoBodyProps>`
  display: flex;
  border: 1px solid ${({ theme }) => theme.colors.grayScale.gray3};
  border-radius: 6px;
  background: ${({ theme }) => theme.colors.grayScale.gray4};
  margin-top: 14px;
  padding: 14px 0px;
  width: 170px;
  transform-origin: top center;
  ${({ $inMenu }) => !$inMenu && css`
    position: absolute;
  `}
`;

export const HeaderUserInfoList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 14px;
  width: 100%;
`;
