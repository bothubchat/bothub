import styled, { css } from 'styled-components';
import { Typography } from '../../typography';
import { ArrowDownIcon } from '../../icons';
import { HTMLMotionProps, motion } from 'framer-motion';
import React from 'react';

export interface HeaderAuthUserHeadProps {
  $inMenu: boolean;
}

export const HeaderAuthUserHead: React.FC<React.ComponentProps<"div"> & HTMLMotionProps<"div"> & HeaderAuthUserHeadProps> = styled(motion.div)`
  display: flex;
  cursor: pointer;
  align-items: center;
  gap: 22px;
  padding: 8px 14px;
  border: 1px solid ${({ theme }) => theme.colors.grayScale.gray3};
  border-radius: 6px;
  background: ${({ theme }) => theme.colors.grayScale.gray4};
  ${({ $inMenu }) => $inMenu && css`
    width: 100%;
    justify-content: space-between;
  `}
`;

export const HeaderAuthUserStyled = styled.div<{ $inMenu: boolean }>`
  ${({ $inMenu }) => $inMenu && css`
    width: 100%;
  `}
`;

export const HeaderAuthUserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const HeaderAuthUserAvatar = styled.img`
  display: inline-flex;
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.grayScale.gray3};
`;

export const HeaderAuthUserInfoText = styled.span``;

export const HeaderAuthUserName = styled(Typography)`
  font-family: ${({ theme }) => theme.fonts.ibmPlexSans.medium};
  font-size: 14px;
  line-height: 18px;
`;

export const HeaderAuthUserTokens = styled(Typography)`
  font-family: ${({ theme }) => theme.fonts.ibmPlexSans.regular};
  font-size: 12px;
  line-height: 16px;
`;

export const HeaderAuthUserArrow = styled(ArrowDownIcon)``;

export interface HeaderAuthUserBodyProps {
  $width: number;
  $inMenu: boolean;
}

export const HeaderAuthUserBody = styled(motion.div)<HeaderAuthUserBodyProps>`
  display: flex;
  border: 1px solid ${({ theme }) => theme.colors.grayScale.gray3};
  border-radius: 6px;
  background: ${({ theme }) => theme.colors.grayScale.gray4};
  margin-top: 14px;
  padding: 14px 0px;
  width: ${({ $width }) => $width ? `${$width}px` : '170px'};
  transform-origin: top center;
  ${({ $inMenu }) => !$inMenu && css`
    position: absolute;
  `}
`;

export const HeaderAuthUserList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 14px;
  width: 100%;
`;
