import React from 'react';
import { Button, ButtonProps } from '@/ui/components/button';
import { useHeaderMenu } from '@/ui/components/header/menu/context';

export const HeaderUserButton: React.FC<ButtonProps> = ({ ...props }) => {
  const { isInMenu } = useHeaderMenu();

  return <Button {...props} fullWidth={isInMenu} />;
};
