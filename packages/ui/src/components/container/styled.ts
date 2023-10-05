import { styled } from 'styled-components';

export const ContainerStyled = styled.div`
  width: 100%;
  max-width: 1370px;
  margin: auto;
  padding: 0px 40px;
  @media (max-width: ${({ theme }) => theme.mobile.maxWidth}) {
    padding: 0px 30px;
  }
`;
