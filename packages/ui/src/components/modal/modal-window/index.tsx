import { useTransition } from '@react-spring/web';
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useRef,
  type PropsWithChildren,
  type ReactNode,
  type Ref,
} from 'react';
import { useEventCallback, useEscapeLayer } from '@/ui/utils';
import * as S from './styled';

export type ModalCloseEventHandler = () => unknown;

export type ModalWindowlProps = {
  open: boolean;
  title?: ReactNode;
  scrollbar?: boolean;
  images?: ReactNode;
  className?: string;
  hideCloseButton?: boolean;
  onClose?: ModalCloseEventHandler;
  onHeightChange?: (height: number) => void;
  /** Called after the close animation has finished */
  onExited?: () => void;
  'aria-label'?: string;
  closeAriaLabel?: string;
} & PropsWithChildren;

const focusableSelector = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
  '[contenteditable="true"]',
].join(',');

const getFocusableElements = (container: HTMLElement) =>
  Array.from(container.querySelectorAll<HTMLElement>(focusableSelector));

function assignRef<T>(ref: Ref<T> | undefined, value: T | null): void {
  if (typeof ref === 'function') {
    ref(value);
  } else if (ref != null) {
    ref.current = value;
  }
}

export const ModalWindow = forwardRef<HTMLDivElement, ModalWindowlProps>(
  (
    {
      children,
      open,
      title = null,
      scrollbar = false,
      images,
      className,
      hideCloseButton = false,
      onClose,
      onHeightChange,
      onExited,
      'aria-label': ariaLabel,
      closeAriaLabel,
    },
    ref,
  ) => {
    const titleId = useId();
    const modalWindowRef = useRef<HTMLDivElement | null>(null);
    const resizeObserverRef = useRef<ResizeObserver | null>(null);

    const setModalWindowRef = useCallback(
      (node: HTMLDivElement | null) => {
        resizeObserverRef.current?.disconnect();
        resizeObserverRef.current = null;

        modalWindowRef.current = node;
        assignRef(ref, node);

        if (node) {
          onHeightChange?.(node.getBoundingClientRect().height);
          const observer = new ResizeObserver(() => {
            if (modalWindowRef.current) {
              onHeightChange?.(
                modalWindowRef.current.getBoundingClientRect().height,
              );
            }
          });
          observer.observe(node);
          resizeObserverRef.current = observer;
        }
      },
      [onHeightChange, ref],
    );

    useEscapeLayer(open, () => {
      onClose?.();
    });

    // Move focus into the dialog and give it back to the opener on close
    useEffect(() => {
      if (!open) {
        return;
      }

      const previouslyFocused =
        document.activeElement instanceof HTMLElement
          ? document.activeElement
          : null;
      const node = modalWindowRef.current;

      if (node && !node.contains(document.activeElement)) {
        node.focus({ preventScroll: true });
      }

      return () => {
        if (previouslyFocused?.isConnected) {
          previouslyFocused.focus({ preventScroll: true });
        }
      };
    }, [open]);

    // Keep Tab inside the dialog
    const handleKeyDown = useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key !== 'Tab') {
          return;
        }

        const focusable = getFocusableElements(event.currentTarget);
        if (focusable.length === 0) {
          event.preventDefault();
          return;
        }

        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        const active = document.activeElement;

        if (
          event.shiftKey &&
          (active === first || active === event.currentTarget)
        ) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && active === last) {
          event.preventDefault();
          first.focus();
        }
      },
      [],
    );

    const handleExited = useEventCallback(onExited);

    const modalTransition = useTransition(open, {
      from: { opacity: 0, transform: 'scale(0.9)' },
      enter: { opacity: 1, transform: 'scale(1)' },
      leave: { opacity: 0, transform: 'scale(0.9)' },
      config: { duration: 200 },
      onDestroyed: (item) => {
        if (item) {
          handleExited();
        }
      },
    });

    const content = <S.ModalWindowContent>{children}</S.ModalWindowContent>;

    return modalTransition(
      (style, item) =>
        item && (
          <S.ModalWindowStyled
            ref={setModalWindowRef}
            style={style}
            className={className}
            role="dialog"
            aria-modal="true"
            aria-labelledby={typeof title === 'string' ? titleId : undefined}
            aria-label={typeof title === 'string' ? undefined : ariaLabel}
            tabIndex={-1}
            onKeyDown={handleKeyDown}
          >
            {images}
            <S.ModalWindowBody>
              {typeof title === 'string' ? (
                <S.ModalWindowTitle id={titleId}>{title}</S.ModalWindowTitle>
              ) : (
                title
              )}
              {!hideCloseButton && (
                <S.ModalWindowCloseButton
                  type="button"
                  onClick={onClose}
                  aria-label={closeAriaLabel}
                  data-test="close modal"
                >
                  <S.ModalWindowCloseButtonIcon size={24} />
                </S.ModalWindowCloseButton>
              )}
              <S.ModalWindowBodyContent>
                {scrollbar ? (
                  <S.ModalWindowBodyScrollbarWrapper
                    overflow={scrollbar ? 'auto' : 'visible'}
                  >
                    {content}
                  </S.ModalWindowBodyScrollbarWrapper>
                ) : (
                  content
                )}
              </S.ModalWindowBodyContent>
            </S.ModalWindowBody>
          </S.ModalWindowStyled>
        ),
    );
  },
);
