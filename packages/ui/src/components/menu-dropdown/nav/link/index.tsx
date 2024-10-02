import React, { useCallback } from 'react';
import { MenuDropdownNavLinkStyled, MenuDropdownNavLinkStyledProps, MenuDropdownNavLinkText } from './styled';
import { IconProvider } from '@/ui/components/icon';
import { useMenuDropdown } from '../../context';

export type MenuDropdownNavLinkProps = Omit<
React.ComponentProps<typeof MenuDropdownNavLinkStyled>,
keyof MenuDropdownNavLinkStyledProps
> & {
  as?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  to?: string;
  active?: boolean;
  icon?: React.ReactNode;
};

export const MenuDropdownNavLink: React.FC<MenuDropdownNavLinkProps> = ({
  as, to, icon, active = false, children, ...props
}) => {
  const { setIsOpen } = useMenuDropdown();

  const handleClick = useCallback<React.MouseEventHandler<HTMLAnchorElement>>((event) => {
    setIsOpen(false);
    
    props.onClick?.(event);
  }, [props.onClick]);

  return (
    <MenuDropdownNavLinkStyled
      $active={active}
      {...props}
      as={as}
      to={to}
      onClick={handleClick}
    >
      <IconProvider
        size={34}
      >
        {icon}
      </IconProvider>
      <MenuDropdownNavLinkText>
        {children}
      </MenuDropdownNavLinkText>
    </MenuDropdownNavLinkStyled>
  );
};
