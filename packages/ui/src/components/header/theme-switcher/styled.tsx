import { styled, css } from 'styled-components';
import { HTMLMotionProps, motion } from 'framer-motion';
import React from 'react';
import { DarkIcon } from '@/ui/icons';
import { adaptive } from '@/ui/adaptive';

export interface HeaderThemeSwitcherStyledProps {
  $inMenu: boolean;
}

export const HeaderThemeSwitcherStyled = styled.button<HeaderThemeSwitcherStyledProps>`
  ${({ theme, $inMenu }) => {
    if ($inMenu) {
      const adaptiveStyle = adaptive({
        variant: 'dashboard',
        merge: true,
        desktop: css`
          display: none;
        `,
        miniTablet: css`
          display: inline-flex;
        `
      });

      return css`
        width: 100%;
        align-items: center;
        cursor: pointer;
        background: ${theme.colors.grayScale.gray3};
        border: none;
        border-radius: 20px;
        padding: 8px;
        ${adaptiveStyle}
      `;
    }

    const adaptiveStyle = adaptive({
      variant: 'dashboard',
      merge: true,
      desktop: css`
        display: inline-flex;
      `,
      miniTablet: css`
        display: none;
      `
    });

    return css`
      flex-shrink: 0;
      align-items: center;
      padding: 6px 8px;
      cursor: pointer;
      background: ${theme.colors.grayScale.gray3};
      border: none;
      border-radius: 20px;
      ${adaptiveStyle}
    `;
  }};
`;

export interface HeaderThemeSwitcherListProps {
  $inMenu: boolean;
}

export const HeaderThemeSwitcherList = styled.span<HeaderThemeSwitcherListProps>`
  display: flex;
  align-items: center;
  gap: 6px;
  ${({ $inMenu }) => $inMenu && css`
    width: 100%;
  `}
`;

export interface HeaderThemeSwitcherItemProps {
  $inMenu: boolean;
}

export const HeaderThemeSwitcherItem = styled.span<HeaderThemeSwitcherItemProps>`
  display: inline-flex;
  position: relative;
  border-radius: 12px;
  ${({ $inMenu }) => !$inMenu && css`
    padding: 8px;
  `}
  ${({ $inMenu }) => $inMenu && css`
    width: 100%;
    padding: 6px;
  `}
`;

export const HeaderThemeSwitcherItemBackground: React.FC<HTMLMotionProps<'span'>> = styled(motion.span)`
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

export interface HeaderThemeSwitcherItemContentProps {
  $inMenu: boolean;
}

export const HeaderThemeSwitcherItemContent = styled.span<HeaderThemeSwitcherItemContentProps>`
  display: inline-flex;
  position: relative;
  ${({ $inMenu }) => $inMenu && css`
    width: 100%;
    justify-content: center;
  `}
`;

export const HeaderThemeSwitcherIcon = styled(DarkIcon)``;
