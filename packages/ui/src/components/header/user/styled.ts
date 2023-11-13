import { styled, css } from 'styled-components';
import { adaptive } from '@/ui/adaptive';
import { HeaderVariant } from '../types';

export interface HeaderUserStyledProps {
  $variant: HeaderVariant;
  $inMenu: boolean;
}

export const HeaderUserStyled = styled.div<HeaderUserStyledProps>`
  display: flex;
  align-items: center;
  ${({ $variant, $inMenu }) => {
    if ($inMenu) {
      const adaptiveStyle = adaptive({
        variant: $variant,
        desktop: css`
          display: none;
        `,
        tablet: css`
          display: none;
        `
      });

      return css`
        width: 100%;
        ${adaptiveStyle}
      `;
    }

    return adaptive({
      variant: $variant,
      mobile: css`
        display: none;
      `
    });
  }}
`;
