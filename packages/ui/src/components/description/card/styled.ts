import { css, styled } from 'styled-components';
import { Typography, TypographyProps } from '@/ui/components/typography';
import { Button } from '@/ui/components/button';
import { DescriptionCardVariant, TDescriptionCard } from './types';

export interface DescriptionCardBorderWrapperProps {
  $variant: DescriptionCardVariant;
}

export const DescriptionCardBorderWrapper = styled.div<DescriptionCardBorderWrapperProps>`
  padding: 1px;
  border-radius: 12px;
  height: 100%;
  width: 100%;
  ${({ $variant, theme }) => {
    switch ($variant) {
      case 'tertiary':
        return css`
          background: radial-gradient(
            50% 100% at 150px -10%,
            ${theme.colors.accent.primary},
            rgba(0, 0, 0, 0)
          );
        `;
      default:
        return css``;
    }
  }}
`;

export interface DescriptionCardBackgroundWrapperProps {
  $variant: DescriptionCardVariant;
}

export const DescriptionCardBackgroundWrapper = styled.div<DescriptionCardBackgroundWrapperProps>`
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  height: 100%;
  width: 100%;
`;

export const DescriptionCardContent = styled.div<{
  $variant: DescriptionCardVariant;
}>`
  width: 100%;
  height: 100%;
  position: relative;
  box-sizing: border-box;
  ${({ $variant, theme }) => {
    switch ($variant) {
      case 'tertiary':
        return css`
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          padding: 24px 20px;
          @media (max-width: ${theme.tablet.maxWidth}) {
            padding: 24px 18px;
          }
          @media (max-width: ${theme.mobile.maxWidth}) {
            padding: 24px 14px;
          }
        `;
      case 'quaternary':
        return css`
          padding: 28px 24px;
          @media (max-width: ${theme.tablet.maxWidth}) {
            padding: 24px 18px;
            align-items: center;
          }
          @media (max-width: ${theme.mobile.maxWidth}) {
            padding: 30px 16px;
          }
        `;
      default:
        return css`
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          padding: 34px;
          @media (max-width: ${theme.tablet.maxWidth}) {
            padding: 18px;
          }
          @media (max-width: ${theme.mobile.maxWidth}) {
            padding: 16px;
          }
        `;
    }
  }}
`;

export const DescriptionCardBackground = styled.div<{
  $variant: DescriptionCardVariant;
}>`
  position: absolute;
  width: 100%;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  pointer-events: none;
  ${({ theme, $variant }) => {
    switch ($variant) {
      case 'tertiary':
        return css`
          background-color: ${theme.colors.grayScale.gray4};
        `;
      default:
    }
  }}
`;

export interface DescriptionCardTitleProps extends TypographyProps {
  $variant: DescriptionCardVariant;
}

export const DescriptionCardTitle = styled(Typography).attrs({
  variant: 'body-xl-semibold',
  component: 'h3'
})`
  z-index: 1;
  color: ${({ theme }) => theme.default.colors.base.white};
`;

export const DescriptionCardTertiaryTitle = styled(Typography).attrs({
  variant: 'body-m-semibold'
})`
  margin-top: 16px;
  @media (max-width: ${({ theme }) => theme.tablet.maxWidth}) {
    margin-top: 14px;
  }
  @media (max-width: ${({ theme }) => theme.mobile.maxWidth}) {
    margin-top: 10px;
  }
`;

export const DescriptionCardText = styled(Typography).attrs({
  variant: 'body-m-regular',
  component: 'p'
})`
  z-index: 2;
  color: ${({ theme }) => theme.default.colors.base.white};
  margin-top: 16px;
`;

export const DescriptionCardTertiaryText = styled(Typography).attrs({
  variant: 'body-m-regular',
  component: 'p'
})`
  margin-top: 12px;
`;

export const DescriptionCardButtonsWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  column-gap: 16px;
  z-index: 2;
  @media (max-width: 550px) {
    margin-bottom: 0px;
    margin-left: auto;
    margin-right: auto;
  }
`;
export const DescriptionCardButton = styled(Button)``;

export const DescriptionCardStyled = styled.div<{
  $variant: DescriptionCardVariant;
  $descriptionCardType?: TDescriptionCard;
}>`
  display: flex;
  width: 100%;
  min-height: 180px;
  max-width: 630px;
  aspect-ratio: auto;
  ${({ $variant, theme, $descriptionCardType }) =>
    $variant === 'main' &&
    css`
      height: ${$descriptionCardType === 'collaborate' ? '498px' : '476px'};
      @media (max-width: 1600px) {
        height: ${$descriptionCardType === 'collaborate' && '565px'};
      }
      @media (max-width: 1100px) {
        height: ${$descriptionCardType === 'products' && '603px'};
      }
      @media (max-width: 912px) {
        height: ${$descriptionCardType === 'collaborate' && '603px'};
      }
      @media (max-width: ${theme.mobile.maxWidth}) {
        height: ${$descriptionCardType === 'collaborate' ? '628px' : '528px'};
      }
      ${DescriptionCardContent} {
        > ${DescriptionCardTitle} {
          text-align: center;
        }
        > ${DescriptionCardButtonsWrapper} {
          margin: auto 0;
          margin-top: 20px;
        }
      }
      ${DescriptionCardBackground} {
        background-repeat: no-repeat;
        background-position: bottom right;
      }
    `}
  ${({ $variant, theme }) =>
    $variant === 'secondary' &&
    css`
      @media (max-width: ${theme.mobile.maxWidth}) {
        min-height: auto;
        height: auto;
        ${DescriptionCardBackground} {
          background-size: cover;
        }
      }
    `}
  ${({ theme, $variant }) =>
    $variant === 'tertiary' &&
    css`
      max-width: 300px;
      @media (max-width: ${theme.tablet.maxWidth}) {
        max-width: 365px;
      }
    `}
`;

export const DescriptionCardUlStyled = styled.ul`
  margin: 0;
  padding: 0;
  padding-right: 20px;
  z-index: 2;
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  row-gap: 16px;

  @media (min-width: 1600px) {
    padding-right: 60px;
  }
`;

export const DescriptionCardLiStled = styled.li`
  margin: 0;
  list-style: none;
  padding: 0;
  display: flex;
  z-index: 2;
  align-items: center;
  column-gap: 16px;
`;
export const DescriptionCardLiContent = styled(Typography).attrs({
  variant: 'body-m-medium'
})``;
