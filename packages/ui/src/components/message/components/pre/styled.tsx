import React from 'react';
import { styled } from 'styled-components';

export const MessagePre = styled.pre`
  margin: 0px;
  text-wrap: wrap;
`;

export type MessagePreProps = React.ComponentProps<typeof MessagePre>;
