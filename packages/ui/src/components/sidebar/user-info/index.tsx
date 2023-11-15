import React from 'react';
import {
  SidebarUserInfoBottom, 
  SidebarUserInfoContent,
  SidebarUserInfoName,
  SidebarUserInfoStyled, 
  SidebarUserInfoText, 
  SidebarUserInfoTokens, 
  SidebarUserInfoTop, 
  SidebarUserInfoTopLeft, 
  SidebarUserInfoTopRight
} from './styled';
import { useSidebar } from '../context';
import { useTheme } from '@/ui/theme';

export interface SidebarUserInfoProps {
  avatar?: React.ReactNode;
  name?: string;
  tokens?: string;
  tariff?: React.ReactNode;
  updateTariff?: React.ReactNode;
  linkAs?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  to?: string;
  onClick?: React.MouseEventHandler;
}

export const SidebarUserInfo: React.FC<SidebarUserInfoProps> = ({
  avatar, 
  name, 
  tokens = '',
  tariff,
  updateTariff,
  linkAs,
  to,
  onClick
}) => {
  const theme = useTheme();
  const { isOpen } = useSidebar();

  return (
    <SidebarUserInfoStyled
      $open={isOpen}
      variants={{
        open: {
          border: `1px solid ${theme.colors.grayScale.gray2}`,
          borderRadius: 18,
          background: theme.colors.grayScale.gray3
        },
        close: {
          border: '0px solid rgba(0, 0, 0, 0)',
          borderRadius: 0,
          background: 'rgba(0, 0, 0, 0)'
        }
      }}
      initial={isOpen ? 'open' : 'close'}
      animate={isOpen ? 'open' : 'close'}
    >
      <SidebarUserInfoContent>
        <SidebarUserInfoTop
          $length={tokens.length}
          as={linkAs} 
          to={to}
          onClick={onClick}  
        >
          <SidebarUserInfoTopLeft>
            {avatar}
            <SidebarUserInfoText>
              {name && (
                <SidebarUserInfoName>
                  {name}
                </SidebarUserInfoName>
              )}
              {tokens && (
                <SidebarUserInfoTokens>
                  {tokens}
                </SidebarUserInfoTokens>
              )}
            </SidebarUserInfoText>
          </SidebarUserInfoTopLeft>
          <SidebarUserInfoTopRight
            $open={isOpen}
          >
            {tariff}
          </SidebarUserInfoTopRight>
        </SidebarUserInfoTop>
        <SidebarUserInfoBottom
          $open={isOpen}
          $length={tokens.length}
        >
          {updateTariff}
        </SidebarUserInfoBottom>
      </SidebarUserInfoContent>
    </SidebarUserInfoStyled>
  );
};

export * from './styled';
export * from './avatar';
