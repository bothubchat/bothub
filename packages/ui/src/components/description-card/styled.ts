import { css, styled } from 'styled-components';
import { Typography } from '../typography';
import { Button } from '../button';
import bg from './assets/bg.png';
import mainBg from './assets/main-bg.png';
import { DescriptionCardVariant } from './types';

export const DescriptionCardBorderWrapper = styled.div`
  padding: 1px;
  background: radial-gradient(100% 100% at 0px 0px, ${({ theme }) => theme.colors.accent.primary}, rgba(0, 0, 0, 0.0));
  border-radius: 12px;
  height: 100%;
  width: 100%;
`;

export const DescriptionCardBackgroundWrapper = styled.div`
  position: relative;
  background: radial-gradient(80% 70% at 0px 0px, rgba(28, 100, 242, 0.38) 9.34%, rgba(0, 0, 0, 0.00) 100%), #121825;
  border-radius: 12px;
  height: 100%;
  overflow: hidden;
  width: 100%;
`;

export const DescriptionCardContent = styled.div`
  position: relative;
  padding: 47px 25px;
  width: 100%;
  @media (max-width: ${({ theme }) => theme.mobile.maxWidth}) {
    padding: 26px 10px;
  }
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

export const DescriptionCardTitle = styled(Typography).attrs({ variant: 'body-xl-semibold' })`
  @media (max-width: ${({ theme }) => theme.tablet.maxWidth}) {
    text-align: center;
  }
`;

export const DescriptionCardText = styled(Typography).attrs({ variant: 'body-m-regular' })`
  margin-top: 16px;
  @media (max-width: ${({ theme }) => theme.tablet.maxWidth}) {
    text-align: center;
  }
`;

export const DescriptionCardButton = styled(Button)`
  margin-top: 20px;
  @media (max-width: ${({ theme }) => theme.tablet.maxWidth}) {
    display: block;
    margin: auto;
    margin-top: 14px;
  }
`;

export const DescriptionCardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
  @media (max-width: ${({ theme }) => theme.tablet.maxWidth}) {
    grid-template-columns: 1fr;
    justify-items: center;
  }
`;

export const DescriptionCardStyled = styled.div<{ $variant: DescriptionCardVariant }>`
  display: flex;
  width: 100%;
  min-height: 244px;
  max-width: 630px;
  ${({ $variant }) => $variant === 'main' && css`
    height: 512px;
    @media (max-width: ${({ theme }) => theme.mobile.maxWidth}) {
      height: 380px;
    }
    ${DescriptionCardContent} {
      > ${DescriptionCardTitle} {
        text-align: center;
      }
      > ${DescriptionCardText} {
        text-align: center;
      }
      > ${DescriptionCardButton} {
        display: block;
        margin: auto;
        margin-top: 20px;
      }
    }
    ${DescriptionCardBackground} {
      background-image: url(${mainBg});
      background-size: contain;
      background-repeat: no-repeat;
      background-position: bottom;
    }
  `}
  ${({ $variant }) => $variant === 'secondary' && css`
    @media (max-width: ${({ theme }) => theme.mobile.maxWidth}) {
      min-height: auto;
      height: auto;
      ${DescriptionCardBackground} {
        background-size: cover;
      }
    }
  `}
`;
