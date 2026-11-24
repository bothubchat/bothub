import { styled, css } from 'styled-components';
import { ScrollbarStyle } from '@/ui/components/scrollbar';
import { adaptive } from '@/ui/adaptive';
import { MessageMultilineCodeContentProps } from './types';
import { messageSelectionStyles } from '../../../selection';

/**
 * Фон кода: тёмный остров в обеих темах, темнее страницы чата. Цвета
 * подсветки подобраны под тёмный фон и в светлой теме остаются теми же
 */
export const CODE_BACKGROUND = '#0D1220';

export const MessageMultilineCodeContentContainer = styled.div`
  background-color: ${CODE_BACKGROUND};
`;

export const contentStyles = css<MessageMultilineCodeContentProps>`
  ${ScrollbarStyle}
  overflow-x: auto;
  line-height: 1.55;
  padding: 14px 16px;
  display: block;
  span {
    line-height: 1.55;
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
  background-color: ${CODE_BACKGROUND};
  color: #fff;
`;

export const MessageMultilineCodeLastLine = styled.div``;
