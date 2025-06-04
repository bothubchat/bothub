import React, { useCallback, useMemo, useState } from 'react';

import {
  ColorSchemeNames,
  useTheme,
  THEMES,
  Theme,
  defaultTheme,
  ColorSchemeNamesArray
} from '@/ui/theme';
import { ThemeSchemesSection } from './section';
import { ThemeSchemesStyled } from './styled';
import { ThemeButton } from './theme-button';

export type ThemeSchemesEventHandler = () => unknown;
export type ThemeSchemesClickEventHandler = (
  scheme: ColorSchemeNames
) => unknown;

export interface ThemeSchemesProps {
  customTitle?: string;
  standardTitle?: string;
  colorfulTitle?: string;
  activeScheme: ColorSchemeNames;
  customTheme?: Pick<Theme, 'colors'>;
  onClick?: ThemeSchemesClickEventHandler;
  onEditCustom?: ThemeSchemesEventHandler;
  onResetCustom?: ThemeSchemesEventHandler;
}

export const ThemeSchemes: React.FC<ThemeSchemesProps> = ({
  customTitle,
  standardTitle,
  colorfulTitle,
  activeScheme,
  customTheme,
  onClick,
  onEditCustom,
  onResetCustom
}) => {
  const theme = useTheme();

  const [scheme, setScheme] = useState<ColorSchemeNames>(activeScheme);

  const custom = useMemo(
    () => ({
      ...defaultTheme,
      ...customTheme
    }),
    [customTheme]
  );

  const handleClick = useCallback(
    (scheme: ColorSchemeNames) => {
      setScheme(scheme);
      onClick?.(scheme);
    },
    [onClick]
  );

  return (
    <ThemeSchemesStyled>
      <ThemeSchemesSection
        title={customTitle}
        active={scheme === 'custom'}
        onClick={() => handleClick('custom')}
      >
        <ThemeButton
          theme={custom}
          active={scheme === 'custom'}
          hasActions={scheme === 'custom'}
          onClick={() => handleClick('custom')}
          onEdit={onEditCustom}
          onDelete={onResetCustom}
        />
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
