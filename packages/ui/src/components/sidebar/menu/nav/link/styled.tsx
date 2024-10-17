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
    &:hover {
      opacity: 1;
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

export const SidebarMenuNavLinkText = styled(Typography).attrs({ variant: 'body-m-medium' })``;
