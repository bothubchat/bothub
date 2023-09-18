import React, { useCallback } from 'react';
import { ExecutionProps as StyledProps } from 'styled-components';
import { HeaderAuthUserItemContent, HeaderAuthUserItemStyled } from './styled';
import { useHeaderAuthUser } from '../context';
import { useTheme } from '../../../../theme';

export interface HeaderAuthUserItemProps extends React.ComponentProps<'a'>, StyledProps {
  icon: React.ReactNode;
  to?: string;
}

export const HeaderAuthUserItem: React.FC<HeaderAuthUserItemProps> = ({
  icon, to, children, ...props 
}) => {
  const theme = useTheme();
  const { setIsOpen } = useHeaderAuthUser();

  const handleClick = useCallback((event: React.MouseEvent<HTMLAnchorElement>) => {
    props.onClick?.(event);
    setIsOpen(false);
  }, [props.onClick]);

  return (
    <HeaderAuthUserItemStyled {...props} to={to} onClick={handleClick}>
      <HeaderAuthUserItemContent
        initial={{
          background: theme.colors.grayScale.gray4
        }}
        whileHover={{
          background: theme.colors.grayScale.gray2
        }}
      >
        {icon}
        {children}
      </HeaderAuthUserItemContent>
    </HeaderAuthUserItemStyled>
  );
};
