import { styled } from 'styled-components';
import { ArrowDownIcon } from '@/ui/icons/arrow-down';
import { colorToRgba } from '@/ui/utils/colorToRgba';
import { Typography } from '../typography';

export const BadgeSelectDropdownTrigger = styled.button<{ $active: boolean }>`
  border: none;
  display: flex;
  align-items: center;
  cursor: pointer;
  column-gap: 8px;
  padding: 6px 12px;
  border-radius: 14px;
  transition: background-color 0.2s;
  max-width: 100%;
  color: ${({ theme }) => theme.colors.base.white};
  background-color: ${({ theme, $active }) =>
    $active
      ? colorToRgba(theme.colors.accent.primaryLight, 0.5)
      : theme.colors.grayScale.gray3};

  &:hover {
    background-color: ${({ theme }) => theme.colors.grayScale.gray2};
  }
`;

export const BadgeSelectDropdownSpanStyled = styled(Typography).attrs({
  variant: 'body-s-medium'
})`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const BadgeSelectDropdownTogglerArrow = styled(ArrowDownIcon).attrs({
  size: 16
})<{ $open: boolean }>`
  pointer-events: none;
  transition: transform 0.2s ease-in-out;
  transform: ${({ $open }) =>
    $open === true ? 'rotateZ(-180deg)' : 'rotateZ(0)'};
`;
