import { css, styled } from 'styled-components';
import { TypographyAlign, TypographyVariant } from './types';

export interface TypographyStyledProps {
  $variant: TypographyVariant;
  $align: TypographyAlign;
  $fullWidth: boolean;
}

export const TypographyStyled = styled.span<TypographyStyledProps>`
  margin: 0px;
  color: ${({ theme }) => theme.colors.base.white};
  font-weight: normal;
  text-decoration: none;
  text-align: ${({ $align }) => $align};
  ${({ $fullWidth }) => $fullWidth && css`
    width: 100%;
  `}
  ${({ theme, $variant }) => {
    switch ($variant) {
      case 'h1':
        return css`
          font-family: ${theme.fonts.ibmPlexSans.bold};
          font-size: 46px;
          line-height: 60px;
          @media (max-width: ${theme.mobile.maxWidth}) {
            font-size: 28px;
            line-height: 36px;
          }
        `;
      case 'h2':
        return css`
          font-family: ${theme.fonts.ibmPlexSans.semiBold};
          font-size: 34px;
          line-height: 44px;
          @media (max-width: ${theme.mobile.maxWidth}) {
            font-size: 24px;
            line-height: 32px;
          }
        `;
      case 'h3':
        return css`
          font-family: ${theme.fonts.ibmPlexSans.semiBold};
          font-size: 30px;
          line-height: 40px;
          @media (max-width: ${theme.mobile.maxWidth}) {
            font-size: 22px;
            line-height: 30px;
          }
        `;
      case 'body-xxl-semibold':
        return css`
          font-family: ${theme.fonts.ibmPlexSans.semiBold};
          font-size: 26px;
          line-height: 34px;
          @media (max-width: ${theme.tablet.maxWidth}) {
            font-size: 22px;
            line-height: 30px;
          }
          @media (max-width: ${theme.mobile.maxWidth}) {
            font-size: 20px;
            line-height: 26px;
          }
        `;
      case 'body-xl-semibold':
        return css`
          font-family: ${theme.fonts.ibmPlexSans.semiBold};
          font-size: 22px;
          line-height: 29px;
          @media (max-width: ${theme.tablet.maxWidth}) {
            font-size: 20px;
            line-height: 26px;
          }
          @media (max-width: ${theme.mobile.maxWidth}) {
            font-size: 18px;
            line-height: 24px;
          }
        `;
      case 'body-m-semibold':
        return css`
          font-family: ${theme.fonts.ibmPlexSans.semiBold};
          font-size: 16px;
          line-height: 22px;
          @media (max-width: ${theme.tablet.maxWidth}) {
            font-size: 14px;
            line-height: 18px;
          }
        `;
      case 'body-m-medium':
        return css`
          font-family: ${theme.fonts.ibmPlexSans.medium};
          font-size: 16px;
          line-height: 22px;
          @media (max-width: ${theme.tablet.maxWidth}) {
            font-size: 14px;
            line-height: 18px;
          }
        `;
      case 'body-m-regular':
        return css`
          font-family: ${theme.fonts.ibmPlexSans.regular};
          font-size: 16px;
          line-height: 22px;
          @media (max-width: ${theme.tablet.maxWidth}) {
            font-size: 14px;
            line-height: 18px;
          }
        `;
      case 'body-s-medium':
        return css`
          font-family: ${theme.fonts.ibmPlexSans.medium};
          font-size: 14px;
          line-height: 18px;
          @media (max-width: ${theme.tablet.maxWidth}) {
            font-size: 12px;
            line-height: 16px;
          }
        `;
      case 'body-xs-regular':
        return css`
          font-family: ${theme.fonts.ibmPlexSans.regular};
          font-size: 12px;
          line-height: 16px;
          @media (max-width: ${theme.tablet.maxWidth}) {
            font-size: 10px;
            line-height: 16px;
          }
        `;
      case 'button-sm':
        return css`
          font-family: ${theme.fonts.ibmPlexSans.medium};
          font-size: 15px;
          line-height: 20px;
        `;
      case 'button-md':
        return css`
          font-family: ${theme.fonts.ibmPlexSans.medium};
          font-size: 18px;
          line-height: 24px;
        `;
      case 'input-md':
        return css`
          font-family: ${theme.fonts.ibmPlexSans.regular};
          font-size: 16px;
          line-height: 22px;
        `;
      case 'input-sm':
        return css`
          font-family: ${theme.fonts.ibmPlexSans.regular};
          font-size: 14px;
          line-height: 18px;
        `;
      default:
        return css``;
    }
  }}
`;
