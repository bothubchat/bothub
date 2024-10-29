import { css, styled } from 'styled-components';
import { Typography } from '@/ui/components/typography';
import { Button } from '@/ui/components/button';
import { adaptive } from '@/ui/adaptive';
import { LogoutIcon } from '@/ui/icons/logout';
import { Scrollbar } from '../../scrollbar';

export interface SidebarUserInfoStyledProps {
  $open: boolean;
}

export const SidebarUserInfoBottom = styled.div`
  display: flex;
  align-items: center;
  overflow: hidden;
  & > *:first-child {
    width: 0;
    overflow: hidden;
    transform: translateX(-100%);
    transition: all 0.3s;
  }
`;

export const SidebarUserInfoStyled = styled.div<SidebarUserInfoStyledProps>`
  display: flex;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.grayScale.gray4};
  width: 100%;
  transition: padding 0.3s;
  &:hover {
    background: ${({ theme }) => theme.colors.grayScale.gray3};
    ${SidebarUserInfoBottom} {
      gap: 10px;
      transition: width 0.3s;
      & > *:first-child {
        overflow: visible;
        transform: translateX(0);
        width: fit-content;
      }
    }
  }
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
  color: ${({ theme }) => theme.colors.base.white};
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

export const SidebarUserInfoUpdateTariffButton = styled(Button).attrs({
  fullWidth: true, size: 'small',
})``;

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