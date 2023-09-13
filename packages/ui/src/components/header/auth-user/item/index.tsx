import React, { useCallback } from 'react';
import { ExecutionProps as StyledProps } from 'styled-components';
import { HeaderAuthUserItemStyled } from './styled';
import { useHeaderAuthUser } from '../context';

export interface HeaderAuthUserItemProps extends React.ComponentProps<'a'>, StyledProps {
  icon: React.ReactNode;
  to?: string;
}

export const HeaderAuthUserItem: React.FC<HeaderAuthUserItemProps> = ({
  icon, to, children, ...props 
}) => {
  const { setIsOpen } = useHeaderAuthUser();

  const handleClick = useCallback((event: React.MouseEvent<HTMLAnchorElement>) => {
    props.onClick?.(event);
    setIsOpen(false);
  }, [props.onClick]);

  return (
    <HeaderAuthUserItemStyled {...props} to={to} onClick={handleClick}>
      {icon}
      {children}
    </HeaderAuthUserItemStyled>
  );
};
