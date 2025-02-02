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
  SidebarUserInfoLogoutButtonContainer,
  SidebarUserInfoBottom
} from './styled';
import { useSidebar } from '../context';
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
  const { isOpen } = useSidebar();

  return (
    <SidebarUserInfoProvider
      caps={caps}
    >
      <SidebarUserInfoStyled $open={isOpen}>
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
          <SidebarUserInfoBottom>
            <SidebarUserInfoUpdateTariffContainer
              $open={isOpen}
            >
              {updateTariff}
            </SidebarUserInfoUpdateTariffContainer>
          </SidebarUserInfoBottom>
        </SidebarUserInfoContent>
      </SidebarUserInfoStyled>
    </SidebarUserInfoProvider>
  );
};

export * from './styled';
export * from './context';
export * from './avatar';
export * from './skeleton';
