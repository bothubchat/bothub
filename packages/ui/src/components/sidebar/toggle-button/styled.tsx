import { styled } from 'styled-components';
import { Button } from '@/ui/components/button';

export const SidebarToggleButtonStyled = styled(Button).attrs({
  variant: 'text'
})<{ $isOpen: boolean }>`
  &:hover {
    svg path {
      fill: ${({ theme }) =>
        theme.mode === 'light'
          ? theme.default.colors.accent.primary
          : theme.colors.base.white} !important;
    }
  }
`;
