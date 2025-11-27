import React from 'react';
import { useSidebar } from '../context';
import {
  SidebarUserAvatarBox,
  SidebarUserBox,
  SidebarUserCaps,
  SidebarUserInfo,
  SidebarUserName,
  SidebarUserStyled,
  SidebarUserTextBox,
} from './styled';

export interface SidebarUserInfoProps {
  avatar?: React.ReactNode;
  name?: string;
  caps?: string;
  updateTariff?: React.ReactNode;
  logout?: React.ReactNode;
  linkAs?: React.ElementType;
  to?: string;
  onClick?: React.MouseEventHandler;
}

export const SidebarUser: React.FC<SidebarUserInfoProps> = ({
  avatar,
  name,
  caps,
  updateTariff,
  logout,
  linkAs,
  to,
  onClick,
}) => {
  const { isOpen } = useSidebar();

  if (!isOpen) {
    return avatar;
  }

  return (
    <SidebarUserStyled>
      <SidebarUserBox>
        <SidebarUserInfo
          as={linkAs}
          to={to}
          onClick={onClick}
        >
          <SidebarUserAvatarBox>{avatar}</SidebarUserAvatarBox>
          <SidebarUserTextBox>
            <SidebarUserName>{name}</SidebarUserName>
            <SidebarUserCaps>{caps}</SidebarUserCaps>
          </SidebarUserTextBox>
        </SidebarUserInfo>
        {logout}
      </SidebarUserBox>
      {updateTariff}
    </SidebarUserStyled>
  );
};

export * from './styled';
export * from './avatar';
export * from './skeleton';
