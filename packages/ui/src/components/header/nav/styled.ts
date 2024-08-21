import { css, styled } from 'styled-components';
import { HeaderVariant } from '../types';
import { adaptive } from '@/ui/adaptive';
import { MenuDropdown } from '../../menu-dropdown';

export interface HeaderNavStyledProps {
  $variant: HeaderVariant;
  $inMenu: boolean;
  isAdmin?: boolean;
}

export const HeaderNavStyled = styled.nav<HeaderNavStyledProps>`
  ${({ $variant, $inMenu }) => {
    if ($inMenu) {
      const adaptiveStyle = adaptive({
        variant: $variant,
        tablet: css`
          gap: 38px;
        `,
        mobile: css`
          gap: 30px;
        `
      });

      return css`
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        width: 100%;
        ${adaptiveStyle}
      `;
    }

    const variantStyle = () => {
      switch ($variant) {
        case 'main':
          return css`
            border-left: 1px solid ${({ theme }) => theme.colors.grayScale.gray3};
          `;
        case 'dashboard':
          return css``;
      }
    };
    const adaptiveStyle = adaptive({
      variant: $variant,
      merge: true,
      tablet: css`
        display: none;
      `
    });

    return css`
      display: flex;
      align-items: center;
      height: 34px;
      gap: 34px;
      padding-left: 24px;
      margin-left: 24px;
      ${adaptiveStyle}
      ${variantStyle}
    `;
  }}
  ${({ isAdmin }) => {
    if (isAdmin) {
      return css`
        @media (min-width: 1060px) and (max-width: 1360px) {
          display: none;
        }
      `;
    }
  }}
`;

export const HeaderMenuDropdownStyled = styled(MenuDropdown)<{ $isAdmin?: boolean }>`
  display: none;
  @media (min-width: 1061px) and (max-width: 1360px) {
    margin-left: 24px;
    display: ${({ $isAdmin }) => $isAdmin ? 'block' : 'none'}
  }
`;