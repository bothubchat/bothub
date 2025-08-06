import React from 'react';
import {
  ThemeSchemeSectionButtons,
  ThemeSchemeSectionRadio,
  ThemeSchemeSectionStyled,
} from './styled';

export type ThemeSchemesSectionEventHandler = () => unknown;

export interface ThemeSchemesSectionProps {
  title?: string;
  children?: React.ReactNode;
  active?: boolean;
  onClick?: ThemeSchemesSectionEventHandler;
}

export const ThemeSchemesSection: React.FC<ThemeSchemesSectionProps> =
  React.memo(({ children, title, active = false, onClick }) => (
    <ThemeSchemeSectionStyled>
      <ThemeSchemeSectionRadio
        label={title}
        checked={active}
        onClick={onClick}
      />
      <ThemeSchemeSectionButtons>{children}</ThemeSchemeSectionButtons>
    </ThemeSchemeSectionStyled>
  ));
