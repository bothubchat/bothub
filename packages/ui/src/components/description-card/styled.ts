import { styled } from 'styled-components';
import { Typography } from '../typography';
import { Button } from '../button';
import bg from './assets/bg.png';

export const DescriptionCardStyled = styled.div`
  position: relative;
  border-radius: 12px;
  border: 1px solid #1C64F2;
  overflow: hidden;
  background: radial-gradient(157.56% 151.49% at 17.46% -47.95%, rgba(28, 100, 242, 0.38) 9.34%, rgba(0, 0, 0, 0.00) 100%), #121825;
`;

export const DescriptionCardContent = styled.div`
  position: relative;
  padding: 47px 25px;
`;

export const DescriptionCardBackground = styled.div`
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  pointer-events: none;
  background-image: url(${bg});
`;

export const DescriptionCardTitle = styled(Typography).attrs({ variant: 'body-xl-semibold' })``;

export const DescriptionCardText = styled(Typography).attrs({ variant: 'body-m-regular' })`
  margin-top: 16px;
`;

export const DescriptionCardButton = styled(Button)`
  margin-top: 20px;
`;

export const DescriptionCardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
`;
