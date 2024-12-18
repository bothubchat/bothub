import React, { useMemo } from 'react';
import { TooltipArrowStyled } from './styled';
import { TooltipVariant, TooltipPlacement } from '../types';
import { useTheme } from '@/ui/theme';

export interface TooltipArrowProps {
  variant: TooltipVariant;
  inverted?: boolean;
  placement?: TooltipPlacement;
}

export const TooltipArrow: React.FC<TooltipArrowProps> = ({
  variant,
  inverted = false,
  placement,
}) => {
  const theme = useTheme();

  const transformArrow = useMemo(() => {
    switch (placement) {
      case 'center-left':
        return 'translateX(-12px) rotate(-90deg)';
      case 'center-right':
        return 'translateX(12px) rotate(90deg)';
      case 'top-left':
      case 'top-right':
      case 'top':
        return inverted ? 'translateY(3px) rotate(180deg)' : '';
      default:
        return '';
    }
  }, [placement, inverted]);

  return (
    <TooltipArrowStyled
      width="9"
      height="7"
      viewBox="0 0 9 7"
      fill="none"
      style={{
        transform: transformArrow,
      }}
    >
      <path
        d="M3.73201 6.0791C4.13179 6.55848 4.86821 6.55848 5.26799 6.0791L8.7611 1.89047C9.30422 1.2392 8.84112 0.25 7.99311 0.25H1.00689C0.15888 0.25 -0.304218 1.2392 0.2389 1.89046L3.73201 6.0791Z"
        fill={
          variant === 'primary'
            ? theme.colors.grayScale.gray2
            : theme.colors.grayScale.gray3
        }
      />
    </TooltipArrowStyled>
  );
};
