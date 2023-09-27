import { styled } from "styled-components";
import { Button } from "../../../button";

export const HeaderMenuToggleButtonStyled = styled(Button)`
  @media not (max-width: ${({ theme }) => theme.tablet.maxWidth}) {
    display: none;
  }
`;