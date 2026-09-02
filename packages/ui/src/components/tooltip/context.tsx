import React, { useContext, useMemo } from 'react';

export interface TooltipContextValue {
  handleTooltipMouseEnter: React.MouseEventHandler<Element>;
  handleTooltipMouseLeave: React.MouseEventHandler<Element>;
  handleTooltipPointerMove: React.PointerEventHandler<Element>;
}

const throwTooltipProviderError = () => {
  throw new Error('Tooltip context is unavailable outside TooltipProvider.');
};

export const TooltipContext = React.createContext<TooltipContextValue>({
  handleTooltipMouseEnter: throwTooltipProviderError,
  handleTooltipMouseLeave: throwTooltipProviderError,
  handleTooltipPointerMove: throwTooltipProviderError,
});

export const TooltipProvider: React.FC<
  TooltipContextValue & React.PropsWithChildren
> = ({ children, ...value }) => (
  <TooltipContext.Provider
    value={useMemo(
      () => value,
      [
        value.handleTooltipMouseEnter,
        value.handleTooltipMouseLeave,
        value.handleTooltipPointerMove,
      ],
    )}
  >
    {children}
  </TooltipContext.Provider>
);

export const TooltipConsumer = TooltipContext.Consumer;

export const useTooltip = () => {
  const context = useContext(TooltipContext);
  return context;
};
