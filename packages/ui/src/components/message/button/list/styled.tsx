import { css, styled } from 'styled-components';
import { adaptive } from '@/ui/adaptive';
import { Scrollbar, ScrollbarStyled } from '@/ui/components/scrollbar';

export const MessageButtonsStyled = styled.div`
  display: flex;
  grid-area: buttons;
  margin-top: 8px;
  overflow: auto;
  max-width: 512px;
  ${ScrollbarStyled} {
    width: 100%;
  }
  ${adaptive({
    touch: css`
      max-width: 512px;
    `
  })}
`;

export const MessageButtonsScrollbarWrapper = styled(Scrollbar).attrs({ variant: 'secondary' })`
  width: 100%;
  overflow-y: hidden;
`;

export const MessageButtonsContent = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  gap: 8px;
  ${adaptive({
    touch: css`
      flex-wrap: nowrap;
    `
  })}
`;
