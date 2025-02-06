import { styled } from 'styled-components';
import { Button } from '@/ui/components/button';

export const MessageImageButtonStyled = styled.div`
  display: inline-flex;
  pointer-events: none;
`;

export const MessageImageButtonZoneWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
`;

export const MessageImageButtonContent = styled(Button)`
  flex-shrink: 0;
  pointer-events: auto;
`;
