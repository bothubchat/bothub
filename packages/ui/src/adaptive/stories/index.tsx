import React from 'react';
import {
  AdaptiveBlockDesktopText,
  AdaptiveBlockMiniTabletText,
  AdaptiveBlockMobileText,
  AdaptiveBlockStyled,
  AdaptiveBlockTabletText,
  AdaptiveBlockTouchText
} from './styled';
import { AdaptiveVariant } from '@/ui/adaptive';
import { useTheme } from '@/ui/theme';

export interface AdaptiveBlockProps {
  variant?: AdaptiveVariant;
  merge?: boolean;
  disableMiniTablet?: boolean;
}

export const AdaptiveBlock: React.FC<AdaptiveBlockProps> = ({
  variant = 'main',
  merge = false,
  disableMiniTablet = false
}) => {
  const theme = useTheme();

  let desktop: string;
  let tablet: string;
  let miniTablet: string;
  let mobile: string;
  switch (variant) {
    case 'dashboard':
      desktop = `>${theme.dashboard.tablet.maxWidth}`;
      tablet = `<=${theme.dashboard.tablet.maxWidth}`;
      miniTablet = `<=${theme.dashboard.miniTablet.maxWidth}`;
      mobile = `<=${theme.dashboard.mobile.maxWidth}`;
      break;
    default:
      desktop = `>${theme.tablet.maxWidth}`;
      tablet = `<=${theme.tablet.maxWidth}`;
      miniTablet = 'Not support';
      mobile = `<=${theme.mobile.maxWidth}`;
      break;
  }

  return (
    <AdaptiveBlockStyled
      $variant={variant}
      $merge={merge}
      $disableMiniTablet={disableMiniTablet}
      title="Adaptive"
    >
      <AdaptiveBlockDesktopText>Desktop ({desktop})</AdaptiveBlockDesktopText>
      <AdaptiveBlockTabletText>Tablet ({tablet})</AdaptiveBlockTabletText>
      <AdaptiveBlockMiniTabletText>
        Mini Tablet ({miniTablet}){disableMiniTablet && ' (Disabled)'}
      </AdaptiveBlockMiniTabletText>
      <AdaptiveBlockMobileText>Mobile ({mobile})</AdaptiveBlockMobileText>
      <AdaptiveBlockTouchText>Touch Mode</AdaptiveBlockTouchText>
    </AdaptiveBlockStyled>
  );
};
