import React from 'react';
import {
  ModalCloseButton,
  ModalCloseButtonIcon,
  ModalContent,
  ModalStyled, 
  ModalTitle, 
  ModalWindow,
  ModalWindowBody, 
  ModalWindowBodyContent,
  ModalWindowBodyScrollbarWrapper
} from './styled';
import { Backdrop } from '@/ui/components/backdrop';
import { Portal } from '@/ui/components/portal';

export type ModalCloseEventHandler = () => unknown;

export interface ModalProps extends React.PropsWithChildren {
  open: boolean;
  title?: string | null;
  scrollbar?: boolean; 
  onClose?: ModalCloseEventHandler;
}

export const Modal: React.FC<ModalProps> = ({
  open, title = null, scrollbar = false, children, onClose 
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
            <ModalWindowBodyContent>
              <ModalWindowBodyScrollbarWrapper
                disabled={!scrollbar}
              >
                <ModalContent>
                  {children}
                </ModalContent>
              </ModalWindowBodyScrollbarWrapper>
            </ModalWindowBodyContent>
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
