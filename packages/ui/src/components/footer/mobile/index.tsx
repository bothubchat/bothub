import React, { useMemo } from 'react';
import { ChatsIcon } from '@/ui/icons/chats';
import { MenuIcon } from '@/ui/icons/menu';
import { SettingsIcon } from '@/ui/icons/settings';
import {
  FooterMobileStyled,
  FooterMobileButton,
  FooterMobileNewChatButton,
} from './styled';
import { useTheme } from '@/ui/theme';
import { SidebarUserInfoAvatar } from '@/ui/components/sidebar';
import { TariffPlan } from '@/ui/components/types';
import { isBright } from '@/ui/utils';

export type FooterMobileButtonClickHandler = () => unknown;

export type FooterMobileButtonActiveProp = 'menu' | 'chats' | 'settings' | null;

export interface FooterMobileProps {
  isPreset?: boolean;
  src?: string;
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
    src,
    tariffPlan,
    activeButton,
    onMenuClick,
    onChatsClick,
    onAddChatClick,
    onSettingsClick,
    onUserClick,
  }) => {
    const theme = useTheme();

    const inactiveFill = useMemo(() => {
      if (isBright(theme.colors.grayScale.gray4)) {
        return theme.default.colors.base.black;
      }
      return theme.colors.base.white;
    }, [theme]);

    return (
      <FooterMobileStyled $isPreset={isPreset}>
        <FooterMobileButton onClick={onMenuClick}>
          <MenuIcon
            fill={
              activeButton === 'menu'
                ? theme.colors.accent.primary
                : inactiveFill
            }
          />
        </FooterMobileButton>
        <FooterMobileButton onClick={onChatsClick}>
          <ChatsIcon
            fill={
              activeButton === 'chats'
                ? theme.colors.accent.primary
                : inactiveFill
            }
          />
        </FooterMobileButton>
        <FooterMobileNewChatButton onClick={onAddChatClick} />
        <FooterMobileButton onClick={onSettingsClick}>
          <SettingsIcon
            fill={
              activeButton === 'settings'
                ? theme.colors.accent.primary
                : inactiveFill
            }
          />
        </FooterMobileButton>
        <SidebarUserInfoAvatar
          onClick={onUserClick}
          size={48}
          src={src}
          tariffPlan={tariffPlan}
        />
      </FooterMobileStyled>
    );
  },
);
