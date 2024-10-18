import React, { useCallback } from 'react';
import { useSidebarLangDropdown } from '../context';
import { SidebarLangDropdownItemStyled } from './styled';

export type SidebarLangDropdownItemProps = React.ComponentProps<typeof SidebarLangDropdownItemStyled>;

export const SidebarLangDropdownItem: React.FC<SidebarLangDropdownItemProps> = ({
  onClick,
  ...props
}) => {
  const { setIsOpen } = useSidebarLangDropdown();

  const handleClick = useCallback((event: React.MouseEvent<HTMLLIElement>) => {
    onClick?.(event);
    setIsOpen(false);
  }, [onClick]);

  return <SidebarLangDropdownItemStyled {...props} onClick={handleClick} />;
};

