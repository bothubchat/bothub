import React, { useCallback } from 'react';
import { DropDownModelItemListItemStyled } from './styled';
import { useDropDownModelItem } from '../context';
import { DropDownModelItemSpanStyled } from '../styled';

export type DropDownModelItemListItemProps = React.ComponentProps<
  typeof DropDownModelItemListItemStyled
> & {
  children: React.ReactNode;
};

export const DropDownModelItemListItem: React.FC<
  DropDownModelItemListItemProps
> = ({ onClick, children, ...props }) => {
  const { setIsOpen } = useDropDownModelItem();

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLLIElement>) => {
      onClick?.(event);
      setIsOpen(false);
    },
    [onClick, setIsOpen]
  );

  return (
    <DropDownModelItemListItemStyled
      {...props}
      onClick={handleClick}
    >
      <DropDownModelItemSpanStyled>{children}</DropDownModelItemSpanStyled>
    </DropDownModelItemListItemStyled>
  );
};
