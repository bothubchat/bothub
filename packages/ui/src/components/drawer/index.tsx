import { PropsWithChildren, useEffect, useId, useRef, useState } from 'react';

import { createPortal } from 'react-dom';
import * as S from './styled';
import { CloseIcon } from '@/ui/icons/close';
import { useEventCallback, useEscapeLayer } from '@/ui/utils';

export type DrawerProps = {
  title?: string | null;
  open: boolean;
  onClose?(): void;
};

// Matches the transitions in ./styled
const transitionDuration = 200;

export const Drawer = ({
  title,
  open,
  onClose,
  children,
}: PropsWithChildren<DrawerProps>) => {
  // Stays mounted after closing until the close transition has finished
  const [isMounted, setIsMounted] = useState(open);
  const [isOpened, setIsOpened] = useState(false);
  const componentRef = useRef<HTMLDivElement | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const titleId = useId();

  const handleClose = useEventCallback(onClose);

  const clearCloseTimer = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  useEffect(() => {
    clearCloseTimer();

    if (open) {
      setIsMounted(true);
      return;
    }

    setIsOpened(false);
    closeTimerRef.current = setTimeout(() => {
      setIsMounted(false);
    }, transitionDuration);
  }, [open]);

  useEffect(() => {
    if (!open || !isMounted) {
      return;
    }

    // Apply the closed position first, so the opening transition runs
    componentRef.current?.getBoundingClientRect();
    setIsOpened(true);
  }, [open, isMounted]);

  useEffect(() => {
    if (!isOpened) {
      return;
    }

    document.body.classList.add('lock-scroll');
    return () => {
      document.body.classList.remove('lock-scroll');
    };
  }, [isOpened]);

  useEffect(() => clearCloseTimer, []);

  // Hides the drawer and reports it once the transition has finished,
  // the parent then sets `open` to false
  const requestClose = () => {
    if (!isOpened) {
      return;
    }

    setIsOpened(false);
    clearCloseTimer();
    closeTimerRef.current = setTimeout(() => {
      handleClose();
    }, transitionDuration);
  };

  useEscapeLayer(open && isOpened, requestClose);

  if (!open && !isMounted) {
    return null;
  }

  const openedClassName = isOpened ? '_opened' : undefined;

  return createPortal(
    <>
      <S.Overlay
        className={openedClassName}
        onClick={requestClose}
      />
      <S.Component
        ref={componentRef}
        className={openedClassName}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
      >
        <S.Header>
          {title && (
            <S.Title
              id={titleId}
              variant="body-xl-semibold"
            >
              {title}
            </S.Title>
          )}
          <S.CloseButton
            onClick={requestClose}
            type="button"
          >
            <CloseIcon />
          </S.CloseButton>
        </S.Header>
        <S.Content>{children}</S.Content>
      </S.Component>
    </>,
    document.body,
  );
};
