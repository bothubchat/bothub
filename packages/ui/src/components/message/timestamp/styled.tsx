import styled, { css } from 'styled-components';
import { Typography } from '../../typography';
import { adaptive } from '@/ui/adaptive';

export const TimestampStyled = styled.div`
  margin-top: auto;
  width: fit-content;
  height: fit-content;
  display: flex;
  justify-content: flex-end;
`;

export const TimestampText = styled(Typography).attrs({
  variant: 'body-s-regular',
})`
  ${adaptive({
    desktop: css`
      font-size: 12px;
    `,
    tablet: css`
      font-size: 10px;
    `,
    mobile: css`
      font-size: 10px;
    `,
  })}
`;
