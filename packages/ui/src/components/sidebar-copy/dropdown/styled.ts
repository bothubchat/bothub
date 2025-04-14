import { styled } from 'styled-components';
import { animated } from '@react-spring/web';
import { MenuDotIcon } from '@/ui/icons/menu-dot';
import { Typography } from '@/ui/components/typography';

export const SidebarDropdownStyled = styled.div``;

export const SidebarDropdownTogglerIcon = styled(MenuDotIcon).attrs({
  size: 18
})`
  rotate: 90deg;
`;

export const SidebarDropdownTogglerText = styled(Typography)``;

export const SidebarDropdownToggler = styled.button`
  background: none;
  padding: 0;
  margin: 0;
  display: flex;
  outline: none;
  border: none;
  cursor: pointer;
  align-items: center;
`;

export const SidebarDropdownContent = styled(animated.div)`
  position: absolute;
  right: 0px;
`;

export const SidebarDropdownList = styled.ul``;
