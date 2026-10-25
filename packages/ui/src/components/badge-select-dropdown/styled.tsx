import { styled } from 'styled-components';
import { ArrowDownIcon } from '@/ui/icons/arrow-down';
import { Typography } from '../typography';
import { Variant } from './types';
import { themeVar } from '@/ui/theme';

export const BadgeSelectDropdownTrigger = styled.button<{
  $active: boolean;
  $variant: Variant;
  $colorButtonOpened?: string;
}>`
  border: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  column-gap: 8px;
  padding: 6px 12px;
  border-radius: 14px;
  transition: background-color 0.2s;
  max-width: 100%;
  background: ${({ theme, $active, $colorButtonOpened }) =>
    $active
      ? $colorButtonOpened || themeVar(theme, 'tokens.surfaceActive')
      : themeVar(theme, 'tokens.surfaceSecondary')};
  color: ${({ theme }) => themeVar(theme, 'colors.base.white')};
`;

export const BadgeSelectDropdownSpanStyled = styled(Typography).attrs({
  variant: 'body-s-medium',
})`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const BadgeSelectDropdownTogglerArrow = styled(ArrowDownIcon).attrs({
  size: 16,
})<{ $open: boolean }>`
  pointer-events: none;
  transition: transform 0.2s ease-in-out;
  transform: ${({ $open }) =>
    $open === true ? 'rotateZ(-180deg)' : 'rotateZ(0)'};
`;
