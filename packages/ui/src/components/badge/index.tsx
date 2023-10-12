import React from 'react';
import { BadgeStyled, BadgeText } from './styled';
import { IconProvider } from '@/ui/components/icon';
import { useTheme } from '@/ui/theme';
import { BadgeVariant } from './types';

export interface BadgeProps extends React.ComponentProps<'span'> {
  variant?: BadgeVariant;
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'info', icon, children, ...props
}) => {
  const theme = useTheme();

  return (
    <BadgeStyled
      $variant={variant} 
      {...props}
    >
      <IconProvider
        size={12}
        fill={theme.colors.base.white}
      >
        {icon}
      </IconProvider>
      {typeof children !== 'string' && children}
      {typeof children === 'string' && (
        <BadgeText>
          {children}
        </BadgeText>
      )}
    </BadgeStyled>
  );
};

export * from './types';
export * from './styled';
