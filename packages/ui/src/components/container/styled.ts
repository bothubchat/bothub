import { css, styled } from 'styled-components';

export interface ContainerStyledProps {
  $disabled: boolean;
}

export const ContainerStyled = styled.div<ContainerStyledProps>`
  ${({ theme, $disabled }) =>
    !$disabled &&
    css`
      width: 100%;
      max-width: 1370px;
      margin: auto;
      padding: 0px 40px;
      @media (max-width: ${theme.mobile.maxWidth}) {
        padding: 0px 30px;
      }
      @media (max-width: ${theme.mobile.maxWidth}) {
        padding: 0px 16px;
      }
    `}
`;
