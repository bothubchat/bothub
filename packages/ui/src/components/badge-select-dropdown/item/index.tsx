import React, { useCallback } from 'react';
import { BadgeSelectDropdownListItemStyled } from './styled';
import { useBadgeSelectDropdown } from '../context';
import { BadgeSelectDropdownSpanStyled } from '../styled';

export type BadgeSelectDropdownListItemProps = React.ComponentProps<
  typeof BadgeSelectDropdownListItemStyled
> & {
  children: React.ReactNode;
};

export const BadgeSelectDropdownListItem: React.FC<
  BadgeSelectDropdownListItemProps
> = ({ onClick, children, ...props }) => {
  const { setIsOpen } = useBadgeSelectDropdown();

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLLIElement>) => {
      onClick?.(event);
      setIsOpen(false);
    },
    [onClick, setIsOpen]
  );

  return (
    <BadgeSelectDropdownListItemStyled
      {...props}
      onClick={handleClick}
    >
      <BadgeSelectDropdownSpanStyled>{children}</BadgeSelectDropdownSpanStyled>
    </BadgeSelectDropdownListItemStyled>
  );
};
