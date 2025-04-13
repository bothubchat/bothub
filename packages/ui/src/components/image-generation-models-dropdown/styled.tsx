import { animated, AnimatedProps } from '@react-spring/web';
import styled, { css } from 'styled-components';
import { ArrowDownIcon } from '@/ui/icons';
import { colorToRgba } from '@/ui/utils/colorToRgba';
import { Typography } from '../typography';

export const DropDownModelItemSpanStyled = styled(Typography).attrs({
  variant: 'body-s-medium'
})``;

export const DropDownModelItemTrigger = styled.button`
  border: none;
  display: flex;
  align-items: center;
  column-gap: 8px;
  min-width: 98px;
  padding: 6px 12px;
  border-radius: 14px;
  background: ${({ theme }) =>
    colorToRgba(theme.colors.accent.primaryLight, 0.5)};
  color: ${({ theme }) => theme.colors.base.white};
`;

export const DropDownModelItemList: React.FC<
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
`;

export const DropDownModelItemWrapper = styled.div`
  position: relative;
`;

export const DropDownModelItemTogglerArrow = styled(ArrowDownIcon).attrs({
  size: 16
})<{ $open: boolean }>`
  transform: ${({ $open }) =>
    $open === true ? 'rotateZ(-180deg)' : 'rotateZ(0)'};
  pointer-events: none;
  transition: transform 0.2s ease-in-out;
`;
