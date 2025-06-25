import React, { useCallback, useState } from 'react';
import { DarkIcon } from '@/ui/icons/dark';
import { LightIcon } from '@/ui/icons/light';
import { SystemIcon } from '@/ui/icons/system';
import { IconProvider } from '@/ui/components/icon';
import {
  ThemeSwitcherItem,
  ThemeSwitcherItemBackground,
  ThemeSwitcherItemContent,
  ThemeSwitcherList,
  ThemeSwitcherStyled
} from './styled';
import { ThemeSwitcherMode } from './types';
import { ThemeMode, useTheme } from '@/ui/theme';

const items: Array<ThemeSwitcherMode> = ['light', 'dark', 'system'];

export type ThemeSwitcherChangeEventHandler = (mode: ThemeMode) => unknown;

export type ThemeSwitcherSystemClickEventHandler = () => unknown;

export interface ThemeSwitcherProps {
  mode?: ThemeSwitcherMode;
  defaultMode?: ThemeSwitcherMode;
  onChange?: ThemeSwitcherChangeEventHandler;
  onSystemClick?: ThemeSwitcherSystemClickEventHandler;
}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({
  mode: initialMode,
  defaultMode = 'dark',
  onChange,
  onSystemClick
}) => {
  const theme = useTheme();

  const [mode, setMode] = useState<ThemeSwitcherMode>(
    initialMode ?? defaultMode
  );

  const handleClick = useCallback((newMode: ThemeSwitcherMode) => {
    setMode(newMode);

    if (newMode === 'system') {
      onSystemClick?.();
      return;
    }

    onChange?.(newMode);
  }, []);

  return (
    <ThemeSwitcherStyled>
      <ThemeSwitcherList>
        <ThemeSwitcherItemBackground $mode={mode} />
        {items.map((itemMode) => {
          const isActive = itemMode === mode;

          let fill: string;

          let icon: React.ReactNode;

          if (isActive) {
            fill = theme.colors.base.white;
          } else {
            fill = theme.colors.grayScale.gray1;
          }

          switch (itemMode) {
            case 'dark':
              icon = <DarkIcon />;
              break;
            case 'light':
              icon = <LightIcon />;
              break;
            case 'system':
              icon = <SystemIcon />;
              break;
          }

          return (
            <ThemeSwitcherItem
              key={itemMode}
              onClick={() => handleClick(itemMode)}
            >
              <ThemeSwitcherItemContent>
                <IconProvider
                  size={20}
                  fill={fill}
                >
                  {icon}
                </IconProvider>
              </ThemeSwitcherItemContent>
            </ThemeSwitcherItem>
          );
        })}
      </ThemeSwitcherList>
    </ThemeSwitcherStyled>
  );
};

export * from './types';
export * from './styled';
