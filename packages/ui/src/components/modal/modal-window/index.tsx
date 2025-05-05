import { useTransition } from '@react-spring/web';
import type { PropsWithChildren, ReactNode } from 'react';
import * as S from './styled';

export type ModalCloseEventHandler = () => unknown;

export type ModalWindowlProps = {
  open: boolean;
  title?: ReactNode;
  scrollbar?: boolean;
  images?: ReactNode;
  className?: string;
  onClose?: ModalCloseEventHandler;
} & PropsWithChildren;

export const ModalWindow = ({
  children,
  open,
  title = null,
  scrollbar = false,
  images,
  className,
  onClose
}: ModalWindowlProps) => {
  const modalTransition = useTransition(open, {
    from: { opacity: 0, transform: 'scale(0.9)' },
    enter: { opacity: 1, transform: 'scale(1)' },
    leave: { opacity: 0, transform: 'scale(0.9)' },
    config: { duration: 200 }
  });

  const content = <S.ModalWindowContent>{children}</S.ModalWindowContent>;

  return (
    <>
      {modalTransition(
        (style, item) =>
          item && (
            <S.ModalWindowStyled
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
                <S.ModalWindowCloseButton onClick={onClose}>
                  <S.ModalWindowCloseButtonIcon size={24} />
                </S.ModalWindowCloseButton>
                <S.ModalWindowBodyContent>
                  {scrollbar ? (
                    <S.ModalWindowBodyScrollbarWrapper
                      overflow={scrollbar ? 'auto' : 'visible'}
                      disabled={!scrollbar}
                      disableShadows={!scrollbar}
                    >
                      {content}
                    </S.ModalWindowBodyScrollbarWrapper>
                  ) : (
                    content
                  )}
                </S.ModalWindowBodyContent>
              </S.ModalWindowBody>
            </S.ModalWindowStyled>
          )
      )}
    </>
  );
};
