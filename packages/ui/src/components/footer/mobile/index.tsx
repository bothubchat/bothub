import { ChatsIcon, MenuIcon, SettingsIcon, UserProfileIcon } from '@/ui/icons';
import {
  FooterMobileStyled,
  FooterMobileButton,
  FooterMobileNewChatButton
} from './styled';
import { useTheme } from '@/ui/theme';

export type FooterMobileButtonClickHandler = () => unknown;

export type FooterMobileButtonActiveProp = 'menu' | 'chats' | 'settings' | null;

export interface FooterMobileProps {
  activeButton?: FooterMobileButtonActiveProp;
  onMenuClick: FooterMobileButtonClickHandler;
  onChatsClick: FooterMobileButtonClickHandler;
  onAddChatClick: FooterMobileButtonClickHandler;
  onSettingsClick: FooterMobileButtonClickHandler;
  onUserClick: FooterMobileButtonClickHandler;
}

export const FooterMobile: React.FC<FooterMobileProps> = ({
  activeButton,
  onMenuClick,
  onChatsClick,
  onAddChatClick,
  onSettingsClick,
  onUserClick
}) => {
  const theme = useTheme();

  return (
    <FooterMobileStyled>
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
        <UserProfileIcon />
      </FooterMobileButton>
    </FooterMobileStyled>
  );
};
