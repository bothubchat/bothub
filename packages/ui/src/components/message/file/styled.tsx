import { styled } from 'styled-components';
import { Typography } from '@/ui/components/typography';
import { MessageColor, MessageVariant } from '../types';

export const MessageFileStyled = styled.a`
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  user-select: none;
  width: 100%;
`;

export const MessageFileInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-start;
`;

export interface MessageFileNameProps {
  $variant: MessageVariant;
}

export const MessageFileName = styled(Typography).attrs({
  variant: 'body-m-medium',
})<MessageFileNameProps>`
  color: ${({ theme, $variant }) => {
    if ($variant === 'assistant') {
      return theme.colors.base.white;
    }

    return theme.bright ||
      (theme.scheme === 'standard' && theme.mode === 'light')
      ? theme.default.colors.base.black
      : theme.default.colors.base.white;
  }};
`;

export interface MessageFileSizeProps {
  $variant: MessageVariant;
  $color: MessageColor;
}

export const MessageFileSize = styled(MessageFileName).attrs({
  variant: 'body-m-regular',
})``;

export const MessageFiles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
`;
