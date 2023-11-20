import { css, styled } from 'styled-components';
import { HTMLMotionProps, motion } from 'framer-motion';
import React from 'react';
import { ArrowDownIcon, LanguageIcon } from '@/ui/icons';
import { Typography } from '../../typography';

export const HeaderLangDropdownStyled = styled.div``;

export const HeaderLangDropdownTogglerIcon = styled(LanguageIcon).attrs({ size: 18 })`
  pointer-events: none;
`;

export const HeaderLangDropdownTogglerText = styled(Typography)`
  text-transform: uppercase;
  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.ibmPlexSans.bold};
  line-height: 22px;
  pointer-events: none;
`;

export const HeaderLangDropdownTogglerArrow = styled(ArrowDownIcon).attrs({ size: 16 })`
  pointer-events: none;
`;

export const HeaderLangDropdownToggler = styled.button<{ $open: boolean }>`
  display: flex;
  background: none;
  border: none;
  outline: none;
  align-items: center;
  cursor: pointer;
  gap: 6px;
  &:hover {
    > ${HeaderLangDropdownTogglerIcon} > path {
      fill: ${({ theme }) => theme.colors.accent.primary};
    }
    > ${HeaderLangDropdownTogglerText} {
      color: ${({ theme }) => theme.colors.accent.primary};
    }
    > ${HeaderLangDropdownTogglerArrow} > path {
      stroke: ${({ theme }) => theme.colors.accent.primary};
    }
  }
  ${({ $open }) => $open && css`
    > ${HeaderLangDropdownTogglerIcon} > path {
      fill: ${({ theme }) => theme.colors.accent.primary};
    }
    > ${HeaderLangDropdownTogglerText} {
      color: ${({ theme }) => theme.colors.accent.primary};
    }
    > ${HeaderLangDropdownTogglerArrow} > path {
      stroke: ${({ theme }) => theme.colors.accent.primary};
    }
  `}
`;

export const HeaderLangDropdownContent: React.FC<React.ComponentProps<'div'> & HTMLMotionProps<'div'>> = styled(motion.div)`
  display: flex;
  position: fixed;
  transform-origin: top center;
`;

export const HeaderLangDropdownList = styled.ul`
  display: flex;
  flex-direction: column;
  border: 1px solid ${({ theme }) => (theme.mode === 'light' ? theme.colors.grayScale.gray3 : theme.colors.grayScale.gray2)};
  border-radius: 8px;
  overflow: hidden;
  list-style: none;
  padding: 0px;
  background: ${({ theme }) => (theme.mode === 'light' ? theme.colors.grayScale.gray4 : theme.colors.grayScale.gray3)};
  width: 80px;
  padding: 10px 16px;
  box-sizing: border-box;
`;
