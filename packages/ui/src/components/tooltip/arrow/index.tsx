import React from 'react';
import { TooltipArrowStyled } from './styled';
import { TooltipVariant } from '../types';
import { useTheme } from '@/ui/theme';

export interface TooltipArrowProps {
  variant: TooltipVariant;
}

export const TooltipArrow: React.FC<TooltipArrowProps> = ({ 
  variant
}) => {
  const theme = useTheme();

  return (
    <TooltipArrowStyled
      width="9" 
      height="7" 
      viewBox="0 0 9 7" 
      fill="none"
    >
      <path 
        d="M3.73201 6.0791C4.13179 6.55848 4.86821 6.55848 5.26799 6.0791L8.7611 1.89047C9.30422 1.2392 8.84112 0.25 7.99311 0.25H1.00689C0.15888 0.25 -0.304218 1.2392 0.2389 1.89046L3.73201 6.0791Z" 
        fill={variant === 'primary' ? theme.colors.grayScale.gray2 : theme.colors.grayScale.gray3} 
      />
    </TooltipArrowStyled>
  );
};
