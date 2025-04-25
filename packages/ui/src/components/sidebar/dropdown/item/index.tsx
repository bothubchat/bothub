import React, { useCallback } from 'react';
import { useSidebarDropdown } from '../context';
import { SidebarDropdownItemStyled, SidebarDropdownItemText } from './styled';

export type SidebarDropdownItemProps = React.ComponentProps<
  typeof SidebarDropdownItemStyled
> & {
  startIcon?: React.ReactElement;
};

export const SidebarDropdownItem: React.FC<SidebarDropdownItemProps> = ({
  onClick,
  startIcon,
  ...props
}) => {
  const { setIsOpen } = useSidebarDropdown();

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      onClick?.(event);
      setIsOpen(false);
    },
    [onClick]
  );

  return (
    <SidebarDropdownItemStyled
      {...props}
      onClick={handleClick}
    >
      {startIcon}
      <SidebarDropdownItemText>{props.children}</SidebarDropdownItemText>
    </SidebarDropdownItemStyled>
  );
};
