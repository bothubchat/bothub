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

/** Кнопка поверх изображения: значок на тёмной полупрозрачной плашке */
export const MessageImageButtonContent = styled(Button)`
  flex-shrink: 0;
  pointer-events: auto;
  && {
    width: 32px;
    min-width: 32px;
    height: 32px;
    padding: 0;
    border: none;
    border-radius: 8px;
    background: rgba(10, 9, 16, 0.78);
    color: #ffffff;
    box-shadow: none;
  }
  &&:hover:not(:disabled) {
    background: rgba(10, 9, 16, 0.92);
  }
`;
