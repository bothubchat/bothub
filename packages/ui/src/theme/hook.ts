import { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { Theme } from './types';

export function useTheme(): Theme {
  const value = useContext(ThemeContext);

  if (!value) {
    throw new Error('useTheme must be used within a ThemeProvider.');
  }

  return value;
}
