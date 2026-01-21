import type { ReactNode } from 'react';
import * as S from './styled';
import { Backdrop } from '@/ui/components/backdrop';
import { Portal } from '@/ui/components/portal';
import { ModalWindow, ModalWindowlProps } from './modal-window';

export type ModalProps = ModalWindowlProps & {
  hasBackdrop?: boolean;
};

export const Modal = (props: ModalProps) => {
  const { open, onClose, hasBackdrop = true } = props;

  let modalNode: ReactNode;

  if (!open) {
    modalNode = null;
  } else {
    modalNode = (
      <S.ModalStyled>
        {hasBackdrop && (
          <Backdrop
            open={open}
            onClick={onClose}
          />
        )}

        <ModalWindow {...props} />
      </S.ModalStyled>
    );
  }

  return <Portal>{modalNode}</Portal>;
};

export * from './modal-window';
