import React from 'react';
import { ButtonProps } from '@/ui/components/button';
import { AdaptiveButtonStyled, AdaptiveButtonTooltip } from './styled';
import { TooltipProps } from '@/ui/components/tooltip';

export type AdaptiveButtonProps = ButtonProps & {
  tooltip?: TooltipProps;
};

export const AdaptiveButton: React.FC<AdaptiveButtonProps> = ({
  variant = 'primary', size = 'small', tooltip, children, ...props
}) => (
  <AdaptiveButtonTooltip
    label={children}
    {...tooltip}
  >
    <AdaptiveButtonStyled
      $variant={variant}
      $size={size}
      {...props}
    >
      {children}
    </AdaptiveButtonStyled>
  </AdaptiveButtonTooltip>
);
