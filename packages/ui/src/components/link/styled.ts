import { styled, css } from 'styled-components';
import { LinkAlign } from './types';
import { themeVar } from '@/ui/theme';

export interface LinkStyledProps {
  $align: LinkAlign;
  $fullWidth: boolean;
}

export const LinkStyled = styled.a<LinkStyledProps>`
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  text-decoration: none;
  color: ${({ theme }) => themeVar(theme, 'colors.accent.primary')};
  text-align: ${({ $align }) => $align};
  cursor: pointer;
  ${({ $fullWidth }) =>
    $fullWidth &&
    css`
      width: 100%;
    `}
  &:hover {
    color: ${({ theme }) => themeVar(theme, 'colors.accent.primaryLight')};
  }
`;
