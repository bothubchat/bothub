import { useTransition } from '@react-spring/web';
import {
  forwardRef,
  useCallback,
  useRef,
  type PropsWithChildren,
  type ReactNode,
  type Ref,
} from 'react';
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
} & PropsWithChildren;

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
    },
    ref,
  ) => {
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

    const modalTransition = useTransition(open, {
      from: { opacity: 0, transform: 'scale(0.9)' },
      enter: { opacity: 1, transform: 'scale(1)' },
      leave: { opacity: 0, transform: 'scale(0.9)' },
      config: { duration: 200 },
    });

    const content = <S.ModalWindowContent>{children}</S.ModalWindowContent>;

    return modalTransition(
      (style, item) =>
        item && (
          <S.ModalWindowStyled
            ref={setModalWindowRef}
            style={style}
            className={className}
          >
            {images}
            <S.ModalWindowBody>
              {typeof title === 'string' ? (
                <S.ModalWindowTitle>{title}</S.ModalWindowTitle>
              ) : (
                title
              )}
              {!hideCloseButton && (
                <S.ModalWindowCloseButton
                  onClick={onClose}
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
