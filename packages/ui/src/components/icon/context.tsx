import React, { useContext } from 'react';

export interface IconContextValue {
  size?: number;
  fill?: string;
  stroke?: string;
}

export const IconContext = React.createContext<IconContextValue | undefined>(
  undefined
);

export type IconProviderProps = IconContextValue & React.PropsWithChildren;

export const IconProvider: React.FC<IconProviderProps> = ({
  children,
  ...value
}) => <IconContext.Provider value={value}>{children}</IconContext.Provider>;

export interface IconConsumerProps {
  children: (value?: IconContextValue) => React.ReactNode;
}

export const IconConsumer: React.FC<IconConsumerProps> = ({ children }) => (
  <IconContext.Consumer>{children}</IconContext.Consumer>
);

export const useIconOrNull = () => useContext(IconContext) ?? null;
