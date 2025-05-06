import React from 'react';

import { ThemeProvider } from 'styled-components';
import { HappyRobotIcon } from '@/ui/icons/happy-robot';
import { IconProvider } from '@/ui/components/icon';
import { Theme, useTheme } from '@/ui/theme';
import {
  ThemeButtonActions,
  ThemeButtonDeleteAction,
  ThemeButtonEditAction,
  ThemeButtonIconStyled,
  ThemeButtonStyled,
  ThemeButtonWrapperStyled
} from './styled';

export type ThemeButtonEventHandler = () => unknown;

export interface ThemeButtonProps {
  theme: Pick<Theme, 'colors' | 'mode'>;
  active?: boolean;
  hasActions?: boolean;
  onEdit?: ThemeButtonEventHandler;
  onDelete?: ThemeButtonEventHandler;
}

export const ThemeButton: React.FC<ThemeButtonProps> = React.memo(
  ({ theme, active, hasActions, onEdit, onDelete }) => {
    const standardTheme = useTheme();

    return (
      <ThemeProvider theme={{ ...standardTheme, ...theme }}>
        <ThemeButtonWrapperStyled>
          <ThemeButtonStyled $active={active}>
            <ThemeButtonIconStyled>
              <IconProvider
                fill={
                  theme.mode === 'dark'
                    ? theme.colors.accent.primaryLight
                    : theme.colors.accent.primary
                }
                size={28}
              >
                <HappyRobotIcon />
              </IconProvider>
            </ThemeButtonIconStyled>
          </ThemeButtonStyled>
          {hasActions && (
            <ThemeButtonActions>
              <ThemeButtonEditAction onClick={onEdit} />
              <ThemeButtonDeleteAction onClick={onDelete} />
            </ThemeButtonActions>
          )}
        </ThemeButtonWrapperStyled>
      </ThemeProvider>
    );
  }
);
