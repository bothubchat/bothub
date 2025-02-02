import { css, styled } from 'styled-components';
import { Typography } from '@/ui/components/typography';
import { Button } from '@/ui/components/button';
import { adaptive } from '@/ui/adaptive';
import { LogoutIcon } from '@/ui/icons/logout';

export interface SidebarUserInfoStyledProps {
  $open: boolean;
}

export const SidebarUserInfoBottom = styled.div`
  display: flex;
  align-items: center;
  overflow: hidden;
`;

export const SidebarUserInfoStyled = styled.div<SidebarUserInfoStyledProps>`
  display: flex;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.grayScale.gray4};
  width: 100%;
  transition: padding 0.3s;

  ${({ $open }) => $open
    && adaptive({
      variant: 'dashboard',
      desktop: css`
        padding: 20px;
      `,
      tablet: css`
        padding: 0px;
      `,
      mobile: css`
        padding: 0px;
      `,
    })}
  ${({ $open }) => !$open
    && adaptive({
      variant: 'dashboard',
      merge: true,
      desktop: css`
        padding: 0px;
      `,
      tablet: css`
        padding: 18px;
      `,
      mobile: css`
        padding: 14px;
      `,
    })}
  ${({ theme, $open }) => ($open
    ? adaptive({
      variant: 'dashboard',
      desktop: css`
        border: 1px solid ${theme.mode === 'light'
      ? theme.colors.grayScale.gray3
      : theme.colors.grayScale.gray2};
        border-radius: 18px;
        background: ${theme.mode === 'light'
      ? theme.default.colors.base.white
      : theme.colors.grayScale.gray4};
      `,
      tablet: css`
        border-radius: 0px;
        border: 0px solid rgba(0, 0, 0, 0);
        background: rgba(0, 0, 0, 0);
      `,
      mobile: css`
        border-radius: 0px;
        border: 0px solid rgba(0, 0, 0, 0);
      `,
    })
    : adaptive({
      variant: 'dashboard',
      merge: true,
      desktop: css`
        border: 0px solid rgba(0, 0, 0, 0);
        border-radius: 0px;
        background: rgba(0, 0, 0, 0);
      `,
      tablet: css`
        border-radius: 10px;
        background: ${theme.mode === 'light'
      ? theme.default.colors.base.white
      : theme.colors.grayScale.gray4};
        border: 1px solid ${theme.mode === 'light'
      ? theme.colors.grayScale.gray2
      : theme.colors.grayScale.gray3};
      `,
      mobile: css`
        border-radius: 8px;
        border: 1px solid ${theme.mode === 'light'
      ? theme.colors.grayScale.gray2
      : theme.colors.grayScale.gray3};
      `,
    })
  )}
  transition: border-width 0.3s ease-out, 
              border-color 0.3s ease-out,
              border-radius 0.3s ease-out,
              background 0.3s ease-out;
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
  ${({ $open }) => !$open
    && adaptive({
      variant: 'dashboard',
      desktop: css`
        display: none;
      `,
      tablet: css`
        display: flex;
      `,
      mobile: css`
        display: flex;
      `,
    })}

  ${({ $open }) => $open
    && adaptive({
      variant: 'dashboard',
      desktop: css`
        display: flex;
      `,
      tablet: css`
        display: none;
      `,
      mobile: css`
        display: none;
      `,
    })}
`;

export interface SidebarUserInfoUpdateTariffContainerProps {
  $open: boolean;
}

export const SidebarUserInfoUpdateTariffContainer = styled.div<SidebarUserInfoUpdateTariffContainerProps>`
  display: flex;
  transition: all 0.3s;
  width: 100%;
  height: 40px;
  white-space: nowrap;
  overflow: hidden;
  ${({ $open }) => {
    if (!$open) {
      return adaptive({
        variant: 'dashboard',
        desktop: css`
          opacity: 0;
          height: 0px;
          margin-top: 0px;
        `,
        tablet: css`
          opacity: 1;
          height: auto;
          margin-top: 12px;
        `,
        mobile: css`
          opacity: 1;
          height: auto;
          margin-top: 10px;
        `,
      });
    }
    return adaptive({
      variant: 'dashboard',
      desktop: css`
        opacity: 1;
        height: auto;
        margin-top: 14px;
      `,
      tablet: css`
        opacity: 0;
        height: 0px;
        margin-top: 0px;
      `,
      mobile: css`
        opacity: 0;
        height: 0px;
        margin-top: 0px;
      `,
    });
  }}
`;

export const SidebarUserInfoText = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 12px;
`;

export const SidebarUserInfoName = styled(Typography).attrs({
  variant: 'body-m-semibold',
  component: 'span',
})`
  white-space: nowrap;
`;

export const SidebarUserInfoCaps = styled(Typography).attrs({
  variant: 'body-s-medium',
  component: 'span',
})`
  color: ${({ theme }) => theme.colors.grayScale.gray1};
  white-space: nowrap;
`;

export const SidebarUserInfoTariff = styled(Typography).attrs({
  variant: 'body-m-medium',
  component: 'span',
})`
  display: inline-flex;
  color: ${({ theme }) => theme.default.colors.base.white};
  background: ${({ theme }) => (theme.mode === 'light'
    ? theme.colors.grayScale.gray2
    : theme.colors.grayScale.gray1)};
  padding: 4px 8px;
  border-radius: 10px;
  margin-top: 14px;
  justify-content: center;
  width: 100%;
  cursor: default;
`;

export const SidebarUserInfoFreeTariff = styled(SidebarUserInfoTariff).attrs({
  children: 'Free',
})`
  color: ${({ theme }) => theme.default.colors.base.white};
`;

export const SidebarUserInfoBasicTariff = styled(SidebarUserInfoTariff).attrs({
  children: 'Basic',
})`
  background: ${({ theme }) => theme.colors.accent.primary};
`;

export const SidebarUserInfoPremiumTariff = styled(SidebarUserInfoTariff).attrs(
  { children: 'Premium' }
)`
  background: ${({ theme }) => theme.colors.premiumGradient};
`;

export const SidebarUserInfoDeluxeTariff = styled(SidebarUserInfoTariff).attrs({
  children: 'Deluxe',
})`
  background: ${({ theme }) => theme.colors.premiumGradient};
`;

export const SidebarUserInfoEliteTariff = styled(
  SidebarUserInfoPremiumTariff
).attrs({ children: 'Elite' })``;

export const SidebarUserInfoUpdateTariffButton = styled.button`
  all: unset;
  margin-top: 4px;
  width: 100%;
  display: flex;
  justify-content: start;
  flex-shrink: 1;
  align-items: center;
  border-radius: 8px;
  padding: 6px 18px 6px 6px;
  box-shadow: inset 0 1px 1px 0 #ffffff60;
  background: linear-gradient(90deg, #00247D 15%, #1c64f2 100%);
  color: ${({ theme }) => theme.default.colors.base.white};
  font-weight: 500;
  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }
  &:active {
    opacity: 0.6;
    transform: translateY(1px);
  }
  transition: all .2s ease-out;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
`;

export const SidebarUserInfoUpdateTariffButtonText = styled(Typography).attrs({
  variant: 'body-m-medium'
})`
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
  variant: 'body-m-semibold'
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

export interface SidebarUserInfoLogoutButtonContainerProps {
  $open: boolean;
}

export const SidebarUserInfoLogoutButtonContainer = styled.div<SidebarUserInfoLogoutButtonContainerProps>`
  ${({ $open }) => (!$open
    ? adaptive({
      variant: 'dashboard',
      desktop: css`
        display: none;
      `,
      tablet: css`
        display: flex;
      `,
      mobile: css`
        display: flex;
      `,
    })
    : adaptive({
      variant: 'dashboard',
      desktop: css`
        display: flex;
      `,
      tablet: css`
        display: none;
      `,
      mobile: css`
        display: none;
      `,
    }))}
`;

export interface SidebarUserInfoUpdateTariffContainerProps {
  $open: boolean;
}

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
