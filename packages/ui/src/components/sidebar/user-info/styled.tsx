import { styled } from 'styled-components';
import { Typography } from '@/ui/components/typography';
import { Button } from '@/ui/components/button';
import { LogoutIcon } from '@/ui/icons/logout';
import { Skeleton } from '@/ui/components/skeleton';

export const SidebarAvatarSkeleton = styled(Skeleton).attrs({
  variant: 'circular',
  width: 40,
  height: 40,
})``;

export interface SidebarUserInfoStyledProps {
  $open: boolean;
}

export const SidebarUserStyled = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  gap: 16px;
  width: 100%;
  padding: 16px;
  background: ${({ theme }) => theme.colors.grayScale.gray4};
  border: 1px solid ${({ theme }) => theme.colors.grayScale.gray2};
  border-radius: 18px;
`;

export const SidebarUserBox = styled.div`
  display: flex;
  gap: 14px;
  align-items: center;
  width: 100%;
`;

export const SidebarUserInfo = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  width: 100%;
  cursor: pointer;
`;

export const SidebarUserAvatarBox = styled.div`
  padding: 0 5px;
`;

export const SidebarUserTextBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const SidebarUserName = styled(Typography).attrs({
  variant: 'body-m-semibold',
})`
  white-space: nowrap;
`;

export const SidebarUserCaps = styled(Typography).attrs({
  variant: 'body-m-medium',
})`
  white-space: nowrap;
`;

export const SidebarUserInfoTariff = styled(Typography).attrs({
  variant: 'body-m-medium',
  component: 'span',
})`
  display: inline-flex;
  color: ${({ theme }) => theme.default.colors.base.white};
  background: ${({ theme }) =>
    theme.mode === 'light'
      ? theme.colors.grayScale.gray2
      : theme.colors.grayScale.gray1};
  padding: 4px 8px;
  border-radius: 10px;
  margin-top: 14px;
  justify-content: center;
  width: 100%;
  cursor: default;
`;

export const SidebarUserInfoUpdateTariffButton = styled.button`
  all: unset;
  display: flex;
  justify-content: start;
  flex-shrink: 1;
  align-items: center;
  border-radius: 8px;
  padding: 6px 18px 6px 6px;
  box-shadow: inset 0 1px 1px 0 #ffffff60;
  background: linear-gradient(90deg, #00247d 15%, #1c64f2 100%);
  &:hover {
    filter: brightness(0.8);
    cursor: pointer;
  }
  &:active {
    filter: brightness(0.7);
    transform: translateY(1px);
  }
  transition: all 0.2s ease-out;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
`;

export const SidebarUserInfoUpdateTariffButtonText = styled(Typography).attrs({
  variant: 'body-m-medium',
})`
  color: ${({ theme }) => theme.default.colors.base.white};
  white-space: nowrap;
  margin-inline: auto;
`;

export const SidebarUserInfoUpdateTariffBadge = styled.div`
  padding: 2px 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.default.colors.base.white};
`;

export interface SidebarUserInfoUpdateTariffBadgeTextProps {
  children?: string;
}

export const SidebarUserInfoUpdateTariffBadgeText = styled(Typography).attrs({
  variant: 'body-m-semibold',
})<SidebarUserInfoUpdateTariffBadgeTextProps>`
  color: transparent;
  background: ${({ children, theme }) => {
    switch (children?.toUpperCase()) {
      case 'FREE':
        return theme.default.colors.grayScale.gray1;
      case 'BASIC':
        return theme.default.colors.accent.primary;
      case 'PREMIUM':
      default:
        return theme.default.colors.premiumGradient;
    }
  }};
  background-clip: text;
`;

export const SidebarUserInfoLogoutButton = styled(Button).attrs(() => ({
  variant: 'text',
  iconSize: 18,
  children: <LogoutIcon />,
}))`
  svg path {
    fill: ${({ theme }) => theme.colors.critic} !important;
  }
  &:hover {
    svg path {
      fill: ${({ theme }) => theme.colors.critic} !important;
    }
  }
`;
