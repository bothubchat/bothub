import { css, styled } from 'styled-components';
import { Button } from '@/ui/components/button';
import { adaptive } from '@/ui/adaptive';

export const SidebarToggleButtonStyled = styled(Button).attrs({
  variant: 'text',
  disableHoverColor: true,
})<{ $isOpen: boolean }>`
  &:hover {
    svg path {
      stroke: ${({ theme }) =>
        theme.mode === 'light'
          ? theme.default.colors.accent.primary
          : theme.colors.base.white} !important;
    }
  }
  ${adaptive({
    mobile: css`
      display: none;
    `,
  })}
`;
