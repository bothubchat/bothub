import React, { useCallback } from 'react';
import { HeaderNavLinkStyled, HeaderNavLinkStyledProps } from './styled';
import { useHeaderMenu } from '../../menu/context';
import { useHeader } from '../../context';

export type HeaderNavLinkProps = Omit<
React.ComponentProps<typeof HeaderNavLinkStyled>, keyof HeaderNavLinkStyledProps
> & {
  as?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  to?: string;
  active?: boolean;
  icon?: React.ReactNode;
};

export const HeaderNavLink: React.FC<HeaderNavLinkProps> = ({ 
  as, to, icon, active = false, children, ...props 
}) => {
  const { variant } = useHeader();
  const { isInMenu, setIsOpen } = useHeaderMenu();

  const handleClick = useCallback((event: React.MouseEvent<HTMLAnchorElement>) => {
    props.onClick?.(event);
    setIsOpen(false);
  }, [props.onClick]);

  return (
    <HeaderNavLinkStyled 
      {...props}
      as={as}
      to={to}
      $variant={variant}
      $inMenu={isInMenu}
      $active={active}
      onClick={handleClick}
    >
      {icon}
      {children}
    </HeaderNavLinkStyled>
  );
};
