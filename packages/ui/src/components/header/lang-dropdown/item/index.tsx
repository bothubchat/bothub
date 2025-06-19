import React, { useCallback } from 'react';
import { useHeaderLangDropdown } from '../context';
import { HeaderLangDropdownItemStyled } from './styled';

export type HeaderLangDropdownItemProps = React.ComponentProps<
  typeof HeaderLangDropdownItemStyled
>;

export const HeaderLangDropdownItem: React.FC<HeaderLangDropdownItemProps> = ({
  onClick,
  ...props
}) => {
  const { setIsOpen } = useHeaderLangDropdown();

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLLIElement>) => {
      onClick?.(event);
      setIsOpen(false);
    },
    [onClick]
  );

  return (
    <HeaderLangDropdownItemStyled
      {...props}
      onClick={handleClick}
    />
  );
};
