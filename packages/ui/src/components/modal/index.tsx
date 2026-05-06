import { useCallback, useState, type ReactNode } from 'react';
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
  const [align, setAlign] = useState<'center' | 'flex-start'>('center');

  const handleHeightChange = useCallback((height: number) => {
    const currentAlign =
      height + 32 > window.innerHeight ? 'flex-start' : 'center';
    setAlign((prev) => (prev === currentAlign ? prev : currentAlign));
  }, []);

  let modalNode: ReactNode;

  if (!open) {
    modalNode = null;
  } else {
    modalNode = (
      <S.ModalStyled
        $scrollbarEnabled={scrollModal}
        $align={align}
      >
        {hasBackdrop && (
          <Backdrop
            open={open}
            onClick={onClose}
          />
        )}
        <ModalWindow
          {...props}
          open={open}
          onClose={onClose}
          onHeightChange={handleHeightChange}
        />
      </S.ModalStyled>
    );
  }

  return <Portal>{modalNode}</Portal>;
};

export * from './modal-window';
