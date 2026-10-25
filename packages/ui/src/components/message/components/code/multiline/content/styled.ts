import { styled, css } from 'styled-components';
import { ScrollbarStyle } from '@/ui/components/scrollbar';
import { adaptive } from '@/ui/adaptive';
import { MessageMultilineCodeContentProps } from './types';
import { messageSelectionStyles } from '../../../selection';

export const MessageMultilineCodeContentContainer = styled.div`
  background-color: #002635;
`;

export const contentStyles = css<MessageMultilineCodeContentProps>`
  ${ScrollbarStyle}
  overflow-x: auto;
  line-height: 1.3;
  padding: 1em;
  display: block;
  span {
    line-height: 1.3;
  }
  &::selection,
  *::selection {
    ${({ $messageColor }) => messageSelectionStyles($messageColor, true)}
  }
  ${adaptive({
    variant: 'dashboard',
    miniTablet: css`
      font-size: 14px !important;
      span {
        font-size: 14px !important;
      }
    `,
    mobile: css`
      font-size: 12px !important;
      span {
        font-size: 12px !important;
      }
    `,
    touch: css`
      &::-webkit-scrollbar {
        display: none;
      }
    `,
  })}
`;

export const MessageMultilineCodeContentStyled = styled.code<MessageMultilineCodeContentProps>`
  ${contentStyles}
  background-color: #002635;
  color: #fff;
`;

export const MessageMultilineCodeLastLine = styled.div``;
