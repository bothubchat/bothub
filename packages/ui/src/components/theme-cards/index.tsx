import React, { useCallback, useState } from 'react';
import { ThemeCard, ThemeCardVariantType } from './theme-card';
import { ThemeCardsStyled } from './styled';

export interface ThemeCardsProps {
  titleDark?: string;
  titleLight?: string;
  titleSystem?: string;
  initialChecked?: ThemeCardVariantType;
  isSystemDark?: boolean;
  onChange?: (value: ThemeCardVariantType) => unknown;
}

export const ThemeCards: React.FC<ThemeCardsProps> = ({
  titleDark,
  titleLight,
  titleSystem,
  initialChecked,
  isSystemDark,
  onChange
}) => {
  const [variantChecked, setVariantChecked] =
    useState<ThemeCardVariantType | null>(initialChecked ?? null);

  const handleClick = useCallback((variant: ThemeCardVariantType) => {
    setVariantChecked(variant);
    onChange?.(variant);
  }, []);

  return (
    <ThemeCardsStyled>
      <ThemeCard
        variant="dark"
        checked={variantChecked === 'dark'}
        title={titleDark}
        isSystemDark={isSystemDark}
        onClick={handleClick}
      />
      <ThemeCard
        variant="light"
        checked={variantChecked === 'light'}
        title={titleLight}
        isSystemDark={isSystemDark}
        onClick={handleClick}
      />
      <ThemeCard
        variant="system"
        checked={variantChecked === 'system'}
        title={titleSystem}
        isSystemDark={isSystemDark}
        onClick={handleClick}
      />
    </ThemeCardsStyled>
  );
};
