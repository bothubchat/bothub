import { styled } from 'styled-components';

export const TariffListStyled = styled.form`
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  grid-template-columns: repeat(2, 1fr);
  grid-template-areas: 'FREE DELUXE' 'BASIC ELITE' 'PREMIUM ENTERPRISE';
  gap: 20px;
  @media (max-width: ${({ theme }) => theme.tablet.maxWidth}) {
    gap: 18px;
  }
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(6, 1fr);
    grid-template-areas: 'FREE' 'BASIC' 'PREMIUM' 'DELUXE' 'ELITE' 'ENTERPRISE';
    gap: 14px;
  }
`;
