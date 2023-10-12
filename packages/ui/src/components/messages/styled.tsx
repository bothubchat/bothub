import { styled } from 'styled-components';
import { Scrollbar, ScrollbarShadow } from '@/ui/components/scrollbar';

export const MessagesStyled = styled.div`
  display: flex;
  width: 100%;
`;

export const MessagesScrollbarWrapper = styled(Scrollbar).attrs({ 
  variant: 'secondary',
  scrollShadows: {
    size: 140,
    top: <ScrollbarShadow side="top" />
  },
  scrollLocked: {
    side: 'bottom'
  }
})`
  overflow: auto;
  height: 100%;
  padding: 43px 34px;
  padding-bottom: 106px;
`;

export const MessagesContent = styled.div`
  display: flex;
  width: inherit;
  justify-content: center;
`;

export const MessagesContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: inherit;
  max-width: ${({ theme }) => theme.dashboard.chat.containerWidth};
`;

export const MessageList = styled.div`
  display: flex;
  flex-direction: column;
  width: inherit;
  row-gap: 24px;
`;
