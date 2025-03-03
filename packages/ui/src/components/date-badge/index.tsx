import React from 'react';
import { DateBadgeStyled, DateBadgeText } from './styled';

export interface DateBadgeProps {
  date?: string | null;
  months?: [
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string
  ];
}

export const DateBadge: React.FC<DateBadgeProps> = React.memo(
  ({ date, months }) => {
    if (!date) {
      return null;
    }

    const parsedDate = new Date(date);
    const day = parsedDate.getDate();
    const month = parsedDate.getMonth();
    const year = parsedDate.getFullYear();

    return (
      <DateBadgeStyled>
        <DateBadgeText>{`${day} ${months?.[month]} ${year}`}</DateBadgeText>
      </DateBadgeStyled>
    );
  }
);
