import React from 'react';
import { HTMLMotionProps, motion } from 'framer-motion';
import { styled, css } from 'styled-components';
import { Typography } from '@/ui/components/typography';
import { ArrowDownIcon } from '@/ui/icons/arrow-down';
import { Avatar } from '@/ui/components/avatar';

export interface HeaderUserInfoHeadProps {
  $inMenu: boolean;
}

export const HeaderUserInfoHead: React.FC<React.ComponentProps<'div'> & HTMLMotionProps<'div'> & HeaderUserInfoHeadProps> = styled(motion.div)`
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

export const HeaderUserInfoArrow = styled(ArrowDownIcon)``;

export interface HeaderUserInfoBodyProps {
  $inMenu: boolean;
}

export const HeaderUserInfoBody = styled(motion.div)<HeaderUserInfoBodyProps>`
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
