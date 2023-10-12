import { styled } from 'styled-components';
import React from 'react';
import { MessageParagraph } from '../paragraph';

export const MessageStrong = styled(MessageParagraph).attrs({ as: 'strong' })`
  font-family: ${({ theme }) => theme.fonts.ibmPlexSans.bold};
  font-weight: normal;
`;

export type MessageStrongProps = React.ComponentProps<typeof MessageStrong>;
