import { css, styled } from 'styled-components';
import { HeaderVariant } from '../types';

export interface HeaderNavStyledProps {
  $variant: HeaderVariant;
  $inMenu: boolean;
}

export const HeaderNavStyled = styled.nav<HeaderNavStyledProps>`
  ${({ $variant, $inMenu }) => {
    if ($inMenu) {
      return css`
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 38px;
        width: 100%;
      `;
    }

    return css`
      display: flex;
      align-items: center;
      height: 34px;
      gap: 34px;
      padding-left: 24px;
      margin-left: 24px;
      ${() => {
    switch ($variant) {
      case 'main-page':
        return css`
          border-left: 1px solid ${({ theme }) => theme.colors.grayScale.gray3};
        `;
      case 'dashboard':
        return css``;
    }
  }}
    `;
  }}
`;
