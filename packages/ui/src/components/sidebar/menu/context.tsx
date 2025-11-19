import React, { createContext, ReactNode } from 'react';

export type SidebarMenuContextValue = {
  isShowTooltips: boolean;
  setShowTooltips: React.Dispatch<React.SetStateAction<boolean>>;
};

export const SidebarMenuContext = createContext<SidebarMenuContextValue>({
  isShowTooltips: false,
  setShowTooltips: () => {},
});

export const SidebarMenuProvider = ({
  children,
  value,
}: {
  children: ReactNode;
  value: SidebarMenuContextValue;
}) => (
  <SidebarMenuContext.Provider value={value}>
    {children}
  </SidebarMenuContext.Provider>
);

export const useSidebarMenu = () => {
  const context = React.useContext(SidebarMenuContext);

  if (!context) {
    throw new Error('useSidebarMenu must be used within SidebarMenuProvider');
  }

  return context;
};
