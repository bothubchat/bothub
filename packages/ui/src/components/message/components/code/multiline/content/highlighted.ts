import { styled } from 'styled-components';
import { CODE_BACKGROUND, contentStyles } from './styled';
import { MessageMultilineCodeContentProps } from './types';
import { Highlight } from './highlight';
import 'highlight.js/styles/base16/atlas.min.css';

export const MessageMultilineCodeContentHighlighted = styled(
  Highlight,
)<MessageMultilineCodeContentProps>`
  ${contentStyles}
  /* Тема подсветки приносит свой фон тем же весом селектора: перекрываем */
  && {
    background-color: ${CODE_BACKGROUND};
  }
`;
