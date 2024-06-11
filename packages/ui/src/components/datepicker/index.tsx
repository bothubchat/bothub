import React, { useState } from 'react';
import {
  useFloating, autoUpdate, offset, flip, shift
} from '@floating-ui/react';
import { createPortal } from 'react-dom';
import { DatepickerProps } from './types';
import { DatepickerCalendar } from './ui';

export const Datepicker = ({
  children,
  defaultOpen = false,
  ...datepickerProps
}: DatepickerProps) => {
  const [open, setOpen] = useState(defaultOpen);
  const { refs, floatingStyles } = useFloating({
    whileElementsMounted: autoUpdate,
    middleware: [offset(10), flip(), shift()],
  });

  return (
    <>
      {refs && (
        <div onClick={(e) => e.stopPropagation()}>
          {children(refs.setReference, setOpen)}
        </div>
      )}
      {open && createPortal(
        (
          <div ref={refs.setFloating} style={floatingStyles}>
            <DatepickerCalendar
              {...datepickerProps}
              closeFn={() => {
                setOpen(false);
              }}
            />
          </div>
        ), document.body
      )}
    </>
  );
};

export * from './types';
export * from './utils';
export * from './hooks';
export * from './ui';
