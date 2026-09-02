import { useCallback, useState } from 'react';
import { MessageVariant } from '../../types';
import { MessagesScrollValue } from '../../list/context';

const MENU_OFFSET = 36;
const MENU_PADDING = 8;
const MENU_ESTIMATED_WIDTH = 160;
const MENU_ESTIMATED_OPTION_HEIGHT = 48;
const MENU_ESTIMATED_VERTICAL_PADDING = 16;

type UseMessageActionsMenuPositionProps = {
  modalOptionsCount: number;
  variant: MessageVariant;
  scrollRef: MessagesScrollValue;
  messageActionsRef: React.RefObject<HTMLDivElement | null>;
  messageActionsMenuRef: React.RefObject<HTMLDivElement | null>;
  modalRef: React.RefObject<HTMLDivElement | null>;
};

export function useMessageActionsMenuPosition({
  modalOptionsCount,
  variant,
  scrollRef,
  messageActionsRef,
  messageActionsMenuRef,
  modalRef,
}: UseMessageActionsMenuPositionProps) {
  const [invertedX, setInvertedX] = useState<boolean>(false);
  const [invertedY, setInvertedY] = useState<boolean>(false);

  const calculateInversion = useCallback(() => {
    const container = scrollRef?.current?.element;
    const actions = messageActionsMenuRef.current ?? messageActionsRef.current;
    const modal = modalRef?.current;

    if (!container || !actions) return;

    const containerRect = container.getBoundingClientRect();
    const actionsRect = actions.getBoundingClientRect();

    const menuHeight =
      modal?.offsetHeight ??
      modalOptionsCount * MENU_ESTIMATED_OPTION_HEIGHT +
        MENU_ESTIMATED_VERTICAL_PADDING;
    const menuWidth = modal?.offsetWidth ?? MENU_ESTIMATED_WIDTH;

    const spaceBelow = containerRect.bottom - actionsRect.bottom;
    const spaceAbove = actionsRect.top - containerRect.top;

    const shouldInvertY =
      spaceBelow < menuHeight + MENU_OFFSET + MENU_PADDING &&
      spaceAbove > MENU_PADDING;

    const spaceLeft = actionsRect.left - containerRect.left;
    const spaceRight = containerRect.right - actionsRect.right;

    const shouldInvertX =
      variant === 'assistant'
        ? spaceLeft < menuWidth + MENU_PADDING
        : spaceRight < menuWidth + MENU_PADDING;

    setInvertedY(shouldInvertY);
    setInvertedX(shouldInvertX);
  }, [
    messageActionsMenuRef,
    messageActionsRef,
    modalOptionsCount,
    modalRef,
    scrollRef,
    variant,
  ]);

  return {
    invertedX,
    invertedY,
    calculateInversion,
  };
}
