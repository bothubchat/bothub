import React from 'react';
import { useTransition } from '@react-spring/web';
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
  title?: React.ReactNode;
  scrollbar?: boolean;
  images?: React.ReactNode;
  className?: string;
  hideCloseButton?: boolean;
  onClose?: ModalCloseEventHandler;
}

export const Modal: React.FC<ModalProps> = ({
  open,
  title = null,
  scrollbar = false,
  children,
  images,
  className,
  hideCloseButton = false,
  onClose
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
      <ModalStyled>
        <Backdrop
          open={open}
          onClick={onClose}
        />
        {modalTransition(
          (style, item) =>
            item && (
              <ModalWindow
                style={style}
                className={className}
              >
                {images}
                <ModalWindowBody>
                  {typeof title === 'string' ? (
                    <ModalTitle>{title}</ModalTitle>
                  ) : (
                    title
                  )}
                  {!hideCloseButton && (
                    <ModalCloseButton
                      onClick={onClose}
                      data-test="close modal"
                    >
                      <ModalCloseButtonIcon size={24} />
                    </ModalCloseButton>
                  )}
                  <ModalWindowBodyContent>
                    <ModalWindowBodyScrollbarWrapper
                      overflow={scrollbar ? 'auto' : 'visible'}
                      disabled={!scrollbar}
                      disableShadows={!scrollbar}
                    >
                      <ModalContent>{children}</ModalContent>
                    </ModalWindowBodyScrollbarWrapper>
                  </ModalWindowBodyContent>
                </ModalWindowBody>
              </ModalWindow>
            )
        )}
      </ModalStyled>
    );
  }

  return <Portal>{modalNode}</Portal>;
};
