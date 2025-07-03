import React, { useCallback, useState } from 'react';

import {
  ColorSchemeNames,
  useTheme,
  THEMES,
  ColorSchemeNamesArray,
  ThemeMode,
  ThemeColors
} from '@/ui/theme';
import { ThemeSchemesSection } from './section';
import { ThemeAddButton, ThemeSchemesStyled } from './styled';
import { ThemeButton } from './theme-button';

export type ThemeSchemesEventHandler = () => unknown;
export type ThemeSchemesClickEventHandler = (
  scheme: ColorSchemeNames
) => unknown;
export type ThemeSchemesCustomThemeClickEventHandler = (
  index: number
) => unknown;

export interface ThemeSchemesProps {
  customTitle?: string;
  standardTitle?: string;
  colorfulTitle?: string;
  activeScheme: ColorSchemeNames;
  customColorsArray: Array<Record<ThemeMode, ThemeColors>>;
  customThemeIndex: number;
  editTooltipText?: string | null;
  resetTooltipText?: string | null;
  onAddTheme?: ThemeSchemesEventHandler;
  onCustomClick?: ThemeSchemesCustomThemeClickEventHandler;
  onClick?: ThemeSchemesClickEventHandler;
  onEditCustom?: ThemeSchemesCustomThemeClickEventHandler;
  onResetCustom?: ThemeSchemesCustomThemeClickEventHandler;
}

export const ThemeSchemes: React.FC<ThemeSchemesProps> = ({
  customTitle,
  standardTitle,
  colorfulTitle,
  activeScheme,
  customColorsArray,
  customThemeIndex,
  editTooltipText,
  resetTooltipText,
  onAddTheme,
  onCustomClick,
  onClick,
  onEditCustom,
  onResetCustom
}) => {
  const theme = useTheme();

  const [scheme, setScheme] = useState<ColorSchemeNames>(activeScheme);

  const handleClick = useCallback(
    (scheme: ColorSchemeNames) => {
      setScheme(scheme);
      onClick?.(scheme);
    },
    [onClick]
  );

  const handleCustomClick = useCallback((index: number) => {
    setScheme('custom');
    onCustomClick?.(index);
  }, []);

  return (
    <ThemeSchemesStyled>
      <ThemeSchemesSection
        title={customTitle}
        active={scheme === 'custom'}
        onClick={() => handleCustomClick(0)}
      >
        {customColorsArray?.map((themeColors, idx) => (
          <ThemeButton
            key={`theme-button-custom-${idx}`}
            theme={{ colors: themeColors[theme.mode], mode: theme.mode }}
            active={scheme === 'custom' && customThemeIndex === idx}
            hasActions={scheme === 'custom' && customThemeIndex === idx}
            editTooltipText={editTooltipText}
            resetTooltipText={resetTooltipText}
            onClick={() => handleCustomClick(idx)}
            onEdit={() => onEditCustom?.(idx)}
            onDelete={() => onResetCustom?.(idx)}
          />
        ))}
        <ThemeAddButton onClick={onAddTheme} />
      </ThemeSchemesSection>
      <ThemeSchemesSection
        title={standardTitle}
        active={scheme === 'standard'}
        onClick={() => handleClick('standard')}
      >
        <ThemeButton
          theme={THEMES.standard[theme.mode]}
          active={scheme === 'standard'}
          onClick={() => handleClick('standard')}
        />
      </ThemeSchemesSection>
      <ThemeSchemesSection
        title={colorfulTitle}
        active={ColorSchemeNamesArray.slice(2).includes(scheme)}
        onClick={() => handleClick('strawberry')}
      >
        <ThemeButton
          theme={THEMES.strawberry[theme.mode]}
          active={scheme === 'strawberry'}
          onClick={() => handleClick('strawberry')}
        />
        <ThemeButton
          theme={THEMES.rose[theme.mode]}
          active={scheme === 'rose'}
          onClick={() => handleClick('rose')}
        />
        <ThemeButton
          theme={THEMES.orange[theme.mode]}
          active={scheme === 'orange'}
          onClick={() => handleClick('orange')}
        />
        <ThemeButton
          theme={THEMES.milktea[theme.mode]}
          active={scheme === 'milktea'}
          onClick={() => handleClick('milktea')}
        />
        <ThemeButton
          theme={THEMES.banana[theme.mode]}
          active={scheme === 'banana'}
          onClick={() => handleClick('banana')}
        />
        <ThemeButton
          theme={THEMES.apple[theme.mode]}
          active={scheme === 'apple'}
          onClick={() => handleClick('apple')}
        />
        <ThemeButton
          theme={THEMES.swamp[theme.mode]}
          active={scheme === 'swamp'}
          onClick={() => handleClick('swamp')}
        />
        <ThemeButton
          theme={THEMES.aquamarine[theme.mode]}
          active={scheme === 'aquamarine'}
          onClick={() => handleClick('aquamarine')}
        />
        <ThemeButton
          theme={THEMES.mountain[theme.mode]}
          active={scheme === 'mountain'}
          onClick={() => handleClick('mountain')}
        />
        <ThemeButton
          theme={THEMES.lake[theme.mode]}
          active={scheme === 'lake'}
          onClick={() => handleClick('lake')}
        />
        <ThemeButton
          theme={THEMES.iris[theme.mode]}
          active={scheme === 'iris'}
          onClick={() => handleClick('iris')}
        />
        <ThemeButton
          theme={THEMES.peony[theme.mode]}
          active={scheme === 'peony'}
          onClick={() => handleClick('peony')}
        />
      </ThemeSchemesSection>
    </ThemeSchemesStyled>
  );
};
