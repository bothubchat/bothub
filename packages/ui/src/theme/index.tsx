/// <reference path="./styled.d.ts" />

import 'normalize.css';
import React, { useContext, useMemo } from 'react';
import { ThemeProvider as StyledThemeProvider, ThemeContext } from 'styled-components';
import { Theme } from './types';
import { GlobalStyle } from './global-style';

export const ThemeProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const theme = useMemo<Theme>(() => ({
    colors: {
      base: {
        black: '#0E0C15',
        white: '#FFFFFF'
      },
      accent: {
        primary: '#1C64F2',
        primaryLight: '#4785FF',
        strong: '#073CA4',
        strongDown: '#0E3176'
      },
      grayScale: {
        gray1: '#616D8D',
        gray2: '#313E62',
        gray3: '#222B44',
        gray4: '#121825',
        gray5: '#374151',
        gray6: '#9CA3AF'
      },
      premiumGradient: 'linear-gradient(90deg, #1C64F2 -0.39%, #D41CF2 99.61%)',
      critic: '#FE4242'
    },
    fonts: {
      ibmPlexSans: {
        bold: '"IBMPlexSans Bold"',
        semiBold: '"IBMPlexSans SemiBold"',
        medium: '"IBMPlexSans Medium"',
        regular: '"IBMPlexSans Regular"'
      }
    },
    tablet: {
      maxWidth: '1377px'
    },
    mobile: {
      maxWidth: '605px'
    }
  }), []);

  return (
    <StyledThemeProvider theme={theme}>
      {children}
      <GlobalStyle />  
    </StyledThemeProvider>
  );
};

export function useTheme(): Theme {
  const value = useContext(ThemeContext);

  if (!value) {
    throw new Error('useTheme must be used within a ThemeProvider.');
  }

  return value;
}
