import React from 'react';
import { UseFloatingReturn } from '@floating-ui/react-dom';
import { locales } from './utils';

type ValueItem = string | number;

export type SingleDatepickerProps = {
  range: false;
  value?: ValueItem | null;
  onChange(value: number | null): void;
  locale?: Locale;
  children: (setRef: UseFloatingReturn['refs']['setReference'], setOpen: React.Dispatch<React.SetStateAction<boolean>>) => React.ReactNode;
  defaultOpen?: boolean;
  buttonSaveText?: string;
  buttonCloseText?: string;
};

export type RangeDatepickerProps = {
  range: true;
  value: [ValueItem, ValueItem | null] | null;
  onChange(value: [number, number | null] | null): void;
  locale?: Locale;
} & Omit<SingleDatepickerProps, 'onChange' | 'value' | 'range'>;

export type DatepickerProps = SingleDatepickerProps | RangeDatepickerProps;

export type Locale = typeof locales[number];
