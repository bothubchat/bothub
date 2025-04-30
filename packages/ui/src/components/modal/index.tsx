import React from 'react';
import { useTransition } from '@react-spring/web';
import * as S from './styled';
import { Backdrop } from '@/ui/components/backdrop';
import { Portal } from '@/ui/components/portal';
import { ModalWindow, ModalWindowlProps } from './modal-window';

export type ModalProps = {
  open: boolean;
} & Omit<ModalWindowlProps, 'style'>;

export const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  ...modalWindowProps
}) => {
  let modalNode: React.ReactNode;

  const modalTransition = useTransition(open, {
    from: { opacity: 0, transform: 'scale(0.9)' },
    enter: { opacity: 1, transform: 'scale(1)' },
    config: { duration: 200 }
  });

  if (!open) {
    modalNode = null;
  } else {
    modalNode = (
      <S.ModalStyled>
        <Backdrop
          open={open}
          onClick={onClose}
        />

        {modalTransition(
          (style, item) =>
            item && (
              <ModalWindow
                style={style}
                onClose={onClose}
                {...modalWindowProps}
              />
            )
        )}
      </S.ModalStyled>
    );
  }

  return <Portal>{modalNode}</Portal>;
};

export * from './modal-window';
