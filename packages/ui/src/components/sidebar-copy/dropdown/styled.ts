import { styled } from 'styled-components';
import { animated } from '@react-spring/web';
import { MenuDotIcon } from '@/ui/icons/menu-dot';
import { Typography } from '@/ui/components/typography';
import { colorToRgba } from '@/ui/utils';

export const SidebarDropdownStyled = styled.div`
  display: flex;
  position: relative;
`;

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
  position: fixed;
  transform-origin: top right;
  margin-top: 16px;
  top: 0px;
  border: 1px solid ${({ theme }) => theme.colors.grayScale.gray2};
  border-radius: 8px;
  padding: 8px;
  z-index: 1;
  &::before {
    content: '';
    position: absolute;
    border-radius: 8px;
    z-index: -1;
    width: 100%;
    height: 100%;
    top: 0px;
    right: 0px;
    background: rgba(${({ theme }) => colorToRgba(theme.colors.grayScale.gray4)}, 0.75);
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
  }
`;

export const SidebarDropdownList = styled.div`
  min-width: 150px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  overflow: hidden;
`;

export const SidebarDropdownItemStyled = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  z-index: 2;
  gap: 10px;
  padding: 10px;
  background: none;
  margin: 0;
  outline: none;
  border: none;
  cursor: pointer;
  border-radius: 8px;
  &:hover {
    background: ${({ theme }) => theme.colors.grayScale.gray3};
  }
`;

export const SidebarDropdownItemText = styled(Typography).attrs({
  variant: 'body-m-regular',
  component: 'span'
})``;
