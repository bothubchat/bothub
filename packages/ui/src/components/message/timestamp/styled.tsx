import { styled, css } from 'styled-components';
import { messageRevealOnHover } from '../styled';

/** Время и пометка сообщения в строке под ним: «изменено 14:20» */
export const TimestampStyled = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  white-space: nowrap;
`;

export interface TimestampTextProp {
  /** Время под пузырём пользователя видно по наведению, пометка — всегда */
  $reveal?: boolean;
}

export const TimestampText = styled.span<TimestampTextProp>`
  font-size: 12px;
  line-height: 18px;
  font-variant-numeric: tabular-nums;
  ${({ $reveal }) =>
    $reveal &&
    css`
      ${messageRevealOnHover}
    `}
`;
