import React, { useCallback, useEffect, useRef } from 'react';
import { useTransition } from '@react-spring/web';
import { BackdropStyled } from './styled';

export interface BackdropProps
  extends React.ComponentProps<typeof BackdropStyled> {
  open: boolean;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => unknown;
  children?: React.ReactNode;
}

export const Backdrop: React.FC<BackdropProps> = ({
  open,
  onClick,
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
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.removeProperty('overflow');
    }

    return () => {
      document.body.style.removeProperty('overflow');
    };
  }, [open]);

  const backdropTransition = useTransition(open, {
    from: { background: 'rgba(0, 0, 0, 0)', backdropFilter: 'blur(0px)' },
    enter: { background: 'rgba(0, 0, 0, 0.55)', backdropFilter: 'blur(5px)' },
    leave: { background: 'rgba(0, 0, 0, 0)', backdropFilter: 'blur(0px)' },
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
