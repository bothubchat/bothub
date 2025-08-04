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

export const getCalendarDays = (month: number, year: number) => {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month, 0);
  const startDate = new Date(firstDay);
  const endDate = new Date(lastDay);

  // Adjust start date to the nearest Sunday
  while (startDate.getDay() !== 0) {
    startDate.setDate(startDate.getDate() - 1);
  }

  // Adjust end date to the nearest Saturday
  while (endDate.getDay() !== 6) {
    endDate.setDate(endDate.getDate() + 1);
  }

  const dates = [];
  const currentDate = new Date(startDate);

  while (dates.length < 42) {
    dates.push(resetTimeInDate(new Date(currentDate)));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
};

export const getMonthName = (month: number, locale: Locale) => {
  const intl = new Intl.DateTimeFormat(locale, { month: 'long' });
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
