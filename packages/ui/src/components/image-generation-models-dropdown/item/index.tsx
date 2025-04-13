import React, { useCallback } from 'react';
import { DropDownModelItemListItemStyled } from './styled';
import { useDropDownModelItem } from '../context';

export type DropDownModelItemListItemProps = React.ComponentProps<
  typeof DropDownModelItemListItemStyled
>;
export const DropDownModelItemListItem: React.FC<
  DropDownModelItemListItemProps
> = ({ onClick, ...props }) => {
  const { setIsOpen } = useDropDownModelItem();

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLLIElement>) => {
      onClick?.(event);
      setIsOpen(false);
    },
    [onClick]
  );
  return (
    <DropDownModelItemListItemStyled
      {...props}
      onClick={handleClick}
    />
  );
};
