import styled from 'styled-components';
import HL from 'react-highlight';
import { interopDefaultCJSImport } from '@/ui/utils';
import { contentStyles } from './styled';
import { MessageMultilineCodeContentProps } from './types';
import 'highlight.js/styles/base16/atlas.min.css';

const Highlight = interopDefaultCJSImport<typeof HL>(HL);

export const MessageMultilineCodeContentHighlighted = styled(
  Highlight
)<MessageMultilineCodeContentProps>`
  ${contentStyles}
`;
