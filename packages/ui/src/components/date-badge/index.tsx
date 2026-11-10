import React, { useMemo } from 'react';
import { DateBadgeStyled, DateBadgeText } from './styled';

const localeMap = {
  ru: 'ru-RU',
  kz: 'ru-RU',
  es: 'es-ES',
  fr: 'fr-FR',
  pt: 'pt-PT',
  en: 'en-US',
};

export type DateBadgeLocaleProp = 'ru' | 'kz' | 'en' | 'es' | 'fr' | 'pt';

export interface DateBadgeProps {
  date?: string | null;
  locale: DateBadgeLocaleProp;
}

export const DateBadge: React.FC<DateBadgeProps> = React.memo(
  ({ date, locale }) => {
    // Hooks run before the early return, so `date` may become empty later.
    const parsedDate = useMemo(
      () =>
        date
          ? new Date(date).toLocaleDateString(localeMap[locale], {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })
          : null,
      [date, locale],
    );

    if (!parsedDate) {
      return null;
    }

    return (
      <DateBadgeStyled>
        <DateBadgeText>{parsedDate}</DateBadgeText>
      </DateBadgeStyled>
    );
  },
);
