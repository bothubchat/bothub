import { styled, css } from 'styled-components';
import { Typography } from '@/ui/components/typography';
import { adaptive } from '@/ui/adaptive';
import { MessageColor, MessageTimestampPosition } from '../types';
import { isBright } from '@/ui/utils';

export interface TimestampProps {
  $timestampPosition?: MessageTimestampPosition;
}
export const TimestampStyled = styled.div<TimestampProps>`
  width: fit-content;
  height: fit-content;
  display: flex;
  justify-content: flex-end;

  ${({ $timestampPosition }) => {
    switch ($timestampPosition) {
      case 'right':
        return css`
          margin-top: auto;
        `;
      case 'bottom':
        return css`
          margin-left: auto;
        `;
    }
  }};
`;

export interface TimestampTextProp {
  $color: MessageColor;
}
export const TimestampText = styled(Typography).attrs({
  variant: 'body-s-regular'
})<TimestampTextProp>`
  color: ${({ theme, $color }) => {
    if (theme.bright || isBright($color)) {
      return theme.mode === 'dark'
        ? theme.colors.base.black
        : theme.colors.base.white;
    }
    return theme.mode === 'dark'
      ? theme.colors.base.white
      : theme.colors.base.black;
  }} !important;
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
  })};
`;
