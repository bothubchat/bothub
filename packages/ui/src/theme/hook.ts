import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { Theme } from './types';

export interface ThemeValue {
  /** The current theme. */
  theme: Theme;
  /** The theme given to styles, the same object while CSS variables are on. */
  styleTheme: Theme;
}

export const ThemeValueContext = React.createContext<ThemeValue | null>(null);

export function useTheme(): Theme {
  const value = useContext(ThemeValueContext);
  const styleTheme = useContext(ThemeContext);

  // A styled-components ThemeProvider inside ours gives its own theme.
  if (value && styleTheme === value.styleTheme) {
    return value.theme;
  }

  if (!styleTheme) {
    throw new Error('useTheme must be used within a ThemeProvider.');
  }

  return styleTheme as Theme;
}
