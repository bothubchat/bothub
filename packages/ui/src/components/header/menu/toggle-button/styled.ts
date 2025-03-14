import { css, styled } from 'styled-components';
import { Button } from '../../../button';
import { HeaderVariant } from '../../types';
import { adaptive } from '@/ui/adaptive';

export interface HeaderMenuToggleButtonStyledProps {
  $variant: HeaderVariant;
}

export const HeaderMenuToggleButtonStyled = styled(
  Button
)<HeaderMenuToggleButtonStyledProps>`
  padding: 10px;
  ${adaptive(({ $variant }) => ({
    variant: $variant,
    desktop: css`
      display: none;
    `
  }))}
`;
