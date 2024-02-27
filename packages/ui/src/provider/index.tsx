import React from 'react';
import { BothubGlobalStyle, BothubGlobalStyleProps, BothubStyleSheetManager } from '@/ui/styles';
import { ThemeProvider, ThemeProviderProps } from '@/ui/theme';

export interface BothubUIProviderProps extends React.PropsWithChildren {
  theme?: ThemeProviderProps;
  globalStyle?: BothubGlobalStyleProps;
}

export const BothubUIProvider: React.FC<BothubUIProviderProps> = ({
  theme, globalStyle, children
}) => (
  <BothubStyleSheetManager>
    <ThemeProvider
      {...theme}
    >
      {children}
      <BothubGlobalStyle 
        {...globalStyle}
      />
    </ThemeProvider>
  </BothubStyleSheetManager>
);
