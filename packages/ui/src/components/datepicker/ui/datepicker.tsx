import { useCallback, useState } from 'react';
import {
  autoUpdate,
  flip,
  offset,
  shift,
  useFloating,
} from '@floating-ui/react';
import { createPortal } from 'react-dom';
import { DatepickerCalendar } from './calendar';
import { DatepickerProps } from '../types';
import { useTheme } from '@/ui/theme';

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
  const theme = useTheme();

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <>
      {refs && <div>{children(refs.setReference, setOpen, open)}</div>}
      {open &&
        createPortal(
          <div
            ref={refs.setFloating}
            style={{
              ...floatingStyles,
              zIndex: theme.zIndex.select,
            }}
          >
            <DatepickerCalendar
              {...datepickerProps}
              closeFn={handleClose}
            />
          </div>,
          document.body,
        )}
    </>
  );
};
