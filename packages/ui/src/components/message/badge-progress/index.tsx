import React from 'react';
import { MessageBadgeProgressStyled, MessageBadgeProgressStyledProps } from './styled';
import { useMessage } from '../context';
import { BadgeProgressColor } from '@/ui/components/badge';

export type MessageBadgeProgressProps = Omit<
React.ComponentProps<typeof MessageBadgeProgressStyled>, keyof MessageBadgeProgressStyledProps>;

export const MessageBadgeProgress: React.FC<MessageBadgeProgressProps> = ({
  ...props
}) => {
  const { color } = useMessage();

  let badgeColor: BadgeProgressColor;
  switch (color) {
    case 'default':
      badgeColor = 'primary';
      break;
    case 'green':
      badgeColor = 'white-green';
      break;
    case 'purple':
      badgeColor = 'white-purple';
      break;
  }

  return (
    <MessageBadgeProgressStyled
      {...props}
      color={badgeColor}
    />
  );
};
