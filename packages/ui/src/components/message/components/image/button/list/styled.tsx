import { css, styled } from 'styled-components';

export const MessageImageButtonsStyled = styled.div`
  display: flex;
  padding: 6px;
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  pointer-events: none;
`;

export interface MessageImageButtonsContentProps {
  $column: boolean;
}

export const MessageImageButtonsContent = styled.div<MessageImageButtonsContentProps>`
  display: flex;
  width: 100%;
  height: 100%;
  gap: 4px;
  position: relative;
  /* Кнопки стоят в правом нижнем углу плитки, как в макете; на узкой —
  столбиком от того же угла */
  ${({ $column }) => {
    if ($column) {
      return css`
        flex-direction: column-reverse;
        justify-content: flex-start;
        align-items: flex-end;
      `;
    }

    return css`
      justify-content: flex-end;
      align-items: flex-end;
    `;
  }}
`;
