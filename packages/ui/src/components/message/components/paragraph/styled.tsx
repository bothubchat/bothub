import { css, styled } from 'styled-components';
import { Typography } from '@/ui/components/typography';

export interface MessageParagraphStyledProps {
  $disableMargin: boolean;
}

export const MessageParagraphStyled = styled(Typography).attrs({ variant: 'body-m-regular', component: 'p' })<MessageParagraphStyledProps>`
  color: ${({ theme }) => theme.colors.base.white};
  ${({ $disableMargin }) => !$disableMargin && css`
    margin: 10px 0px;
  `}
  &::selection {
    background: ${({ theme }) => theme.colors.base.white};
    color: ${({ theme }) => theme.colors.accent.primary};
  }
`;
