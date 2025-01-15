import { styled } from 'styled-components';
import { contentStyles } from './styled';
import { MessageMultilineCodeContentProps } from './types';
import { Highlight } from './highlight';
import 'highlight.js/styles/base16/atlas.min.css';

export const MessageMultilineCodeContentHighlighted = styled(
  Highlight
)<MessageMultilineCodeContentProps>`
  ${contentStyles}
`;
