import { css, styled } from 'styled-components';
import { adaptive } from '@/ui/adaptive';
import { MessageImageNative, MessageImageStyled } from '../styled';

/**
 * Варианты изображения — плитки одного размера: четыре в ряд, на телефоне
 * две. Плитка занимает свою ячейку целиком, каким бы ни было превью
 */
export const MessageImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 8px;
  width: 100%;
  ${MessageImageStyled} {
    width: 100%;
  }
  ${MessageImageNative} {
    width: 100%;
    height: auto;
  }
  ${adaptive({
    merge: true,
    mobile: css`
      grid-template-columns: repeat(2, minmax(0, 1fr));
    `,
  })}
`;
