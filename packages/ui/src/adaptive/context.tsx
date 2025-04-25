import React, { useContext } from 'react';

export interface AdaptiveContextValue {
  isDesktop: boolean;
  isTablet: boolean;
  isMobile: boolean;
}

export const AdaptiveContext = React.createContext<AdaptiveContextValue>({
  isDesktop: false,
  isTablet: false,
  isMobile: false
});

export const AdaptiveProvider: React.FC<
  AdaptiveContextValue & React.PropsWithChildren
> = ({ children, ...value }) => (
  <AdaptiveContext.Provider value={value}>{children}</AdaptiveContext.Provider>
);

export const useAdaptive = () => useContext(AdaptiveContext);
