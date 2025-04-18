import { styled } from 'styled-components';
import { animated } from '@react-spring/web';
import { MenuDotIcon } from '@/ui/icons/menu-dot';
import { Typography } from '@/ui/components/typography';

export const SidebarDropdownStyled = styled.div`
  display: flex;
  position: relative;
  z-index: 0;

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
  position: absolute;
  transform-origin: top right;
  margin-top: 16px;
  top: 0px;
  right: 0px;
  border: 1px solid ${({ theme }) => theme.colors.grayScale.gray2};
  border-radius: 8px;
  padding: 8px;
  &::before {
    content: '';
    position: absolute;
    border-radius: 8px;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    background: ${({ theme }) => theme.colors.grayScale.gray4};
    opacity: 0.75;
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
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
  z-index: 1;
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
