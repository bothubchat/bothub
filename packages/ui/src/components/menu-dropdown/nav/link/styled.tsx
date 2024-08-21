import { css, styled } from 'styled-components';
import { Typography } from '@/ui/components/typography';

export interface MenuDropdownNavLinkStyledProps {
  $active: boolean;
}

export const MenuDropdownNavLinkStyled = styled.a<MenuDropdownNavLinkStyledProps>`
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

export const MenuDropdownNavLinkText = styled(Typography).attrs({ variant: 'body-m-medium' })``;
