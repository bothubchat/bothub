import { type ReactNode } from 'react';
import * as S from './styled';
import { Backdrop } from '@/ui/components/backdrop';
import { Portal } from '@/ui/components/portal';
import { ModalWindow, ModalWindowlProps } from './modal-window';

export type ModalProps = ModalWindowlProps & {
  hasBackdrop?: boolean;
  scrollModal?: boolean;
};

export const Modal = ({
  hasBackdrop = true,
  scrollModal = false,
  open,
  onClose,
  ...props
}: ModalProps) => {
  let modalNode: ReactNode;

  if (!open) {
    modalNode = null;
  } else {
    modalNode = (
      <S.ModalStyled $scrollbarEnabled={scrollModal}>
        {hasBackdrop && (
          <Backdrop
            open={open}
            onClick={onClose}
          />
        )}
        <ModalWindow
          open={open}
          onClose={onClose}
          {...props}
        />
      </S.ModalStyled>
    );
  }

  return <Portal>{modalNode}</Portal>;
};

export * from './modal-window';
