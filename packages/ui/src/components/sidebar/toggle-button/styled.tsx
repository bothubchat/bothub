import { styled } from 'styled-components';
import { Button } from '@/ui/components/button';

export const SidebarToggleButtonStyled = styled(Button).attrs({ variant: 'text' })`
  &:hover {
    svg path {
      fill: ${({ theme }) => theme.colors.base.white} !important;
    }
  }
`;
