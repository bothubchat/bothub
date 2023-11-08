import '../styles';
import './styled.d.ts';
import React, { useContext, useMemo } from 'react';
import { ThemeProvider as StyledThemeProvider, ThemeContext, createGlobalStyle } from 'styled-components';
import { Theme } from './types';

export const StorybookGlobalStyle = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.colors.base.black};
  }
`;

export interface ThemeProviderProps extends React.PropsWithChildren {
  sbMode?: boolean;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ sbMode = false, children }) => {
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
      critic: '#FE4242',
      orange: '#F29C1C',
      purple: '#941CF2',
      aqua: '#1CB2F2',
      green: '#1ABB34'
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
      maxWidth: '605px',
      minWidth: '400px'
    },
    zIndex: {
      menu: 2,
      header: 3,
      backdrop: 4,
      modal: 5,
      select: 6,
      notifications: 7,
      tooltip: 8
    },
    header: {
      height: '89px',
      mobile: {
        height: '70px'
      }
    },
    dashboard: {
      header: {
        height: '82px',
        tablet: {
          height: '76px'
        },
        mobile: {
          height: '58px'
        }
      },
      chat: {
        containerWidth: '1009px'
      }
    },
    sidebar: {
      width: '445px',
      minimizedWidth: '74px'
    }
  }), []);

  return (
    <StyledThemeProvider theme={theme}>
      {children}
      {sbMode && <StorybookGlobalStyle />}
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

export * from './types';
