import React from 'react';
import { ChatsIcon, MenuIcon, SettingsIcon } from '@/ui/icons';
import {
  FooterMobileStyled,
  FooterMobileButton,
  FooterMobileNewChatButton
} from './styled';
import { useTheme } from '@/ui/theme';
import { SidebarUserInfoAvatar } from '@/ui/components/sidebar';
import { TariffPlan } from '@/ui/components/types';

export type FooterMobileButtonClickHandler = () => unknown;

export type FooterMobileButtonActiveProp = 'menu' | 'chats' | 'settings' | null;

export interface FooterMobileProps {
  isPreset?: boolean;
  tariffPlan?: TariffPlan;
  activeButton?: FooterMobileButtonActiveProp;
  onMenuClick: FooterMobileButtonClickHandler;
  onChatsClick: FooterMobileButtonClickHandler;
  onAddChatClick: FooterMobileButtonClickHandler;
  onSettingsClick: FooterMobileButtonClickHandler;
  onUserClick: FooterMobileButtonClickHandler;
}

export const FooterMobile: React.FC<FooterMobileProps> = React.memo(
  ({
    isPreset,
    tariffPlan,
    activeButton,
    onMenuClick,
    onChatsClick,
    onAddChatClick,
    onSettingsClick,
    onUserClick
  }) => {
    const theme = useTheme();

    return (
      <FooterMobileStyled $isPreset={isPreset}>
        <FooterMobileButton onClick={onMenuClick}>
          <MenuIcon
            fill={
              activeButton === 'menu'
                ? theme.colors.accent.primary
                : theme.colors.base.white
            }
          />
        </FooterMobileButton>
        <FooterMobileButton onClick={onChatsClick}>
          <ChatsIcon
            fill={
              activeButton === 'chats'
                ? theme.colors.accent.primary
                : theme.colors.base.white
            }
          />
        </FooterMobileButton>
        <FooterMobileNewChatButton onClick={onAddChatClick} />
        <FooterMobileButton onClick={onSettingsClick}>
          <SettingsIcon
            fill={
              activeButton === 'settings'
                ? theme.colors.accent.primary
                : theme.colors.base.white
            }
          />
        </FooterMobileButton>
        <FooterMobileButton
          $iconSize={44}
          onClick={onUserClick}
        >
          <SidebarUserInfoAvatar
            tariffPlan={tariffPlan}
            size={44}
          />
        </FooterMobileButton>
      </FooterMobileStyled>
    );
  }
);
