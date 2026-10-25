import { styled, css } from 'styled-components';
import { Typography } from '@/ui/components/typography';
import { adaptive } from '@/ui/adaptive';
import {
  MessageColor,
  MessageTimestampPosition,
  MessageVariant,
} from '../types';
import { isBright } from '@/ui/utils';
import { themeVar } from '@/ui/theme';

export interface TimestampProps {
  $timestampPosition?: MessageTimestampPosition;
}
export const TimestampStyled = styled.div<TimestampProps>`
  display: flex;
  gap: 6px;
  justify-content: flex-end;
  grid-area: timestamp;
  text-align: right;
  width: 100%;

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
  $variant: MessageVariant;
}
export const TimestampText = styled(Typography).attrs({
  variant: 'body-s-regular',
})<TimestampTextProp>`
  color: ${({ theme, $color, $variant }) => {
    if ($variant === 'assistant') {
      return themeVar(theme, 'tokens.timestampAssistantText');
    }
    if (theme.scheme === 'standard' && theme.mode === 'light') {
      return themeVar(theme, 'default.colors.base.black');
    }

    if (theme.bright || isBright($color)) {
      return themeVar(theme, 'tokens.inkDark');
    }
    return themeVar(theme, 'tokens.inkLight');
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
    `,
  })};
`;
