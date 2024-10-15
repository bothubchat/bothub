import styled from 'styled-components';
import HL from 'react-highlight';
import { interopDefaultCJSImport } from '@/ui/utils';
import { contentStyles } from './styled';
import { MessageMultilineCodeContentProps } from './types';

const Highlight = interopDefaultCJSImport<typeof HL>(HL);

export const MessageMultilineCodeContentHighlighted = styled(
  Highlight
)<MessageMultilineCodeContentProps>`
  ${contentStyles}
`;
