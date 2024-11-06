import { css, styled } from 'styled-components';
import React from 'react';
import { animated, AnimatedProps } from '@react-spring/web';
import { ArrowDownIcon } from '@/ui/icons/arrow-down';
import { LanguageIcon } from '@/ui/icons/language';
import { Typography } from '../../typography';

export const SidebarLangDropdownStyled = styled.div`
  z-index: ${({ theme }) => theme.zIndex.header + 1};
`;

export const SidebarLangDropdownTogglerIcon = styled(LanguageIcon).attrs({ size: 18 })`
  pointer-events: none;
`;

export const SidebarLangDropdownTogglerText = styled(Typography)`
  text-transform: uppercase;
  font-size: 16px;
  font-weight: 700;
  line-height: 22px;
  pointer-events: none;
`;

export const SidebarLangDropdownTogglerArrow = styled(ArrowDownIcon).attrs({ size: 16 })`
  pointer-events: none;
  transition: transform 0.2s ease-in-out;
`;

export const SidebarLangDropdownToggler = styled.button<{ $open: boolean }>`
  display: flex;
  background: none;
  border: none;
  outline: none;
  align-items: center;
  cursor: pointer;
  gap: 6px;
  transform-origin: top center;
  transition: opacity 0.15s ease-out, transform 0.15s ease-out;
  &:hover {
    > ${SidebarLangDropdownTogglerIcon} > path {
      fill: ${({ theme }) => theme.colors.accent.primary};
    }
    > ${SidebarLangDropdownTogglerText} {
      color: ${({ theme }) => theme.colors.accent.primary};
    }
    > ${SidebarLangDropdownTogglerArrow} > path {
      stroke: ${({ theme }) => theme.colors.accent.primary};
    }
  }
  ${({ $open }) => $open && css`
    > ${SidebarLangDropdownTogglerIcon} > path {
      fill: ${({ theme }) => theme.colors.accent.primary};
    }
    > ${SidebarLangDropdownTogglerText} {
      color: ${({ theme }) => theme.colors.accent.primary};
    }
    > ${SidebarLangDropdownTogglerArrow} > path {
      stroke: ${({ theme }) => theme.colors.accent.primary};
    }
  `}
`;

export const SidebarLangDropdownContent: React.FC<AnimatedProps<React.ComponentProps<'div'>>> = styled(animated.div)`
  display: flex;
  position: absolute;
  transform-origin: top center;
`;

export const SidebarLangDropdownList = styled.ul`
  display: flex;
  flex-direction: column;
  border: 1px solid ${({ theme }) => (theme.mode === 'light' ? theme.colors.grayScale.gray3 : theme.colors.grayScale.gray2)};
  border-radius: 8px;
  overflow: hidden;
  list-style: none;
  background: ${({ theme }) => (theme.mode === 'light' ? theme.colors.grayScale.gray4 : theme.colors.grayScale.gray3)};
  width: 80px;
  padding: 10px 16px;
  box-sizing: border-box;
  margin-block-start: 16px;
`;
