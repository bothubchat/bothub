import { styled } from 'styled-components';

export const Main = styled.main`
  overflow: clip;
  min-width: ${({ theme }) => theme.mobile.minWidth};
  width: 100%;
  opacity: 1;
`;
