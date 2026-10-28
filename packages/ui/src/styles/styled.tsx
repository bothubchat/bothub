import { createGlobalStyle, css } from 'styled-components';
import { ScrollbarStyle } from '@/ui/components/scrollbar';
import { themeVar } from '@/ui/theme';

export interface BothubGlobalStyleProps {
  $margin?: string;
}

export const BothubGlobalStyleStyled = createGlobalStyle<BothubGlobalStyleProps>`
  body {
    transition: background-color 0.3s;
    background: ${({ theme }) => themeVar(theme, 'colors.base.black')};
    ${ScrollbarStyle}
    ${({ $margin }) =>
      typeof $margin === 'string' &&
      css`
        margin: ${$margin} !important;
      `}
  }

  * {
    box-sizing: border-box;
  }

  a {
    text-decoration: none;
    color: ${({ theme }) => themeVar(theme, 'colors.base.white')};
  }
`;
