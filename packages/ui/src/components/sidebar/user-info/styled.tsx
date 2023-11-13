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

export const SidebarUserInfoTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const SidebarUserInfoTopLeft = styled.div`
  display: flex;
  align-items: center;
`;

export const SidebarUserInfoTopRight = styled.div``;

export const SidebarUserInfoBottom: React.FC<AnimationProps & React.PropsWithChildren> = styled(motion.div)`
  display: flex;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  margin-top: 26px;
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
  background: ${({ theme }) => theme.colors.grayScale.gray1};
  padding: 4px 8px;
  border-radius: 10px;
`;

export const SidebarUserInfoFreeTariff = styled(SidebarUserInfoTariff).attrs({ children: 'Free' })``;

export const SidebarUserInfoBasicTariff = styled(SidebarUserInfoTariff).attrs({ children: 'Basic' })`
  background: ${({ theme }) => theme.colors.accent.primary};
`;

export const SidebarUserInfoPremiumTariff = styled(SidebarUserInfoTariff).attrs({ children: 'Premium' })`
  background: ${({ theme }) => theme.colors.premiumGradient};
`;

export const SidebarUserInfoEliteTariff = styled(SidebarUserInfoPremiumTariff).attrs({ children: 'Elite' })``;

export const SidebarUserInfoUpdateTariffButton = styled(Button).attrs({ 
  fullWidth: true,
  children: 'Обновить тариф'
})``;
