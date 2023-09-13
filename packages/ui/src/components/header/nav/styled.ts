import { css, styled } from 'styled-components';

export const HeaderNavStyled = styled.nav<{ $inMenu: boolean }>`
  ${({ $inMenu }) => {
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
      border-left: 1px solid ${({ theme }) => theme.colors.grayScale.gray3};
      margin-left: 24px;
    `;
  }}
`;