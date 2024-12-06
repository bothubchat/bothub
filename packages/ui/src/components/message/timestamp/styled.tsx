import { styled, css } from 'styled-components';
import { Typography } from '@/ui/components/typography';
import { adaptive } from '@/ui/adaptive';
import { MessageVariant } from '../types';

export const TimestampStyled = styled.div`
  margin-top: auto;
  width: fit-content;
  height: fit-content;
  display: flex;
  justify-content: flex-end;
`;

export const TimestampText = styled(Typography).attrs({
  variant: 'body-s-regular',
})<{ $variant: MessageVariant }>`
  color: ${({ theme, $variant }) => ($variant === 'assistant' ? theme.colors.base.white : theme.default.colors.base.white)};
  ${adaptive({
    desktop: css`
      font-size: 12px;
    `,
    tablet: css`
      font-size: 10px;
    `,
    mobile: css`
      font-size: 10px;
    `
  })}
`;
