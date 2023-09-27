import React from 'react';
import {
  ModalCloseButton,
  ModalCloseButtonIcon,
  ModalStyled, ModalTitle, ModalWindow, ModalWindowBody 
} from './styled';
import { Backdrop } from '../backdrop';
import { Portal } from '../portal';

export interface ModalProps extends React.PropsWithChildren {
  open: boolean;
  title?: string | null;
  onClose?: () => unknown;
}

export const Modal: React.FC<ModalProps> = ({
  open, title = null, children, onClose 
}) => {
  let modalNode: React.ReactNode;

  if (!open) {
    modalNode = null;
  } else {
    modalNode = (
      <ModalStyled>
        <Backdrop open={open} onClick={onClose} />
        <ModalWindow
          initial={{
            opacity: 0,
            transform: 'scale(0.9)'
          }}
          animate={{ 
            opacity: 1,
            transform: 'scale(1)'
          }}
          transition={{
            duration: 0.15
          }}
        >
          <ModalWindowBody>
            {title ? <ModalTitle>{title}</ModalTitle> : null}
            <ModalCloseButton onClick={onClose}>
              <ModalCloseButtonIcon size={24} />
            </ModalCloseButton>
            {children}
          </ModalWindowBody>
        </ModalWindow>
      </ModalStyled>
    );
  }

  return (
    <Portal>
      {modalNode}
    </Portal>
  );
};
