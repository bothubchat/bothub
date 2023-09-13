import styled, { css } from "styled-components";

export const HeaderNavLinkStyled = styled.a<{ $inMenu: boolean }>`
  ${({ theme, $inMenu }) => {
    if ($inMenu) {
      return css`
        font-family: ${theme.fonts.ibmPlexSans.semiBold};
        font-size: 16px;
        line-height: 22px;
        color: ${theme.colors.base.white};
      `;
    }

    return css`
      display: inline-flex;
      text-decoration: none;
      color: ${theme.colors.base.white};
      font-size: 16px;
      font-family: ${theme.fonts.ibmPlexSans.semiBold};
      line-height: 22px;
      cursor: pointer;
      &:hover {
        color: ${theme.colors.accent.primaryLight};
      }
    `;
  }}
`;
