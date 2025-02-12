import React, { useCallback, useMemo, useState } from 'react';
import {
  HeaderThemeSwitcherIcon,
  HeaderThemeSwitcherItem,
  HeaderThemeSwitcherItemBackground,
  HeaderThemeSwitcherItemContent,
  HeaderThemeSwitcherList,
  HeaderThemeSwitcherStyled
} from './styled';
import { HeaderThemeSwitcherMode, IHeaderThemeSwitcherItem } from './types';
import { DarkIcon } from '@/ui/icons/dark';
import { LightIcon } from '@/ui/icons/light';
import { IconProvider } from '@/ui/components/icon';
import { useTheme } from '@/ui/theme';
import { useHeaderMenu } from '../menu';

export type HeaderThemeSwitcherChangeEventHandler = (
  mode: HeaderThemeSwitcherMode
) => unknown;

export interface HeaderThemeSwitcherProps {
  mode?: HeaderThemeSwitcherMode;
  defaultMode?: HeaderThemeSwitcherMode;
  onChange?: HeaderThemeSwitcherChangeEventHandler;
}

export const HeaderThemeSwitcher: React.FC<HeaderThemeSwitcherProps> = ({
  mode: initialMode,
  defaultMode = 'dark',
  onChange
}) => {
  const theme = useTheme();

  const { isInMenu } = useHeaderMenu();

  const setInitialMode = useCallback<
    React.Dispatch<React.SetStateAction<HeaderThemeSwitcherMode>>
  >(
    (mode) => {
      if (typeof mode === 'string') {
        onChange?.(mode);
      }
    },
    [onChange]
  );
  const [mode, setMode] =
    typeof initialMode === 'string'
      ? [initialMode, setInitialMode]
      : useState<HeaderThemeSwitcherMode>(defaultMode);
  const activeMode = mode;

  const items = useMemo<IHeaderThemeSwitcherItem[]>(
    () => [
      {
        mode: 'light'
      },
      {
        mode: 'dark'
      }
    ],
    []
  );

  const toggleMode = useCallback(() => {
    setMode(mode === 'light' ? 'dark' : 'light');
  }, [mode, setMode]);

  return (
    <HeaderThemeSwitcherStyled
      $inMenu={isInMenu}
      onClick={toggleMode}
    >
      <HeaderThemeSwitcherList $inMenu={isInMenu}>
        <HeaderThemeSwitcherItemBackground $isLight={mode === 'light'} />
        {items.map(({ mode }) => {
          const isActive = mode === activeMode;
          let fill: string;
          if (isActive) {
            switch (mode) {
              case 'light':
                fill = theme.colors.orange;
                break;
              case 'dark':
                fill = theme.colors.base.white;
                break;
            }
          } else {
            fill = theme.colors.grayScale.gray1;
          }

          return (
            <HeaderThemeSwitcherItem
              $inMenu={isInMenu}
              key={mode}
            >
              <HeaderThemeSwitcherItemContent $inMenu={isInMenu}>
                <IconProvider
                  size={20}
                  fill={fill}
                >
                  <HeaderThemeSwitcherIcon
                    as={mode === 'light' ? LightIcon : DarkIcon}
                  />
                </IconProvider>
              </HeaderThemeSwitcherItemContent>
            </HeaderThemeSwitcherItem>
          );
        })}
      </HeaderThemeSwitcherList>
    </HeaderThemeSwitcherStyled>
  );
};

export * from './types';
