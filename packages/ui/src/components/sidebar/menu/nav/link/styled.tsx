import { css, styled } from 'styled-components';
import { Typography } from '@/ui/components/typography';
import { adaptive } from '@/ui/adaptive';

export interface SidebarMenuNavLinkStyledProps {
  $active: boolean;
  $fill: boolean;
  $stroke: boolean;
}

export const SidebarMenuNavLinkStyled = styled.a<SidebarMenuNavLinkStyledProps>`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  ${({ $active }) => !$active && css`
    transition: 0.25s opacity;
    &:hover {
      opacity: 1;
    }
  `}
  ${({
  $active, $fill, $stroke, theme
}) => $active && css`
    svg path {
      ${$fill && `fill: ${theme.colors.accent.primary}`}
      ${$stroke && `stroke: ${theme.colors.accent.primary}`}
    }
  `}
`;

export const SidebarMenuNavIcon = styled.div`
  display: inline-flex;
  width: 38px;
  height: 38px;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.grayScale.gray3};
`;

export const SidebarMenuNavLinkText = styled(Typography).attrs({ variant: 'body-m-medium' }) <{ $open?: boolean }>`
  ${({ $open }) => (!$open ? adaptive({
  variant: 'dashboard',
  desktop: css`
      display: none;
    `,
  tablet: css`
      display: flex;
      `,
  mobile: css`
      display: flex;
      `
}) : adaptive({
  variant: 'dashboard',
  desktop: css`
      display: flex;
    `,
  tablet: css`
      display: none;
      `,
}))}
`;
