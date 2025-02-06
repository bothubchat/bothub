import { css, styled } from 'styled-components';
import { Scrollbar } from '@/ui/components/scrollbar';
import { adaptive } from '@/ui/adaptive';

export const MessagesStyled = styled.div`
  display: flex;
  width: 100%;
`;

export const MessagesScrollbarWrapper = styled(Scrollbar).attrs({
  variant: 'secondary'
})`
  overflow: auto;
  height: 100%;
  ${adaptive({
    variant: 'dashboard',
    desktop: css`
      padding: 43px 34px;
      padding-bottom: 106px;
    `,
    tablet: css`
      padding: 43px 24px;
      padding-bottom: 106px;
    `,
    mobile: css`
      padding: 24px 16px;
      padding-bottom: 156px;
    `
  })}
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

export const MessagesStart = styled.div`
  display: flex;
  width: 100%;
  height: 1px;
  pointer-events: none;
`;

export const MessageList = styled.div`
  display: flex;
  flex-direction: column;
  width: inherit;
  row-gap: 24px;
`;
