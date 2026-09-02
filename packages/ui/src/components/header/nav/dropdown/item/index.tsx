import React, { useCallback } from 'react';
import {
  HeaderNavDropdownInfo,
  HeaderNavDropdownItemContent,
  HeaderNavDropdownItemStyled,
  HeaderNavDropdownText,
  HeaderNavDropdownTitle,
} from './styled';
import { useHeaderNavDropdown } from '../context';

export interface HeaderNavDropdownItemProps
  extends Omit<
    React.ComponentProps<typeof HeaderNavDropdownItemStyled>,
    'title'
  > {
  icon: React.ReactNode;
  title: string;
  text: string;
  as?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  to?: string;
}

export const HeaderNavDropdownItem: React.FC<HeaderNavDropdownItemProps> = ({
  icon,
  title,
  text,
  as,
  to,
  onClick,
  ...props
}) => {
  const { setIsOpen } = useHeaderNavDropdown();

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      onClick?.(event);
      setIsOpen(false);
    },
    [onClick, setIsOpen],
  );

  return (
    <HeaderNavDropdownItemStyled
      {...props}
      as={as}
      to={to}
      onClick={handleClick}
    >
      <HeaderNavDropdownItemContent>
        {icon}
        <HeaderNavDropdownInfo>
          <HeaderNavDropdownTitle>{title}</HeaderNavDropdownTitle>
          <HeaderNavDropdownText>{text}</HeaderNavDropdownText>
        </HeaderNavDropdownInfo>
      </HeaderNavDropdownItemContent>
    </HeaderNavDropdownItemStyled>
  );
};
