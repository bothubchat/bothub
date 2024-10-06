import React, { useCallback } from 'react';
import { useSidebarDropdown } from '../context';
import { SidebarDropdownItemStyled } from './styled';

export type SidebarDropdownItemProps = React.ComponentProps<
  typeof SidebarDropdownItemStyled
>;

export const SidebarDropdownItem: React.FC<SidebarDropdownItemProps> = ({
  onClick,
  ...props
}) => {
  const { setIsOpen } = useSidebarDropdown();

  const handleClick = useCallback((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    onClick?.(event);
    setIsOpen(false);
  }, [onClick]);

  return <SidebarDropdownItemStyled {...props} onClick={handleClick} />;
};

