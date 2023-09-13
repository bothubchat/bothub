import styled, { css } from 'styled-components';
import { LinkAlign } from './types';

export interface LinkStyledProps {
  $align: LinkAlign;
  $fullWidth: boolean;
}

export const LinkStyled = styled.a<LinkStyledProps>`
  font-family: ${({ theme }) => theme.fonts.ibmPlexSans.medium};
  font-size: 16px;
  line-height: 22px;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.accent.primary};
  text-align: ${({ $align }) => $align};
  cursor: pointer;
  ${({ $fullWidth }) => $fullWidth && css`
    width: 100%;
  `}
  &:hover {
    color: ${({ theme }) => theme.colors.accent.primaryLight};
  }
`;
