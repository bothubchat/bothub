import { useSidebar } from '../context';
import {
  SidebarChatStyled,
  SidebarChatIconSkeleton,
  SidebarChatName,
  SidebarChatSkeleton as SidebarChatSkeletonStyled,
  SidebarChatButton,
  SidebarChatBox,
} from './styled';

export const SidebarChatSkeleton: React.FC = () => {
  const { isOpen: sidebarOpen } = useSidebar();

  if (sidebarOpen) {
    return (
      <SidebarChatBox>
        <SidebarChatStyled>
          <SidebarChatName $skeleton>
            <SidebarChatIconSkeleton />
            <SidebarChatSkeletonStyled />
          </SidebarChatName>
        </SidebarChatStyled>
      </SidebarChatBox>
    );
  }
  return (
    <SidebarChatButton>
      <SidebarChatIconSkeleton />
    </SidebarChatButton>
  );
};
