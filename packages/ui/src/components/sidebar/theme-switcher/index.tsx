import React, { useCallback, useMemo, useState } from 'react';
import { SidebarThemeSwitcherMode, ISidebarThemeSwitcherItem } from './types';
import { DarkIcon } from '@/ui/icons/dark';
import { LightIcon } from '@/ui/icons/light';
import { IconProvider } from '@/ui/components/icon';
import {
  SidebarThemeSwitcherIcon,
  SidebarThemeSwitcherItem,
  SidebarThemeSwitcherItemBackground,
  SidebarThemeSwitcherItemContent,
  SidebarThemeSwitcherList,
  SidebarThemeSwitcherStyled
} from './styled';
import { useTheme } from '@/ui/theme';
import { useSidebar } from '../context';

export type SidebarThemeSwitcherChangeEventHandler = (
  mode: SidebarThemeSwitcherMode
) => unknown;

export interface SidebarThemeSwitcherProps {
  mode?: SidebarThemeSwitcherMode;
  defaultMode?: SidebarThemeSwitcherMode;
  onChange?: SidebarThemeSwitcherChangeEventHandler;
}

export const SidebarThemeSwitcher: React.FC<SidebarThemeSwitcherProps> = ({
  mode: initialMode,
  defaultMode = 'dark',
  onChange
}) => {
  const theme = useTheme();
  const { isOpen } = useSidebar();

  const setInitialMode = useCallback<
    React.Dispatch<React.SetStateAction<SidebarThemeSwitcherMode>>
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
      : useState<SidebarThemeSwitcherMode>(defaultMode);
  const activeMode = mode;

  const items = useMemo<ISidebarThemeSwitcherItem[]>(
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
    <SidebarThemeSwitcherStyled
      $open={isOpen}
      onClick={toggleMode}
    >
      <SidebarThemeSwitcherList>
        <SidebarThemeSwitcherItemBackground $isLight={activeMode === 'light'} />
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
            <SidebarThemeSwitcherItem key={mode}>
              <SidebarThemeSwitcherItemContent>
                <IconProvider
                  size={20}
                  fill={fill}
                >
                  <SidebarThemeSwitcherIcon
                    as={mode === 'light' ? LightIcon : DarkIcon}
                  />
                </IconProvider>
              </SidebarThemeSwitcherItemContent>
            </SidebarThemeSwitcherItem>
          );
        })}
      </SidebarThemeSwitcherList>
    </SidebarThemeSwitcherStyled>
  );
};

export * from './types';
export * from './styled';
