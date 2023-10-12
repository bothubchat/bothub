import { styled } from 'styled-components';
import { motion } from 'framer-motion';
import { CloseIcon, InfoBigIcon } from '@/ui/icons';
import { Typography } from '@/ui/components/typography';
import { Button } from '@/ui/components/button';
import { NotificationVariant } from './types';

export interface NotificationStyledProps {
  $variant: NotificationVariant;
}

export const NotificationStyled = styled(motion.div)<NotificationStyledProps>`
  display: flex;
  background: ${({ theme }) => theme.colors.grayScale.gray2};
  border: 1px solid ${({ theme, $variant }) => {
    switch ($variant) {
      case 'info':
      case 'loading':
        return theme.colors.accent.primary;
      case 'warn':
        return theme.colors.orange;
      case 'error':
        return theme.colors.critic;
      case 'success':
        return theme.colors.green;
    }
  }};
  border-radius: 14px;
  overflow: hidden;
  box-sizing: border-box;
  width: 100%;
  max-width: 412px;
  padding: 20px;
  flex-shrink: 0;
  pointer-events: auto;
`;

export interface NotificationContentProps {
  $text: boolean;
}

export const NotificationContent = styled.div<NotificationContentProps>`
  display: flex;
  width: 100%;
  justify-content: space-between;
  box-sizing: border-box;
  align-items: ${({ $text }) => ($text ? 'flex-start' : 'center')};
  gap: 8px;
`;

export interface NotificationLeftProps {
  $text: boolean;
}

export const NotificationLeft = styled.div<NotificationLeftProps>`
  display: flex;
  gap: 10px;
  align-items: ${({ $text }) => ($text ? 'flex-start' : 'center')};
`;

export const NotificationRight = styled.div`
  display: flex;
`;

export const NotificationIcon = styled(InfoBigIcon)``;

export const NotificationInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const NotificationTitle = styled(Typography).attrs({ component: 'h3', variant: 'body-m-semibold' })``;

export const NotificationText = styled(Typography).attrs({ component: 'p', variant: 'body-m-regular' })`
  margin-top: 10px;
  color: ${({ theme }) => theme.colors.grayScale.gray6};
`;

export const NotificationCloseButton = styled(Button).attrs({ variant: 'text', children: <CloseIcon /> })``;
