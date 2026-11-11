import React, { createContext, useContext, useMemo } from 'react';

export interface ActionPlacement {
  /** Действие не поместилось в ряд и стоит пунктом в меню «ещё» */
  inMenu: boolean;
  /** Пункт выбран: меню пора закрыть */
  onSelect?: () => void;
}

const ActionPlacementContext = createContext<ActionPlacement>({
  inMenu: false,
});

export interface ActionMenuPlacementProps extends React.PropsWithChildren {
  onSelect: () => void;
}

/** Действия внутри рисуются пунктами меню: значок и подпись */
export const ActionMenuPlacement: React.FC<ActionMenuPlacementProps> = ({
  onSelect,
  children,
}) => {
  const value = useMemo(() => ({ inMenu: true, onSelect }), [onSelect]);

  return (
    <ActionPlacementContext.Provider value={value}>
      {children}
    </ActionPlacementContext.Provider>
  );
};

export const useActionPlacement = () => useContext(ActionPlacementContext);
