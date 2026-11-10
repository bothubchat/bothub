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
    {/* Global styles are inserted in a layout effect, and effects run in
        tree order: placed first, they are in the document before the
        children read the layout, which is then computed once, not twice */}
    {!disableGlobalStyle && <BothubGlobalStyle {...globalStyle} />}
    {children}
  </ThemeProvider>
);
