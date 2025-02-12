import React, { useContext } from 'react';

export interface SelectFieldContextValue {
  selectRef: React.RefObject<HTMLElement>;
  handleSelectClick: React.MouseEventHandler<HTMLElement>;
}

export const SelectFieldContext = React.createContext<SelectFieldContextValue>({
  selectRef: React.createRef(),
  handleSelectClick: () => {}
});

export const SelectFieldProvider: React.FC<
  SelectFieldContextValue & React.PropsWithChildren
> = ({ children, ...value }) => (
  <SelectFieldContext.Provider value={value}>
    {children}
  </SelectFieldContext.Provider>
);

export const SelectFieldConsumer = SelectFieldContext.Consumer;

export const useSelectField = () => useContext(SelectFieldContext);
