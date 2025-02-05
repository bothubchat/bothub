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
  $color: MessageColor;
}

export const MessageFileName = styled(Typography).attrs({ variant: 'body-m-medium' }) <MessageFileNameProps>`
  color: ${({ theme, $variant, $color }) => {
    if ($variant === 'assistant') {
      if ($color !== 'default') {
        return theme.default.colors.base.white;
      }
      return theme.colors.base.white;
    }

    return theme.default.colors.base.white;
  }};
`;

export interface MessageFileSizeProps {
  $variant: MessageVariant;
  $color: MessageColor;
}

export const MessageFileSize = styled(Typography).attrs({ variant: 'body-m-regular' }) <MessageFileSizeProps>`
  color: ${({ theme, $variant, $color }) => {
    if ($variant === 'assistant') {
      if ($color !== 'default') {
        return theme.default.colors.base.white;
      }

      return theme.colors.base.white;
    }

    return theme.default.colors.base.white;
  }};
`;

export const MessageFiles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
`;
