import { animated, AnimatedProps } from '@react-spring/web';
import { css, styled } from 'styled-components';
import { ArrowDownIcon } from '@/ui/icons/arrow-down';
import { colorToRgba } from '@/ui/utils/colorToRgba';
import { Typography } from '../typography';

export const BadgeSelectDropdownSpanStyled = styled(Typography).attrs({
  variant: 'body-s-medium'
})``;

export const BadgeSelectDropdownTrigger = styled.button<{
  $active: boolean;
  $colorButtonOpened?: string;
}>`
  border: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  column-gap: 8px;
  min-width: 98px;
  padding: 6px 12px;
  border-radius: 14px;
  background: ${({ theme, $active, $colorButtonOpened }) =>
    $active
      ? $colorButtonOpened || theme.mode === 'light'
        ? theme.colors.grayScale.gray2
        : colorToRgba(theme.colors.accent.primaryLight, 0.5)
      : theme.mode === 'light'
        ? theme.colors.grayScale.gray4
        : theme.colors.grayScale.gray3};
  color: ${({ theme }) => theme.colors.base.white};
`;

export const BadgeSelectDropdownList: React.FC<
  AnimatedProps<React.ComponentProps<'ul'>> & { $open: boolean }
> = styled(animated.ul)`
  padding: 0;
  margin: 0;
  display: none;
  color: white;
  position: absolute;
  top: 38px;
  left: 0;
  transform-origin: top center;
  z-index: 2;
  padding: 8px;
  border: 1px solid;
  border-radius: 8px;
  border-color: ${({ theme }) => theme.colors.grayScale.gray2};
  background: ${({ theme }) => colorToRgba(theme.colors.grayScale.gray4, 0.75)};
  backdrop-filter: blur(16px);

  ${({ $open }) =>
    $open &&
    css`
      display: flex;
    `}
  flex-direction: column;
  gap: 1px;
`;

export const BadgeSelectDropdownWrapper = styled.div`
  position: relative;
`;

export const BadgeSelectDropdownTogglerArrow = styled(ArrowDownIcon).attrs({
  size: 16
})<{ $open: boolean }>`
  transform: ${({ $open }) =>
    $open === true ? 'rotateZ(-180deg)' : 'rotateZ(0)'};
  pointer-events: none;
  transition: transform 0.2s ease-in-out;
`;
