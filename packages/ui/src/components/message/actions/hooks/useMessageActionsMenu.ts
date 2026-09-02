import { useCallback, useEffect, useState } from 'react';

type UseMessageActionsMenuProps = {
  calculateInversion: () => void;
};

export function useMessageActionsMenu({
  calculateInversion,
}: UseMessageActionsMenuProps) {
  const [menuShown, setMenuShown] = useState(false);
  const [closeTimeoutId, setCloseTimeoutId] = useState<number | null>(null);

  const clearCloseTimeout = useCallback(() => {
    if (closeTimeoutId !== null) {
      window.clearTimeout(closeTimeoutId);
      setCloseTimeoutId(null);
    }
  }, [closeTimeoutId]);

  const handleMenuOpen = useCallback(() => {
    clearCloseTimeout();
    calculateInversion();
    setMenuShown(true);
  }, [calculateInversion, clearCloseTimeout]);

  const handleButtonHoverIn = useCallback(() => {
    handleMenuOpen();
  }, [handleMenuOpen]);

  const handleButtonHoverOut = useCallback(() => {
    const timeoutId = window.setTimeout(() => {
      setMenuShown(false);
      setCloseTimeoutId(null);
    }, 300);

    setCloseTimeoutId(timeoutId);
  }, []);

  const handleButtonClick = useCallback(() => {
    if (menuShown) {
      setMenuShown(false);
      return;
    }

    handleMenuOpen();
  }, [handleMenuOpen, menuShown]);

  const closeMenu = useCallback(() => {
    setMenuShown(false);
  }, []);

  useEffect(() => {
    if (!menuShown) {
      return;
    }

    const handleGlobalClose = () => {
      closeMenu();
    };

    window.addEventListener('scroll', handleGlobalClose, true);
    return () => {
      window.removeEventListener('scroll', handleGlobalClose, true);
    };
  }, [closeMenu, menuShown]);

  useEffect(() => {
    if (!menuShown) {
      return;
    }

    const handleResize = () => {
      calculateInversion();
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [calculateInversion, menuShown]);

  useEffect(
    () => () => {
      clearCloseTimeout();
    },
    [clearCloseTimeout],
  );

  return {
    menuShown,
    closeMenu,
    handleMenuOpen,
    handleButtonHoverIn,
    handleButtonHoverOut,
    handleButtonClick,
  };
}
