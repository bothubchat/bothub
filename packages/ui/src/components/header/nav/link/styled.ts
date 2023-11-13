import { styled, css } from 'styled-components';
import { HeaderVariant } from '../../types';

export interface HeaderNavLinkStyledProps {
  $variant: HeaderVariant;
  $inMenu: boolean;
  $active: boolean;
}

export const HeaderNavLinkStyled = styled.a<HeaderNavLinkStyledProps>`
  ${({
    theme, $variant, $inMenu, $active 
  }) => {
    if ($variant === 'main' && $inMenu) {
      return css`
        font-family: ${theme.fonts.ibmPlexSans.semiBold};
        font-size: 16px;
        line-height: 22px;
        color: ${theme.colors.base.white};
        &:hover {
          color: ${theme.colors.accent.primaryLight};
        }
      `;
    }

    return css`
      display: inline-flex;
      text-decoration: none;
      font-size: 16px;
      line-height: 22px;
      cursor: pointer;
      color: ${theme.colors.base.white};
      ${() => {
    switch ($variant) {
      case 'main':
        return css`
          font-family: ${theme.fonts.ibmPlexSans.semiBold};
          &:hover {
            color: ${theme.colors.accent.primaryLight};
          }
        `;
      case 'dashboard':
        return css`
          align-items: center;
          gap: 10px;
          font-family: ${theme.fonts.ibmPlexSans.medium};
          opacity: ${$active ? 1 : 0.5};
          ${!$active && css`
            &:hover {
              opacity: 1;
            }
          `}
        `;
    }
  }}
    `;
  }}
`;
