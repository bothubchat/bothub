import {
  addMonths,
  isSameDay,
  isSameMonth,
  isSameYear,
  set,
  subMonths,
} from 'date-fns';
import { Locale } from '../types';

export const resetTimeInDate = (date: number | string | Date) =>
  set(new Date(date), {
    hours: 0,
    seconds: 0,
    milliseconds: 0,
    minutes: 0,
  });

// Always 6 weeks (42 days) starting from the Sunday on or before the 1st
export const getCalendarDays = (month: number, year: number) => {
  const startDate = new Date(year, month, 1);

  // Adjust start date to the nearest Sunday
  while (startDate.getDay() !== 0) {
    startDate.setDate(startDate.getDate() - 1);
  }

  const dates = [];
  const currentDate = new Date(startDate);

  while (dates.length < 42) {
    dates.push(resetTimeInDate(new Date(currentDate)));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
};

const monthFormatters = new Map<Locale, Intl.DateTimeFormat>();

export const getMonthName = (month: number, locale: Locale) => {
  let intl = monthFormatters.get(locale);
  if (!intl) {
    intl = new Intl.DateTimeFormat(locale, { month: 'long' });
    monthFormatters.set(locale, intl);
  }

  return intl.format(new Date(Date.UTC(2022, month, 1)));
};

export const addMont = (value: string | number | Date) =>
  addMonths(new Date(value), 1);

export const subMonth = (value: string | number | Date) =>
  subMonths(new Date(value), 1);

export const isEqualDaysOfDate = (
  date1: number | string | Date | null,
  date2: number | string | Date | null,
) => {
  if (!date1 || !date2) return false;
  return (
    isSameYear(date1, date2) &&
    isSameMonth(date1, date2) &&
    isSameDay(date1, date2)
  );
};
