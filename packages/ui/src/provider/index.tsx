import React from 'react';
import { BothubGlobalStyle, BothubGlobalStyleProps } from '@/ui/styles';
import { ThemeProvider, ThemeProviderProps } from '@/ui/theme';

export interface BothubUIProviderProps extends React.PropsWithChildren {
  theme?: ThemeProviderProps;
  disableGlobalStyle?: boolean;
  globalStyle?: BothubGlobalStyleProps;
}

export const BothubUIProvider: React.FC<BothubUIProviderProps> = ({
  theme,
  disableGlobalStyle = false,
  globalStyle,
  children,
}) => (
  <ThemeProvider {...theme}>
    {children}
    {!disableGlobalStyle && <BothubGlobalStyle {...globalStyle} />}
  </ThemeProvider>
);
