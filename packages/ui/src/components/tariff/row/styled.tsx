import { styled, css } from 'styled-components';
import { adaptive } from '@/ui/adaptive';
import { Typography } from '@/ui/components/typography';
import { Badge } from '@/ui/components/badge';
import { Radio } from '@/ui/components/radio';
import { CheckCircleIcon } from '@/ui/icons/check-circle';
import { TariffCardColor, TariffType } from './types';

export type Variant = 'main' | 'dashboard';

export interface TariffCardProps {
  $color?: TariffCardColor;
  $selected?: boolean;
  $variant: Variant;
}

export const TariffCardDiscountBadge = styled.div<{ $active: boolean }>`
  position: absolute;
  overflow: hidden;
  display: flex;
  align-items: center;
  top: 0;
  right: 0;
  border-bottom-left-radius: 14px;
  padding: 2px 16px;
  &:before {
    transition: all 0.3s ease;
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${({ theme }) => theme.colors.premiumGradient};
    opacity: ${({ $active }) => ($active ? 0.6 : 0.3)};
  }
`;

export const TariffCardDiscountBadgeText = styled(Typography).attrs({
  variant: 'body-s-medium'
})<{ $active: boolean }>`
  transition: all 0.3s ease;
  position: relative;
  z-index: 2;
  text-align: center;
  white-space: nowrap;
  ${({ theme, $active }) => `
    color: ${$active ? theme.default.colors.base.white : theme.mode === 'light' ? theme.default.colors.accent.primary : theme.default.colors.accent.primaryLight};
    
  `}
`;

export const TariffCardStyled = styled.div<TariffCardProps>`
  position: relative;
  display: flex;
  cursor: pointer;
  width: 100%;
  overflow: hidden;
  padding: 16px 34px;
  ${({ $variant }) =>
    adaptive({
      variant: $variant,
      merge: true,
      tablet: css`
        padding: 16px 16px;
      `,
      mobile: css`
        padding: 14px;
      `
    })}
  box-sizing: border-box;
  opacity: 0.9;
  background: ${({ theme }) => theme.colors.grayScale.gray7};
  border-radius: 14px;
  ${({ $selected, theme }) =>
    $selected &&
    theme.mode === 'light' &&
    css`
      background-color: ${theme.colors.grayScale.gray3};
    `}
  ${({ $selected, theme }) =>
    $selected &&
    theme.mode === 'dark' &&
    css`
      background-color: ${theme.colors.grayScale.gray3};
    `}
  ${({ theme }) =>
    theme.mode === 'dark' &&
    css`
      &:after {
        display: block;
        content: '';
        position: absolute;
        width: 1070px;
        height: 216.23px;
        gap: 0px;
        left: -240px;
        top: -200px;
        filter: blur(50px);
        transform: rotate(-4.41deg);
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
        background: linear-gradient(
          90.98deg,
          #2244f4 7.53%,
          rgba(252, 94, 255, 0.4) 72.48%
        );
        border-radius: 50%;
        z-index: -1;
      }
    `};
  &:hover {
    &:before {
      background: ${({ theme, $selected }) =>
        $selected
          ? 'linear-gradient(90deg, #0047FF 0%, #A700FF 100%)'
          : theme.colors.accent.primary};
      opacity: 0.2;
    }
    ${TariffCardDiscountBadge}:before {
      opacity: 0.6;
    }
    ${TariffCardDiscountBadgeText} {
      color: white;
    }
  }
  &:before {
    transition: all 0.3s ease;
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0.3;
    left: 0;
    top: 0;
    ${({ $selected }) =>
      $selected &&
      `background: linear-gradient(90deg, #0047FF 0%, #A700FF 100%)`};
  }
`;

export const TariffCardContainer = styled.div<{ $variant: Variant }>`
  display: flex;
  flex-direction: column;
  ${({ $variant }) => {
    switch ($variant) {
      case 'dashboard':
        return adaptive({
          variant: 'dashboard',
          desktop: css`
            min-width: 210px;
          `,
          tablet: css`
            min-width: 185px;
          `,
          mobile: css`
            min-width: 210px;
          `
        });
      case 'main':
        return adaptive({
          variant: 'main',
          desktop: css`
            min-width: 210px;
          `,
          tablet: css`
            min-width: 235px;
          `,
          mobile: css`
            min-width: 210px;
          `
        });
    }
  }}
`;

export const TariffCardStyledContent = styled.div<{ $variant: Variant }>`
  position: relative;
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  gap: 34px;
  ${({ $variant }) =>
    adaptive({
      variant: $variant,
      merge: true,
      tablet: css`
        gap: 32px;
      `,
      mobile: css`
        flex-wrap: wrap;
        gap: 10px;
      `
    })}
`;

export const TarrifCardStyledLeft = styled.div<{ $variant: Variant }>`
  position: relative;
  display: flex;
  align-items: center;
  gap: 14px;
  ${({ $variant }) =>
    adaptive({
      variant: $variant,
      mobile: css`
        flex-wrap: wrap;
      `
    })}
`;

export const TariffCardStyledName: React.FC<{
  $color: TariffType;
  children?: React.ReactNode;
}> = styled(Typography).attrs({
  variant: 'body-xl-semibold',
  component: 'h3'
})<{ $color: TariffType }>`
  background-clip: text;
  -webkit-background-clip: text;
  width: fit-content;
  -webkit-text-fill-color: transparent;
  background-image: ${({ theme, $color }) => {
    switch ($color) {
      case 'Basic':
        return theme.colors.accent.primary;
      case 'Premium':
        return theme.colors.gradient.premium;
      case 'Deluxe':
        return theme.colors.gradient.deluxe;
      case 'Elite':
        return theme.colors.gradient.elite;
      default:
        return theme.colors.base.white;
    }
  }};
  background-color: ${({ theme, $color }) => {
    switch ($color) {
      case 'Basic':
        return theme.colors.accent.primary;
      case 'Premium':
        return theme.colors.gradient.premium;
      case 'Deluxe':
        return theme.colors.gradient.deluxe;
      case 'Elite':
        return theme.colors.gradient.elite;
      default:
        return theme.colors.base.white;
    }
  }};
`;

export const TariffCardStyledMiddle = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
`;

export const TariffCardStyledDescription = styled(Typography).attrs({
  variant: 'body-s-semibold'
})`
  width: 100%;
  max-width: 518px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
`;

export const TarrifCardStyledRight = styled.div<{ $variant: Variant }>`
  position: relative;
  white-space: nowrap;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  gap: 5px;
  width: 200px;
  margin-right: clamp(0rem, -6.366rem + 18.519vw, 3.125rem);
  ${({ $variant }) =>
    adaptive({
      variant: $variant,
      mobile: css`
        position: absolute;
        right: 0;
        top: 0;
        padding: 6px 0;
      `
    })}
`;

export const TariffCardStyledPrice = styled(Typography).attrs({
  variant: 'body-xxl-semibold'
})<{ $isDefault?: boolean; $variant: Variant }>`
  color: ${({ theme, $isDefault }) =>
    $isDefault ? theme.colors.base.white : theme.default.colors.base.white};
  ${({ $variant }) =>
    adaptive({
      variant: $variant,
      mobile: css`
        color: ${({ theme }) => theme.colors.base.white};
      `
    })}
`;

export const TariffCardStyledCurrency = styled(Typography).attrs({
  variant: 'body-l-medium'
})<{ $isDefault?: boolean; $variant: Variant }>`
  padding-bottom: 4px;
  color: ${({ theme, $isDefault }) =>
    $isDefault ? theme.colors.base.white : theme.default.colors.base.white};
  ${({ $variant }) =>
    adaptive({
      variant: $variant,
      mobile: css`
        color: ${({ theme }) => theme.colors.base.white};
      `
    })}
`;
export const TariffCardStyledOldPriceWrapper = styled.div<{
  $variant: Variant;
}>`
  position: absolute;
  display: flex;
  top: -10px;
  right: 0;
  ${({ $variant }) =>
    adaptive({
      variant: $variant,
      mobile: css`
        top: -4px;
        right: 0;
      `
    })}
`;

export const TariffCardStyledOldPrice = styled(Typography)<{
  $variant: Variant;
}>`
  color: ${({ theme }) => theme.default.colors.grayScale.gray6};
  ${({ $variant }) =>
    adaptive({
      variant: $variant,
      mobile: css`
        color: ${({ theme }) => theme.colors.base.white};
      `
    })}
  width: 100px;
  z-index: 1;
  font-size: 14px;
  font-weight: 600;
  line-height: 18.2px;
  text-align: right;
  text-decoration-line: line-through;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
`;

export const TarrifCardStyledRadio = styled(Radio)``;

export const TariffCardStyledGiveCaps = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const TariffCardGiveCapsBadge = styled(Badge).attrs({ variant: 'info' })`
  ${({ theme }) => `
    background-color: ${
      theme.mode === 'dark'
        ? theme.colors.grayScale.gray2
        : theme.colors.grayScale.gray5
    };
    color: ${theme.default.colors.base.white};
  `}
`;

export const TariffCardGiveCapsBadgeText = styled(Typography).attrs({
  variant: 'body-s-medium'
})`
  white-space: nowrap;
  ${({ theme }) => `
    color: ${theme.default.colors.base.white};
  `}
`;

export const TariffCardStyledDescriptionIcon = styled(CheckCircleIcon).attrs({
  size: 18
})<{ $variant: Variant }>`
  ${({ $variant }) =>
    adaptive({
      variant: $variant,
      mobile: css`
        display: none;
      `
    })}
`;
export const TariffCardGiveCapsText = styled(Typography).attrs({
  variant: 'body-xs-medium'
})`
  white-space: nowrap;
`;
