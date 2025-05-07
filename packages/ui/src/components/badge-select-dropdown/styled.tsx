import { animated, AnimatedProps } from '@react-spring/web';
import { css, styled } from 'styled-components';
import { ArrowDownIcon } from '@/ui/icons/arrow-down';
import { colorToRgba } from '@/ui/utils/colorToRgba';
import { Typography } from '../typography';

export const BadgeSelectDropdownSpanStyled = styled(Typography).attrs({
  variant: 'body-s-medium'
})`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const BadgeSelectDropdownTrigger = styled.button<{ $active: boolean }>`
  border: none;
  display: flex;
  align-items: center;
  cursor: pointer;
  column-gap: 8px;
  padding: 6px 12px;
  border-radius: 14px;
  background: ${({ theme, $active }) =>
    $active
      ? colorToRgba(theme.colors.accent.primaryLight, 0.5)
      : theme.colors.grayScale.gray3};
  color: ${({ theme }) => theme.colors.base.white};
  width: 100%;
`;

export const BadgeSelectDropdownList: React.FC<
  AnimatedProps<React.ComponentProps<'ul'>> & { $open: boolean }
> = styled(animated.ul)`
  max-height: 192px;
  overflow-y: auto;
  padding: 0;
  margin: 0;
  display: none;
  color: white;
  position: absolute;
  z-index: 1;
  top: 38px;
  left: 50%;
  transform: translateX(-50%);
  transform-origin: top center;

  padding: 8px;
  border: 1px solid;
  border-radius: 8px;
  border-color: ${({ theme }) => theme.colors.grayScale.gray2};
  background: ${({ theme }) => colorToRgba(theme.colors.grayScale.gray4, 0.75)};
  backdrop-filter: blur(16px);

  ${({ $open }) => css`
    display: ${$open && 'flex'};
  `}
  flex-direction: column;
  gap: 1px;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.accent.primary};
    border-radius: 2px;
  }

  &::-webkit-scrollbar-corner {
    display: none;
  }
`;

export const BadgeSelectDropdownWrapper = styled.div`
  display: inline-block;
  position: relative;
  width: 100%;
`;

export const BadgeSelectDropdownTogglerArrow = styled(ArrowDownIcon).attrs({
  size: 16
})<{ $open: boolean }>`
  transform: ${({ $open }) =>
    $open === true ? 'rotateZ(-180deg)' : 'rotateZ(0)'};
  pointer-events: none;
  transition: transform 0.2s ease-in-out;
`;
