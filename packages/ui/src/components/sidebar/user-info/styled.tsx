import { styled } from 'styled-components';
import { Avatar } from '@/ui/components/avatar';
import { Typography } from '@/ui/components/typography';
import { Button } from '@/ui/components/button';

export const SidebarUserInfoStyled = styled.div`
  display: flex;
  border: 1px solid ${({ theme }) => theme.colors.grayScale.gray2};
  border-radius: 18px;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.grayScale.gray3};
  width: 100%;
  padding: 20px;
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
  margin-bottom: 26px;
`;

export const SidebarUserInfoTopLeft = styled.div`
  display: flex;
  align-items: center;
`;

export const SidebarUserInfoTopRight = styled.div``;

export const SidebarUserInfoBottom = styled.div`
  display: flex;
  width: 100%;
`;

export const SidebarUserInfoAvatar = styled(Avatar)``;

export const SidebarUserInfoText = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 12px;
`;

export const SidebarUserInfoName = styled(Typography).attrs({ variant: 'body-m-semibold', component: 'span' })``;

export const SidebarUserInfoTokens = styled(Typography).attrs({ variant: 'body-s-medium', component: 'span' })`
  color: ${({ theme }) => theme.colors.grayScale.gray1};
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
