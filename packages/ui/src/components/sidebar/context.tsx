import React, { useContext, useMemo } from 'react';

export interface SidebarContextValue {
  isOpen: boolean;
  isEdit: boolean;
  scrollbarElement: Element | null;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export type SidebarEditContextValue = Pick<
  SidebarContextValue,
  'isEdit' | 'setIsEdit'
>;

export const SidebarContext = React.createContext<SidebarContextValue>({
  isOpen: false,
  isEdit: false,
  scrollbarElement: null,
  setIsEdit() {},
  setIsOpen() {},
});

export const SidebarEditContext = React.createContext<SidebarEditContextValue>({
  isEdit: false,
  setIsEdit() {},
});

export const SidebarProvider: React.FC<
  SidebarContextValue & React.PropsWithChildren
> = ({ children, isOpen, isEdit, scrollbarElement, setIsEdit, setIsOpen }) => {
  // A new object on every render of the sidebar would re-render every reader
  const value = useMemo<SidebarContextValue>(
    () => ({ isOpen, isEdit, scrollbarElement, setIsEdit, setIsOpen }),
    [isOpen, isEdit, scrollbarElement, setIsEdit, setIsOpen],
  );
  const editValue = useMemo<SidebarEditContextValue>(
    () => ({ isEdit, setIsEdit }),
    [isEdit, setIsEdit],
  );

  return (
    <SidebarContext.Provider value={value}>
      <SidebarEditContext.Provider value={editValue}>
        {children}
      </SidebarEditContext.Provider>
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => useContext(SidebarContext);

/**
 * The edit mode only. Unlike `useSidebar`, doesn't re-render the component
 * when the sidebar collapses or expands: use it in chat rows.
 */
export const useSidebarEdit = () => useContext(SidebarEditContext);

export const SidebarConsumer = SidebarContext.Consumer;
