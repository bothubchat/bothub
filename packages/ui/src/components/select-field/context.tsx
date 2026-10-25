import React, { useContext, useMemo } from 'react';

export interface SelectFieldContextValue {
  selectRef: React.RefObject<HTMLElement | null>;
  handleSelectClick: React.MouseEventHandler<HTMLElement>;
}

export const SelectFieldContext = React.createContext<SelectFieldContextValue>({
  selectRef: React.createRef(),
  handleSelectClick: () => {},
});

export const SelectFieldProvider: React.FC<
  SelectFieldContextValue & React.PropsWithChildren
> = ({ children, selectRef, handleSelectClick }) => {
  const value = useMemo(
    () => ({ selectRef, handleSelectClick }),
    [selectRef, handleSelectClick],
  );

  return (
    <SelectFieldContext.Provider value={value}>
      {children}
    </SelectFieldContext.Provider>
  );
};

export const SelectFieldConsumer = SelectFieldContext.Consumer;

export const useSelectFieldContext = () => useContext(SelectFieldContext);
