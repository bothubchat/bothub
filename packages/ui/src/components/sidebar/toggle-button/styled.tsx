import { css, styled } from 'styled-components';
import { adaptive } from '@/ui/adaptive';

export const SidebarToggleButtonStyled = styled.button<{ $isOpen: boolean }>`
  all: unset;
  display: flex;
  align-items: center;
  &:hover {
    cursor: pointer;
    filter: brightness(1.2);
  }
  &:active {
    transform: translateY(1px);
    filter: brightness(0.9);
  }
  transition:
    filter 0.05s ease-out,
    transform 0.1s ease-out;
  ${adaptive({
    mobile: css`
      display: none;
    `
  })}
`;
