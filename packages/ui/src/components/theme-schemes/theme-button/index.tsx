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
  ThemeButtonOutlineStyled,
  ThemeButtonStyled,
  ThemeButtonWrapperStyled
} from './styled';

export type ThemeButtonEventHandler = () => unknown;

export interface ThemeButtonProps {
  theme: Pick<Theme, 'colors' | 'mode'>;
  active?: boolean;
  hasActions?: boolean;
  onClick: ThemeButtonEventHandler;
  onEdit?: ThemeButtonEventHandler;
  onDelete?: ThemeButtonEventHandler;
}

export const ThemeButton: React.FC<ThemeButtonProps> = React.memo(
  ({ theme, active, hasActions, onClick, onEdit, onDelete }) => {
    const standardTheme = useTheme();

    return (
      <ThemeProvider theme={{ ...standardTheme, ...theme }}>
        <ThemeButtonWrapperStyled>
          <ThemeButtonOutlineStyled $active={active}>
            <ThemeButtonStyled onClick={onClick}>
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
          </ThemeButtonOutlineStyled>
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
