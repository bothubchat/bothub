import { UseFloatingReturn } from '@floating-ui/react-dom';
import { Dispatch, ReactNode, SetStateAction } from 'react';
import { locales } from './utils';

export type SingleDatepickerProps = {
  range: false;
  value?: Date | null;
  onChange(value: Date | null): void;
  locale?: Locale;
  children: (
    setRef: UseFloatingReturn['refs']['setReference'],
    setOpen: Dispatch<SetStateAction<boolean>>,
    open?: boolean,
  ) => ReactNode;
  defaultOpen?: boolean;
  buttonSaveText?: string;
  buttonCloseText?: string;
};

export type RangeDatepickerProps = {
  range: true;
  value: [Date, Date | null] | null;
  onChange(value: [Date, Date | null] | null): void;
  locale?: Locale;
} & Omit<SingleDatepickerProps, 'onChange' | 'value' | 'range'>;

export type DatepickerProps = SingleDatepickerProps | RangeDatepickerProps;

export type Locale = (typeof locales)[number];
