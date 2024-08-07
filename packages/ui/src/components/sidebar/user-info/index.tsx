import React from 'react';
import {
  SidebarUserInfoTariffContainer, 
  SidebarUserInfoContent,
  SidebarUserInfoName,
  SidebarUserInfoStyled, 
  SidebarUserInfoText, 
  SidebarUserInfoCaps,  
  SidebarUserInfoLeft, 
  SidebarUserInfoUpdateTariffContainer,
  SidebarUserInfoMain,
  SidebarUserInfoLogoutButtonContainer
} from './styled';
import { useSidebar } from '../context';
import { useTheme } from '@/ui/theme';
import { SidebarUserInfoProvider } from './context';

export interface SidebarUserInfoProps {
  avatar?: React.ReactNode;
  name?: string;
  caps?: string;
  tariff?: React.ReactNode;
  updateTariff?: React.ReactNode;
  logout?: React.ReactNode;
  linkAs?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  to?: string;
  onClick?: React.MouseEventHandler;
}

export const SidebarUserInfo: React.FC<SidebarUserInfoProps> = ({
  avatar, 
  name, 
  caps,
  tariff,
  updateTariff,
  logout,
  linkAs,
  to,
  onClick
}) => {
  const theme = useTheme();
  const { isOpen } = useSidebar();

  return (
    <SidebarUserInfoProvider
      caps={caps}
    >
      <SidebarUserInfoStyled
        $open={isOpen}
        variants={{
          open: {
            border: `1px solid ${theme.mode === 'light' ? theme.colors.grayScale.gray3 : theme.colors.grayScale.gray2}`,
            borderRadius: 18,
            background: theme.mode === 'light' ? theme.default.colors.base.white : theme.colors.grayScale.gray3
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
          <SidebarUserInfoMain
            as={linkAs} 
            to={to}
            onClick={onClick}  
          >
            <SidebarUserInfoLeft>
              {avatar}
              <SidebarUserInfoText>
                {name && (
                  <SidebarUserInfoName>
                    {name}
                  </SidebarUserInfoName>
                )}
                {caps && (
                  <SidebarUserInfoCaps>
                    {caps}
                  </SidebarUserInfoCaps>
                )}
              </SidebarUserInfoText>
            </SidebarUserInfoLeft>
            <SidebarUserInfoLogoutButtonContainer
              $open={isOpen}
            >
              {logout}
            </SidebarUserInfoLogoutButtonContainer>
          </SidebarUserInfoMain>
          <SidebarUserInfoTariffContainer
            $open={isOpen}
          >
            {tariff}
          </SidebarUserInfoTariffContainer>
          <SidebarUserInfoUpdateTariffContainer
            $open={isOpen}
          >
            {updateTariff}
          </SidebarUserInfoUpdateTariffContainer>
        </SidebarUserInfoContent>
      </SidebarUserInfoStyled>
    </SidebarUserInfoProvider>
  );
};

export * from './styled';
export * from './context';
export * from './avatar';
