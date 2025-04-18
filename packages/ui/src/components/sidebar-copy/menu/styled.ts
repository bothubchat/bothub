import { animated } from '@react-spring/web';
import { styled } from 'styled-components';
import { Typography } from '@/ui/components/typography';

export const SidebarMenuStyled = styled.div`
  z-index: ${({ theme }) => theme.zIndex.menu};
`;

export const SidebarMenuList = styled(animated.ul)<{ $isOpen: boolean }>`
  transform-origin: top center;
  display: flex;
  flex-direction: column;
  margin: 0;
  gap: 20px;
  ${({ $isOpen, theme }) =>
    $isOpen && `
    position: absolute;
    background: ${theme.colors.grayScale.gray7};
    border: 1px solid ${theme.colors.grayScale.gray3};
    padding: 20px;
    border-radius: 8px;
    width: 100%;
  `}
  ${({ $isOpen }) =>
    !$isOpen && `
    margin: 0;
    padding: 0;
    width: fit-content;
  `}
  margin-top: 20px;
  left: 0;
  z-index: 1;
  list-style-type: none;
`;

export const SidebarMenuListItem = styled.li`
  display: flex;
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
  opacity: ${({ $active }) => ($active ? 1 : 0.5)};
  background: ${({ theme, $active }) =>
    $active ? theme.colors.grayScale.gray3 : theme.colors.grayScale.gray4};
  svg path {
    ${({ theme, $active }) =>
      $active && `fill: ${theme.colors.accent.primary}`};
  }
`;

export const SidebarMenuItemText = styled(Typography).attrs({
  variant: 'body-m-medium'
})<{
  $active: boolean;
}>`
  opacity: ${({ $active }) => ($active ? 1 : 0.5)};
`;
