import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { useEventCallback } from '@/ui/utils';
import { useInfoDate } from '../../hooks';
import {
  DatepickerProps,
  RangeDatepickerProps,
  SingleDatepickerProps,
} from '../../types';
import * as S from './styled';

import {
  addMont,
  getMonthName,
  isEqualDaysOfDate,
  resetTimeInDate,
  subMonth,
} from '../../utils';
import { useTheme } from '../../../../theme';

export type CalendarProps = {
  closeFn?: () => void;
} & Omit<DatepickerProps, 'children'>;

const getDefaultCalendarDate = (value?: CalendarProps['value']) => {
  let dateObj = new Date();
  if (value && !Array.isArray(value)) {
    dateObj = new Date(value);
    if (dateObj.toString() === 'Invalid Date') {
      dateObj = new Date();
    }
  } else if (Array.isArray(value)) {
    dateObj = new Date(value[0]);
    if (dateObj.toString() === 'Invalid Date') {
      dateObj = new Date();
    }
  }
  return resetTimeInDate(dateObj);
};

const getDefaultValue = (
  value?: CalendarProps['value'],
): Date | [Date, Date | null] | null => {
  if (Array.isArray(value)) {
    return [
      resetTimeInDate(new Date(value[0])),
      value[1] ? resetTimeInDate(new Date(value[1])) : null,
    ];
  }
  if (value && !Array.isArray(value)) {
    return resetTimeInDate(new Date(value));
  }
  return null;
};

const getValueKey = (value?: CalendarProps['value']) => {
  if (Array.isArray(value)) {
    return `${new Date(value[0]).getTime()}-${
      value[1] ? new Date(value[1]).getTime() : ''
    }`;
  }

  return value ? String(new Date(value).getTime()) : '';
};

type DatepickerDayProps = {
  date: Date;
  isActive: boolean;
  isBetweenSelected: boolean;
  isOutRange: boolean;
  isStartDate: boolean;
  isFinishDate: boolean;
  hoverable: boolean;
  onSelect: (date: Date) => void;
  onHover: (date: Date | null) => void;
};

// Memoized, so hovering a day in range mode rerenders only the days whose
// highlight changes
const DatepickerDay = memo(
  ({
    date,
    isActive,
    isBetweenSelected,
    isOutRange,
    isStartDate,
    isFinishDate,
    hoverable,
    onSelect,
    onHover,
  }: DatepickerDayProps) => (
    <S.DateGridInteractiveItem
      tabIndex={-1}
      $isBetweenSelected={isBetweenSelected}
      $active={isActive}
      $outRange={isOutRange}
      $startDate={isStartDate}
      $finishDate={isFinishDate}
      onMouseEnter={hoverable ? () => onHover(date) : undefined}
      onMouseLeave={hoverable ? () => onHover(null) : undefined}
      onClick={() => onSelect(date)}
    >
      <S.DayOfMonth>{date.getDate()}</S.DayOfMonth>
    </S.DateGridInteractiveItem>
  ),
);

export const DatepickerCalendar = ({
  value,
  closeFn,
  onChange,
  locale = 'en-US',
  range,
  buttonSaveText = 'Save',
  buttonCloseText = 'Close',
}: CalendarProps) => {
  const theme = useTheme();
  const [calendarDate, setCalendarDate] = useState(
    getDefaultCalendarDate(value),
  );
  const [localValue, setLocalValue] = useState<
    [Date, Date | null] | Date | null
  >(getDefaultValue(value));

  const [hoveredItem, setHoveredItem] = useState<Date | null>(null);

  const { monthDays, weekdays } = useInfoDate(calendarDate.getTime(), locale);

  const wrapperRef = useRef<HTMLDivElement>(null);

  const onPrevMonth = () => {
    setCalendarDate(subMonth(calendarDate));
  };
  const onNextMonth = () => {
    setCalendarDate(addMont(calendarDate));
  };

  const handleSelectDate = useEventCallback((newValue: Date) => {
    const isArrayValue = Array.isArray(localValue);
    // The clicked day is hovered, which highlights nothing
    setHoveredItem(null);

    if (range) {
      if (isArrayValue) {
        if (localValue[1] || newValue < localValue[0]) {
          setLocalValue([newValue, null]);
        } else if (isEqualDaysOfDate(newValue, localValue[0])) {
          setLocalValue(null);
        } else {
          setLocalValue([localValue[0], newValue]);
        }
      } else {
        setLocalValue([newValue, null]);
      }
      return;
    }

    if (isArrayValue) {
      setLocalValue(null);
      return;
    }

    if (!localValue || !isEqualDaysOfDate(newValue, localValue)) {
      setLocalValue(newValue);
    } else {
      setLocalValue(null);
    }
  });

  const handleHover = useCallback((date: Date | null) => {
    setHoveredItem(date);
  }, []);

  const handleSave = () => {
    if (range && Array.isArray(localValue)) {
      (onChange as RangeDatepickerProps['onChange'])([
        localValue[0],
        localValue[1] || null,
      ]);
    } else if (!range && !Array.isArray(localValue) && localValue) {
      (onChange as SingleDatepickerProps['onChange'])(localValue);
    } else {
      onChange(null);
    }
    closeFn?.();
  };

  const handleCancel = () => {
    setCalendarDate(getDefaultCalendarDate(value));
    closeFn?.();
  };

  // Compare dates by time, so a new array with the same dates doesn't reset
  // the shown month
  const valueKey = getValueKey(value);
  useEffect(() => {
    setCalendarDate(getDefaultCalendarDate(value));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valueKey]);

  const handleClose = useEventCallback(closeFn);

  useEffect(() => {
    const clickListener = (event: Event) => {
      const wrapperEl: HTMLDivElement | null = wrapperRef.current;
      if (wrapperEl === null) {
        return;
      }
      if (wrapperEl.contains(event.target as Element)) {
        return;
      }

      handleClose();
    };

    // Subscribe after the click that opened the calendar has finished,
    // so the trigger doesn't need to stop its propagation
    const timer = setTimeout(() => {
      document.addEventListener('click', clickListener);
    });

    return () => {
      clearTimeout(timer);
      document.removeEventListener('click', clickListener);
    };
  }, [handleClose]);

  const isArrayLocalValue = Array.isArray(localValue);
  // The hovered day only matters while the end of a range is being chosen
  const isSelectingRangeEnd = Boolean(
    range && isArrayLocalValue && !localValue[1],
  );

  return (
    <S.Wrapper ref={wrapperRef}>
      <S.Header>
        <S.PrevMonth
          type="button"
          onClick={onPrevMonth}
        >
          <S.PreArrowIcon fill={theme.colors.base.white} />
        </S.PrevMonth>
        <S.Title>
          {getMonthName(new Date(calendarDate).getMonth(), locale)}{' '}
          {new Date(calendarDate).getFullYear()}
        </S.Title>
        <S.NextMonth
          type="button"
          onClick={onNextMonth}
        >
          <S.NextArrowIcon fill={theme.colors.base.white} />
        </S.NextMonth>
      </S.Header>
      <S.DateGrid>
        {weekdays.map((weekday) => (
          <S.DateGridItem key={weekday}>
            <S.DayOfWeek>{weekday}</S.DayOfWeek>
          </S.DateGridItem>
        ))}
        {monthDays.map((monthDay) => {
          let isActive = false;

          if (isArrayLocalValue) {
            isActive =
              isEqualDaysOfDate(localValue[0], monthDay) ||
              isEqualDaysOfDate(localValue[1], monthDay);
          } else if (localValue) {
            isActive = isEqualDaysOfDate(localValue, monthDay);
          }

          let isBetweenSelected = false;
          if (isArrayLocalValue) {
            if (localValue[1]) {
              isBetweenSelected =
                monthDay > localValue[0] && monthDay < localValue[1];
            } else if (hoveredItem) {
              isBetweenSelected =
                monthDay > localValue[0] && monthDay < hoveredItem;
            }
          }

          return (
            <DatepickerDay
              key={monthDay.getTime()}
              date={monthDay}
              isActive={isActive}
              isBetweenSelected={isBetweenSelected}
              isOutRange={monthDay.getMonth() !== calendarDate.getMonth()}
              isStartDate={Boolean(
                isArrayLocalValue &&
                  ((hoveredItem && hoveredItem > localValue[0]) ||
                    localValue[1]) &&
                  isEqualDaysOfDate(localValue[0], monthDay),
              )}
              isFinishDate={Boolean(
                isArrayLocalValue && isEqualDaysOfDate(localValue[1], monthDay),
              )}
              hoverable={isSelectingRangeEnd}
              onSelect={handleSelectDate}
              onHover={handleHover}
            />
          );
        })}
      </S.DateGrid>
      <S.Footer>
        <S.SaveButton onClick={handleSave}>{buttonSaveText}</S.SaveButton>
        <S.CancelButton
          variant="secondary"
          onClick={handleCancel}
        >
          {buttonCloseText}
        </S.CancelButton>
      </S.Footer>
    </S.Wrapper>
  );
};
