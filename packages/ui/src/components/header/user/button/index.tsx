import React from 'react';
import { ButtonProps } from '@/ui/components/button';
import { useHeaderMenu } from '@/ui/components/header/menu/context';
import { ButtonStyled } from './styled';

export const HeaderUserButton: React.FC<ButtonProps> = ({ ...props }) => {
  const { isInMenu } = useHeaderMenu();

  return (
    <ButtonStyled
      {...props}
      fullWidth={isInMenu}
    />
  );
};
