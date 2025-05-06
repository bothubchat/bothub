import React from 'react';

import { ColorSchemeNames, useTheme, themes } from '@/ui/theme';
import { ThemeSchemesSection } from './section';
import { ThemeSchemesStyled } from './styled';
import { ThemeButton } from './theme-button';

export type ThemeSchemesEventHandler = (scheme: ColorSchemeNames) => unknown;

export interface ThemeSchemesProps {
  onClick?: ThemeSchemesEventHandler;
}

export const ThemeSchemes: React.FC<ThemeSchemesProps> = React.memo(
  ({ onClick }) => {
    const theme = useTheme();

    return (
      <ThemeSchemesStyled>
        <ThemeSchemesSection
          title="Пользовательская"
          onClick={() => onClick?.('custom')}
        >
          <ThemeButton theme={theme} />
        </ThemeSchemesSection>
        <ThemeSchemesSection
          title="Стандартная"
          onClick={() => onClick?.('standard')}
        >
          <ThemeButton theme={theme} />
        </ThemeSchemesSection>
        <ThemeSchemesSection
          title="Цветная"
          onClick={() => onClick?.('strawberry')}
        >
          <ThemeButton theme={themes.strawberry[theme.mode]} />
          <ThemeButton theme={themes.rose[theme.mode]} />
          <ThemeButton theme={theme} />
          <ThemeButton theme={theme} />
          <ThemeButton theme={theme} />
          <ThemeButton theme={theme} />
          <ThemeButton theme={theme} />
          <ThemeButton theme={theme} />
          <ThemeButton theme={theme} />
        </ThemeSchemesSection>
      </ThemeSchemesStyled>
    );
  }
);
