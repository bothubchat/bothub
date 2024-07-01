import { css, styled } from 'styled-components';
import { Typography } from '@/ui/components/typography';

export interface SidebarMenuNavLinkStyledProps {
  $active: boolean;
}

export const SidebarMenuNavLinkStyled = styled.a<SidebarMenuNavLinkStyledProps>`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  ${({ $active }) => !$active && css`
    transition: 0.25s opacity;
    opacity: 0.5;
    &:hover {
      opacity: 1;
    }
  `}
`;

export const SidebarMenuNavLinkText = styled(Typography).attrs({ variant: 'body-m-medium' })``;
