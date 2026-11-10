import { css, styled } from 'styled-components';
import { Typography } from '@/ui/components/typography';
import { LoaderCircularIcon } from '@/ui/icons/loader-circular';
import { BadgeProgressColor } from './types';
import { themeVar } from '@/ui/theme';

export interface BadgeProgressStyledProps {
  $color: BadgeProgressColor;
}

export const BadgeProgressStyled = styled.div<BadgeProgressStyledProps>`
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  height: 26px;
  position: relative;
  border-radius: 13px;
  overflow: hidden;
  cursor: progress;
  ${({ theme, $color }) => css`
    ${BadgeProgressText},
    ${BadgeProgressTextBold} {
      color: ${$color === 'primary'
        ? themeVar(theme, 'default.colors.base.white')
        : themeVar(theme, 'default.colors.base.black')};
    }
  `}
`;

export const BadgeProgressBackground = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  pointer-events: none;
`;

export interface BadgeProgressLineProps {
  $color: BadgeProgressColor;
}

export const BadgeProgressLine = styled.div<BadgeProgressLineProps>`
  display: flex;
  width: inherit;
  height: inherit;
  background: ${({ theme, $color }) => {
    if ($color === 'primary') {
      return themeVar(theme, 'colors.accent.primary');
    }

    return themeVar(theme, 'default.colors.base.white');
  }};
`;

export const BadgeProgressLineFilled = styled.div`
  display: flex;
  width: inherit;
  height: inherit;
  background: ${({ theme }) => themeVar(theme, 'colors.accent.primaryLight')};
  transition: width 0.3s ease-in-out;
`;

export const BadgeProgressContent = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  height: inherit;
  position: relative;
  padding: 0px 12px;
  user-select: none;
`;

export const BadgeProgressLoader = styled(LoaderCircularIcon).attrs({
  size: 16,
})``;

export const BadgeProgressText = styled(Typography).attrs({
  variant: 'body-s-regular',
})`
  cursor: inherit;
  color: ${({ theme }) => themeVar(theme, 'default.colors.base.white')};
  white-space: nowrap;
`;

export const BadgeProgressTextBold = styled(Typography).attrs({
  variant: 'body-s-medium',
})`
  cursor: inherit;
  color: ${({ theme }) => themeVar(theme, 'default.colors.base.white')};
`;
