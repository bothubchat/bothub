import { styled, css } from 'styled-components';

export const HeaderUserStyled = styled.div<{ $inMenu: boolean }>`
  display: flex;
  align-items: center;
  ${({ $inMenu }) => {
    if ($inMenu) {
      return css`
        width: 100%;
        @media not (max-width: ${({ theme }) => theme.mobile.maxWidth}) {
          display: none;
        }
      `;
    }

    return css`
      @media (max-width: ${({ theme }) => theme.mobile.maxWidth}) {
        display: none;
      }
    `;
  }}
`;
