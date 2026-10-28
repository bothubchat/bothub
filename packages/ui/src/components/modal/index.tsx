import { useCallback, useEffect, useRef, useState } from 'react';
import * as S from './styled';
import { Backdrop } from '@/ui/components/backdrop';
import { Portal } from '@/ui/components/portal';
import { useEventCallback, useIsomorphicLayoutEffect } from '@/ui/utils';
import { ModalWindow, ModalWindowlProps } from './modal-window';

export type ModalProps = ModalWindowlProps & {
  hasBackdrop?: boolean;
  scrollModal?: boolean;
};

// Unmounts the modal even if a close animation never reports its end
const exitFallbackTimeout = 1000;

export const Modal = ({
  hasBackdrop = true,
  scrollModal = false,
  open,
  onClose,
  onExited,
  ...props
}: ModalProps) => {
  const [align, setAlign] = useState<'center' | 'flex-start'>('center');
  // Stays true after closing until the close animations have finished
  const [isMounted, setIsMounted] = useState(open);
  const exitedRef = useRef({ window: false, backdrop: false, done: false });

  const handleHeightChange = useCallback((height: number) => {
    const currentAlign =
      height + 32 > window.innerHeight ? 'flex-start' : 'center';
    setAlign((prev) => (prev === currentAlign ? prev : currentAlign));
  }, []);

  const handleExited = useEventCallback(() => {
    if (open || exitedRef.current.done) {
      return;
    }

    exitedRef.current.done = true;
    setIsMounted(false);
    onExited?.();
  });

  useIsomorphicLayoutEffect(() => {
    if (open) {
      exitedRef.current = {
        window: false,
        backdrop: !hasBackdrop,
        done: false,
      };
      setIsMounted(true);
    }
  }, [open, hasBackdrop]);

  useEffect(() => {
    if (open || !isMounted) {
      return;
    }

    const timer = setTimeout(handleExited, exitFallbackTimeout);
    return () => clearTimeout(timer);
  }, [open, isMounted, handleExited]);

  const handleLayerExited = useCallback(
    (layer: 'window' | 'backdrop') => {
      exitedRef.current[layer] = true;
      if (exitedRef.current.window && exitedRef.current.backdrop) {
        handleExited();
      }
    },
    [handleExited],
  );

  const handleWindowExited = useCallback(
    () => handleLayerExited('window'),
    [handleLayerExited],
  );
  const handleBackdropExited = useCallback(
    () => handleLayerExited('backdrop'),
    [handleLayerExited],
  );

  const modalNode =
    open || isMounted ? (
      <S.ModalStyled
        $scrollbarEnabled={scrollModal}
        $align={align}
        $closing={!open}
      >
        {hasBackdrop && (
          <Backdrop
            open={open}
            onClick={onClose}
            onExited={handleBackdropExited}
          />
        )}
        <ModalWindow
          {...props}
          open={open}
          onClose={onClose}
          onHeightChange={handleHeightChange}
          onExited={handleWindowExited}
        />
      </S.ModalStyled>
    ) : null;

  return <Portal>{modalNode}</Portal>;
};

export * from './modal-window';
