import { styled } from 'styled-components';
import { ChatIcon } from '@/ui/icons/chat';
import { Typography } from '@/ui/components/typography';

export const BookmarkCardChatStyled = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const BookmarkCardChatIcon = styled(ChatIcon).attrs({ size: 16 })``;

export const BookmarkCardChatName = styled(Typography).attrs({
  variant: 'body-s-medium'
})``;
