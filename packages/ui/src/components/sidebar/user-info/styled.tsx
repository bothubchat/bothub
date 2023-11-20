import { css, styled } from 'styled-components';
import { AnimationProps, motion } from 'framer-motion';
import React from 'react';
import { Typography } from '@/ui/components/typography';
import { Button } from '@/ui/components/button';
import { adaptive } from '@/ui/adaptive';

export interface SidebarUserInfoStyledProps {
  $open: boolean;
}

export const SidebarUserInfoStyled: React.FC<AnimationProps & SidebarUserInfoStyledProps & React.PropsWithChildren> = styled(motion.div)`
  display: flex;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.grayScale.gray3};
  width: 100%;
  transition: padding 0.3s;
  ${({ $open }) => $open && adaptive({
    variant: 'dashboard',
    desktop: css`
      padding: 20px;
    `,
    tablet: css`
      padding: 18px;
    `,
    mobile: css`
      padding: 14px;
    `
  })}
  ${({ $open }) => !$open && css`
    padding: 0px;
  `}
`;

export const SidebarUserInfoContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export interface SidebarUserInfoTopProps {
  $length: number;
}

export const SidebarUserInfoTop = styled.div<SidebarUserInfoTopProps>`
  display: flex;
  ${({ $length }) => {
    if ($length <= 10) {
      return css`
        align-items: center;
        justify-content: space-between;
      `;
    }

    return css`
      flex-direction: column;
      ${SidebarUserInfoTariff} {
        margin-top: 14px;
        justify-content: center;
        width: 100%;
      }
    `;
  }}
`;

export const SidebarUserInfoTopLeft = styled.div`
  display: flex;
  align-items: center;
`;

export interface SidebarUserInfoTopRightProps {
  $open: boolean;
}

export const SidebarUserInfoTopRight = styled.div<SidebarUserInfoTopRightProps>`
  ${({ $open }) => !$open && css`
    display: none;
  `}
`;

export interface SidebarUserInfoBottomProps {
  $open: boolean;
  $length: number;
}

export const SidebarUserInfoBottom = styled.div<SidebarUserInfoBottomProps>`
  display: flex;
  transition: all 0.3s;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  ${({ $open, $length }) => {
    if (!$open) {
      return css`
        opacity: 0;
        height: 0px;
        margin-top: 0px;
      `;
    }

    return css`
      opacity: 1;
      height: auto;
      margin-top: ${$length <= 10 ? 26 : 14}px;
    `;
  }}
`;

export const SidebarUserInfoText = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 12px;
`;

export const SidebarUserInfoName = styled(Typography).attrs({ variant: 'body-m-semibold', component: 'span' })`
  white-space: nowrap;
`;

export const SidebarUserInfoTokens = styled(Typography).attrs({ variant: 'body-s-medium', component: 'span' })`
  color: ${({ theme }) => theme.colors.grayScale.gray1};
  white-space: nowrap;
`;

export const SidebarUserInfoTariff = styled(Typography).attrs({ variant: 'body-m-medium', component: 'span' })`
  display: inline-flex;
  color: ${({ theme }) => theme.default.colors.base.white};
  background: ${({ theme }) => (theme.mode === 'light' ? theme.colors.grayScale.gray2 : theme.colors.grayScale.gray1)};
  padding: 4px 8px;
  border-radius: 10px;
`;

export const SidebarUserInfoFreeTariff = styled(SidebarUserInfoTariff).attrs({ children: 'Free' })`
  color: ${({ theme }) => theme.colors.base.white};
`;

export const SidebarUserInfoBasicTariff = styled(SidebarUserInfoTariff).attrs({ children: 'Basic' })`
  background: ${({ theme }) => theme.colors.accent.primary};
`;

export const SidebarUserInfoPremiumTariff = styled(SidebarUserInfoTariff).attrs({ children: 'Premium' })`
  background: ${({ theme }) => theme.colors.premiumGradient};
`;

export const SidebarUserInfoEliteTariff = styled(SidebarUserInfoPremiumTariff).attrs({ children: 'Elite' })``;

export const SidebarUserInfoUpdateTariffButton = styled(Button).attrs({ 
  fullWidth: true
})``;
