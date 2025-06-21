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
import { Tooltip, TooltipConsumer } from '../../tooltip';

export type ThemeButtonEventHandler = () => unknown;

export interface ThemeButtonProps {
  theme: Pick<Theme, 'colors' | 'mode'>;
  active?: boolean;
  hasActions?: boolean;
  editTooltipText?: string | null;
  resetTooltipText?: string | null;
  onClick: ThemeButtonEventHandler;
  onEdit?: ThemeButtonEventHandler;
  onDelete?: ThemeButtonEventHandler;
}

export const ThemeButton: React.FC<ThemeButtonProps> = React.memo(
  ({
    theme,
    active,
    hasActions,
    editTooltipText,
    resetTooltipText,
    onClick,
    onEdit,
    onDelete
  }) => {
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
              <Tooltip
                variant="primary"
                placement="center-right"
                label={editTooltipText}
              >
                <TooltipConsumer>
                  {({ handleTooltipMouseEnter, handleTooltipMouseLeave }) => (
                    <ThemeButtonEditAction
                      onClick={onEdit}
                      onMouseEnter={handleTooltipMouseEnter}
                      onMouseLeave={handleTooltipMouseLeave}
                    />
                  )}
                </TooltipConsumer>
              </Tooltip>
              <Tooltip
                variant="primary"
                placement="center-right"
                label={resetTooltipText}
              >
                <TooltipConsumer>
                  {({ handleTooltipMouseEnter, handleTooltipMouseLeave }) => (
                    <ThemeButtonDeleteAction
                      onClick={onDelete}
                      onMouseEnter={handleTooltipMouseEnter}
                      onMouseLeave={handleTooltipMouseLeave}
                    />
                  )}
                </TooltipConsumer>
              </Tooltip>
            </ThemeButtonActions>
          )}
        </ThemeButtonWrapperStyled>
      </ThemeProvider>
    );
  }
);
