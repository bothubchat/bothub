import { styled, css } from 'styled-components';
import { HeaderVariant } from '../../types';

export interface HeaderNavLinkStyledProps {
  $variant: HeaderVariant;
  $inMenu: boolean;
  $active: boolean;
}

export const HeaderNavLinkStyled = styled.a<HeaderNavLinkStyledProps>`
  ${({ theme, $variant, $inMenu, $active }) => {
    if ($variant === 'main' && $inMenu) {
      return css`
        font-weight: 600;
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
              font-weight: 600;
              &:hover {
                color: ${theme.colors.accent.primaryLight};
              }
            `;
          case 'dashboard':
            return css`
              align-items: center;
              gap: 10px;
              font-weight: 500;
              opacity: ${$active ? 1 : 0.5};
              ${!$active &&
              css`
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

export const HeaderNavLinkIcon = styled.div`
  display: inline-flex;
  width: 38px;
  height: 38px;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.grayScale.gray3};
`;
