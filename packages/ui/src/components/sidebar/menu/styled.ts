import { animated } from '@react-spring/web';
import { styled, css } from 'styled-components';
import { Typography } from '@/ui/components/typography';

export const SidebarMenuStyled = styled.div`
  z-index: ${({ theme }) => theme.zIndex.menu};
`;

export const SidebarMenuList = styled(animated.ul)<{ $isOpen: boolean }>`
  transform-origin: top center;
  display: flex;
  flex-direction: column;
  margin: 0;
  z-index: 1;
  gap: 20px;
  ${({ $isOpen, theme }) =>
    $isOpen &&
    `
    position: absolute;
    background: ${theme.colors.grayScale.gray7};
    border: 1px solid ${theme.colors.grayScale.gray3};
    padding: 20px;
    border-radius: 8px;
    width: 100%;
  `}
  ${({ $isOpen }) =>
    !$isOpen &&
    `
    gap: 10px;
    margin: 0;
    padding: 0;
    width: fit-content;
  `}
  margin-top: 20px;
  left: 0;
  list-style-type: none;
`;

export const SidebarMenuListItem = styled.li`
  display: flex;
  position: relative;
  align-items: center;
  gap: 10px;
  cursor: pointer;
`;

export const SidebarMenuItemIconBox = styled.div<{
  $active: boolean;
}>`
  display: flex;
  outline: 1px solid ${({ theme }) => theme.colors.grayScale.gray2};
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 8px;
  opacity: ${({ $active }) => ($active ? 1 : 0.75)};
  background: ${({ theme, $active }) =>
    $active ? theme.colors.grayScale.gray3 : theme.colors.grayScale.gray4};
  svg path {
    ${({ theme, $active }) =>
      $active && `fill: ${theme.colors.accent.primary}`};
  }
`;

export const SidebarMenuItemText = styled(Typography).attrs({
  variant: 'body-m-medium',
})<{
  $active: boolean;
  $isOpen: boolean;
}>`
  ${({ $isOpen }) => !$isOpen && 'display: none;'}
  opacity: ${({ $active }) => ($active ? 1 : 0.75)};
  @media (max-width: ${({ theme }) => theme.dashboard.tablet.maxWidth}) {
    display: block;
  }
`;

export const SidebarMenuItemTooltipStyled = styled.div<{
  $isOpen: boolean;
  $isHovered: boolean;
}>`
  transition:
    all 0.2s ease-in-out,
    left 150ms ease-in-out;
  position: fixed;
  display: flex;
  align-items: center;
  z-index: 100;
  ${({ $isOpen }) =>
    !$isOpen
      ? `opacity: 0; pointer-events: none; visibility: hidden; left: 64px;`
      : `
    opacity: 0.8;
    left: 90px;
  `}
  @media (max-width: ${({ theme }) => theme.dashboard.tablet.maxWidth}) {
    display: none;
  }
  ${({ $isHovered }) =>
    $isHovered &&
    css`
      left: 74px;
      opacity: 1;
    `}
`;

export const SidebarMenuTooltipArrow = styled.svg`
  display: inline-flex;
  position: relative;
  rotate: 90deg;
`;

export const SidebarMenuTooltipText = styled(Typography).attrs({
  variant: 'body-s-medium',
})`
  display: inline-flex;
  background: ${({ theme }) =>
    theme.mode === 'light'
      ? theme.colors.grayScale.gray2
      : theme.colors.grayScale.gray3};
  border-radius: 8px;
  padding: 8px 12px;
  margin-left: -2px;
`;
