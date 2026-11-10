import React, { useCallback, useEffect, useRef } from 'react';
import { useTransition } from '@react-spring/web';
import { useEventCallback } from '@/ui/utils';
import { BackdropStyled } from './styled';

export interface BackdropProps
  extends React.ComponentProps<typeof BackdropStyled> {
  open: boolean;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => unknown;
  /** Called after the close animation has finished */
  onExited?: () => void;
  children?: React.ReactNode;
}

// Shared by all open backdrops, so closing a nested modal doesn't unlock
// the page scroll under the outer one
let scrollLockCount = 0;
let bodyOverflowBeforeLock = '';

const lockBodyScroll = () => {
  if (scrollLockCount === 0) {
    bodyOverflowBeforeLock = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
  }
  scrollLockCount += 1;
};

const unlockBodyScroll = () => {
  scrollLockCount = Math.max(0, scrollLockCount - 1);
  if (scrollLockCount === 0) {
    if (bodyOverflowBeforeLock) {
      document.body.style.overflow = bodyOverflowBeforeLock;
    } else {
      document.body.style.removeProperty('overflow');
    }
  }
};

export const Backdrop: React.FC<BackdropProps> = ({
  open,
  onClick,
  onExited,
  children,
  ...props
}) => {
  const backdropRef = useRef<HTMLDivElement>(null);

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (event.target === backdropRef.current) {
        onClick?.(event);
      }
    },
    [onClick, backdropRef],
  );

  useEffect(() => {
    if (!open) {
      return;
    }

    lockBodyScroll();
    return unlockBodyScroll;
  }, [open]);

  const handleExited = useEventCallback(onExited);

  // Only the opacity is animated: animating backdrop-filter re-blurs the
  // whole screen on every frame
  const backdropTransition = useTransition(open, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    onDestroyed: (item) => {
      if (item) {
        handleExited();
      }
    },
  });

  return backdropTransition(
    (style, item) =>
      item && (
        <BackdropStyled
          {...props}
          ref={backdropRef}
          onClick={handleClick}
          style={{
            ...style,
            ...(props.style || {}),
          }}
        >
          {children}
        </BackdropStyled>
      ),
  );
};
