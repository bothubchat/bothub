import { styled } from 'styled-components';
import React from 'react';
import { animated, AnimatedProps } from '@react-spring/web';
import { ArrowDownIcon } from '@/ui/icons/arrow-down';
import { MenuDotIcon } from '@/ui/icons/menu-dot';
import { Typography } from '../../typography';

export const SidebarDropdownStyled = styled.div`
  width: 24px;
  margin-left: 16px;
`;

export const SidebarDropdownTogglerIcon = styled(MenuDotIcon).attrs({ size: 18 })`
  pointer-events: none;
`;

export const SidebarDropdownTogglerText = styled(Typography)`
  text-transform: uppercase;
  font-size: 16px;
  font-weight: 700;
  line-height: 22px;
  pointer-events: none;
`;

export const SidebarDropdownTogglerArrow = styled(ArrowDownIcon).attrs({ size: 16 })`
  pointer-events: none;
`;

export const SidebarDropdownToggler = styled.button<{ $open: boolean }>`
  display: flex;
  background: none;
  border: none;
  transform: rotate(90deg);
  outline: none;
  align-items: center;
  cursor: pointer;
  gap: 6px;
  `;

export const SidebarDropdownContent: React.FC<AnimatedProps<React.ComponentProps<'div'>>> = styled(animated.div)`
  display: flex;
  position: fixed;
  transform-origin: top left;
  z-index: ${({ theme }) => theme.zIndex.menu};
`;

export const SidebarDropdownList = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  border: 1px solid ${({ theme }) => (theme.mode === 'light' ? theme.colors.grayScale.gray3 : theme.colors.grayScale.gray2)};
  border-radius: 8px;
  overflow: hidden;
  list-style: none;
  padding: 0px;
  background: ${({ theme }) => theme.colors.grayScale.gray4};
  opacity: 0.8;
  padding: 8px;
  box-sizing: border-box;
`;
