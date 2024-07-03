import { css, styled } from 'styled-components';
import { AnimationProps, motion } from 'framer-motion';
import React from 'react';
import { Typography } from '@/ui/components/typography';
import { Button } from '@/ui/components/button';
import { adaptive } from '@/ui/adaptive';
import { LogoutIcon } from '@/ui/icons/logout';

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

export const SidebarUserInfoMain = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const SidebarUserInfoLeft = styled.div`
  display: flex;
  align-items: center;
`;

export interface SidebarUserInfoTariffContainerProps {
  $open: boolean;
}

export const SidebarUserInfoTariffContainer = styled.div<SidebarUserInfoTariffContainerProps>`
  ${({ $open }) => !$open && css`
    display: none;
  `}
`;

export interface SidebarUserInfoUpdateTariffContainerProps {
  $open: boolean;
}

export const SidebarUserInfoUpdateTariffContainer = styled.div<SidebarUserInfoUpdateTariffContainerProps>`
  display: flex;
  transition: all 0.3s;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  ${({ $open }) => {
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
      margin-top: 14px;
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

export const SidebarUserInfoCaps = styled(Typography).attrs({ variant: 'body-s-medium', component: 'span' })`
  color: ${({ theme }) => theme.colors.grayScale.gray1};
  white-space: nowrap;
`;

export const SidebarUserInfoTariff = styled(Typography).attrs({ variant: 'body-m-medium', component: 'span' })`
  display: inline-flex;
  color: ${({ theme }) => theme.default.colors.base.white};
  background: ${({ theme }) => (theme.mode === 'light' ? theme.colors.grayScale.gray2 : theme.colors.grayScale.gray1)};
  padding: 4px 8px;
  border-radius: 10px;
  margin-top: 14px;
  justify-content: center;
  width: 100%;
  cursor: default;
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

export interface SidebarUserInfoLogoutButtonContainerProps {
  $open: boolean;
}

export const SidebarUserInfoLogoutButtonContainer = styled.div<SidebarUserInfoLogoutButtonContainerProps>`
  ${({ $open }) => !$open && css`
    display: none;
  `}
`;

export interface SidebarUserInfoUpdateTariffContainerProps {
  $open: boolean;
}

export const SidebarUserInfoLogoutButton = styled(Button).attrs(
  () => ({ 
    variant: 'text',
    iconSize: 18,
    children: <LogoutIcon /> 
  })
)`
  svg path {
    fill: ${({ theme }) => theme.colors.critic} !important;
  }
  &:hover {
    svg path {
      fill: ${({ theme }) => theme.colors.critic} !important;
    }
  }
`;
