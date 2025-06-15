import { createGlobalStyle, css } from 'styled-components';
import { ScrollbarStyle } from '@/ui/components/scrollbar';

export interface BothubGlobalStyleProps {
  $margin?: string;
}

export const BothubGlobalStyleStyled = createGlobalStyle<BothubGlobalStyleProps>`
  body {
    transition: background-color 0.3s;
    background: ${({ theme }) => theme.colors.base.black};
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
    color: ${({ theme }) => theme.colors.base.white};
  }
`;
