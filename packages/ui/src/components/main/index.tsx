import { styled } from "styled-components";

export const Main = styled.main`
  overflow: hidden;
  min-width: ${({ theme }) => theme.mobile.minWidth};
  width: 100%;
`;
