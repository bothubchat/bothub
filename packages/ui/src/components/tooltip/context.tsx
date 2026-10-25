import React, { useContext, useMemo } from 'react';

export interface TooltipContextValue {
  handleTooltipMouseEnter: React.MouseEventHandler<Element>;
  handleTooltipMouseLeave: React.MouseEventHandler<Element>;
  handleTooltipPointerMove: React.PointerEventHandler<Element>;
}

export const TooltipContext = React.createContext<TooltipContextValue>({
  handleTooltipMouseEnter: () => {},
  handleTooltipMouseLeave: () => {},
  handleTooltipPointerMove: () => {},
});

export const TooltipProvider: React.FC<
  TooltipContextValue & React.PropsWithChildren
> = ({
  children,
  handleTooltipMouseEnter,
  handleTooltipMouseLeave,
  handleTooltipPointerMove,
}) => {
  const value = useMemo<TooltipContextValue>(
    () => ({
      handleTooltipMouseEnter,
      handleTooltipMouseLeave,
      handleTooltipPointerMove,
    }),
    [
      handleTooltipMouseEnter,
      handleTooltipMouseLeave,
      handleTooltipPointerMove,
    ],
  );

  return (
    <TooltipContext.Provider value={value}>{children}</TooltipContext.Provider>
  );
};

export const TooltipConsumer = TooltipContext.Consumer;

export const useTooltip = () => useContext(TooltipContext);
