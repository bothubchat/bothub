import React from 'react';
import { AnimatedProps } from '@react-spring/web';
import * as S from './styled';

export type ModalCloseEventHandler = () => unknown;

export type ModalWindowlProps = {
  title?: React.ReactNode;
  scrollbar?: boolean;
  images?: React.ReactNode;
  className?: string;
  style?: AnimatedProps<React.CSSProperties>;
  onClose?: ModalCloseEventHandler;
} & React.PropsWithChildren;

export const ModalWindow = ({
  children,
  title = null,
  scrollbar = false,
  images,
  className,
  style,
  onClose
}: ModalWindowlProps) => (
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
        <S.ModalWindowBodyScrollbarWrapper
          overflow={scrollbar ? 'auto' : 'visible'}
          disabled={!scrollbar}
          disableShadows={!scrollbar}
        >
          <S.ModalWindowContent>{children}</S.ModalWindowContent>
        </S.ModalWindowBodyScrollbarWrapper>
      </S.ModalWindowBodyContent>
    </S.ModalWindowBody>
  </S.ModalWindowStyled>
);
