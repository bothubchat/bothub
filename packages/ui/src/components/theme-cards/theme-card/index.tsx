import React, { useCallback, useMemo } from 'react';
import { useTheme } from '@/ui/theme';

import {
  ThemeCardImage,
  ThemeCardStyled,
  ThemeCardTopbar,
  ThemeCardTopbarRadio,
  ThemeCardTopbarTitle,
  ThemeCardTopbarTitleText,
} from './styled';

import DarkUrl from './assets/dark.svg';
import LightUrl from './assets/light.svg';

import { DarkIcon } from '@/ui/icons/dark';
import { LightIcon } from '@/ui/icons/light';
import { SystemIcon } from '@/ui/icons/system';

import { IconProvider } from '../../icon';

const darkLightUrls = {
  dark: DarkUrl,
  light: LightUrl,
};

export type ThemeCardVariantType = 'dark' | 'light' | 'system';

export interface ThemeCardProps {
  variant: ThemeCardVariantType;
  title?: string;
  checked?: boolean;
  isSystemDark?: boolean;
  onClick?: (variant: ThemeCardVariantType) => unknown;
}

export const ThemeCard: React.FC<ThemeCardProps> = ({
  variant,
  title,
  checked = false,
  isSystemDark,
  onClick,
}) => {
  const theme = useTheme();

  const imageUrls = useMemo(
    () => ({
      ...darkLightUrls,
      system: isSystemDark ? DarkUrl : LightUrl,
    }),
    [isSystemDark],
  );

  const imgSrc = useMemo(() => imageUrls[variant], [imageUrls, variant]);

  const icon = useMemo(() => {
    switch (variant) {
      case 'dark':
        return <DarkIcon />;
      case 'light':
        return <LightIcon />;
      case 'system':
        return <SystemIcon />;
      default:
        return null;
    }
  }, [variant]);

  const handleClick = useCallback(() => {
    onClick?.(variant);
  }, []);

  return (
    <ThemeCardStyled onClick={handleClick}>
      <ThemeCardTopbar>
        <ThemeCardTopbarRadio checked={checked} />
        <ThemeCardTopbarTitle>
          <IconProvider fill={theme.colors.base.white}>{icon}</IconProvider>
          <ThemeCardTopbarTitleText>{title}</ThemeCardTopbarTitleText>
        </ThemeCardTopbarTitle>
      </ThemeCardTopbar>
      <ThemeCardImage
        src={imgSrc}
        alt={`theme-${variant}`}
      />
    </ThemeCardStyled>
  );
};
