import { css, styled } from 'styled-components';
import { HTMLMotionProps, motion } from 'framer-motion';
import React from 'react';
import { DarkIcon } from '@/ui/icons/dark';
import { adaptive } from '@/ui/adaptive';

export interface SidebarThemeSwitcherStyledProps {
  $open: boolean;
}

export const SidebarThemeSwitcherStyled = styled.button<SidebarThemeSwitcherStyledProps>`
  display: ${({ $open }) => (
    $open ? 'inline-flex' : 'none'
  )};
  width: 100%;
  overflow: hidden;
  align-items: center;
  cursor: pointer;
  background: ${({ theme }) => theme.colors.grayScale.gray3};
  border: none;
  border-radius: 14px;
  padding: 8px;
  ${adaptive({
    variant: 'dashboard',
    merge: true,
    tablet: css`
      display: none;
    `
  })}
`;

export const SidebarThemeSwitcherList = styled.span`
  display: flex;
  align-items: center;
  gap: 6px;
  width: 100%;
`;

export const SidebarThemeSwitcherItem = styled.span`
  display: inline-flex;
  position: relative;
  border-radius: 12px;
  width: 100%;
  padding: 6px;
`;

export const SidebarThemeSwitcherItemBackground: React.FC<HTMLMotionProps<'span'>> = styled(motion.span)`
  display: inline-flex;
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  border: 1px solid ${({ theme }) => theme.colors.grayScale.gray2};
  border-radius: inherit;
  background: ${({ theme }) => theme.colors.grayScale.gray4};
`;

export const SidebarThemeSwitcherItemContent = styled.span`
  display: inline-flex;
  position: relative;
  width: 100%;
  justify-content: center;
`;

export const SidebarThemeSwitcherIcon = styled(DarkIcon)``;
