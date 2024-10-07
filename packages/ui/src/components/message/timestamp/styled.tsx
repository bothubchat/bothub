import styled, { css } from 'styled-components';
import { Typography } from '../../typography';
import { adaptive } from '@/ui/adaptive';
import { MessageVariant } from '../types';

export const TimestampStyled = styled.div`
  position: absolute;
  bottom: 6px;
  right: 18px;
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
