import { useMemo } from 'react';
import { Locale } from '../types';
import { getCalendarDays } from '../utils';

export const useInfoDate = (
  date?: string | number | null,
  locale: Locale = 'ru-RU'
) =>
  useMemo(() => {
    let dateObj = new Date();
    if (date) {
      dateObj = new Date(date);
      if (dateObj.toString() === 'Invalid Date') {
        dateObj = new Date();
      }
    }
    const intl = new Intl.DateTimeFormat(locale, { weekday: 'short' });
    const weekdays = [...Array(7).keys()].map((day) =>
      intl.format(new Date(Date.UTC(2022, 4, day + 1)))
    );
    const monthDays = getCalendarDays(
      dateObj.getMonth(),
      dateObj.getFullYear()
    );

    return { weekdays, monthDays };
  }, [date, locale]);
