import React, { useCallback } from 'react';
import { ExecutionProps as StyledProps } from 'styled-components';
import { useTheme } from '@/ui/theme';
import { IconProvider } from '@/ui/components/icon';
import { HeaderUserInfoItemContent, HeaderUserInfoItemStyled } from './styled';
import { useHeaderUserInfo } from '../context';
import { useHeader } from '../../context';

export interface HeaderUserInfoItemProps extends React.ComponentProps<'a'>, StyledProps {
  icon: React.ReactNode;
  to?: string;
}

export const HeaderUserInfoItem: React.FC<HeaderUserInfoItemProps> = ({
  icon, to, children, ...props 
}) => {
  const theme = useTheme();
  const { setIsMenuOpen } = useHeader();
  const { setIsOpen } = useHeaderUserInfo();

  const handleClick = useCallback((event: React.MouseEvent<HTMLAnchorElement>) => {
    props.onClick?.(event);
    setIsOpen(false);
    setIsMenuOpen(false);
  }, [props.onClick]);

  return (
    <HeaderUserInfoItemStyled {...props} to={to} onClick={handleClick}>
      <HeaderUserInfoItemContent
        initial={{
          background: theme.colors.grayScale.gray4
        }}
        whileHover={{
          background: theme.colors.grayScale.gray2
        }}
      >
        <IconProvider 
          size={18}
          fill={theme.colors.base.white}  
        >
          {icon}
        </IconProvider>
        {children}
      </HeaderUserInfoItemContent>
    </HeaderUserInfoItemStyled>
  );
};
