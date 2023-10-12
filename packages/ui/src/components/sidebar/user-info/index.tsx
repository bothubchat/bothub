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

export interface SidebarUserInfoProps {
  avatar?: React.ReactNode;
  name?: string;
  tokens?: string;
  tariff?: React.ReactNode;
  updateTariff?: React.ReactNode;
  linkAs?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  to?: string;
}

export const SidebarUserInfo: React.FC<SidebarUserInfoProps> = ({
  avatar, 
  name, 
  tokens,
  tariff,
  updateTariff,
  linkAs,
  to
}) => (
  <SidebarUserInfoStyled>
    <SidebarUserInfoContent>
      <SidebarUserInfoTop as={linkAs} to={to}>
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
        <SidebarUserInfoTopRight>
          {tariff}
        </SidebarUserInfoTopRight>
      </SidebarUserInfoTop>
      <SidebarUserInfoBottom>
        {updateTariff}
      </SidebarUserInfoBottom>
    </SidebarUserInfoContent>
  </SidebarUserInfoStyled>
);

export * from './styled';
