import { useSidebar } from '../context';
import {
  SidebarChatStyled,
  SidebarChatIconSkeleton,
  SidebarChatName,
  SidebarChatSkeleton as SidebarChatSkeletonStyled,
  SidebarChatButton,
} from './styled';

export const SidebarChatSkeleton: React.FC = () => {
  const { isOpen: sidebarOpen } = useSidebar();

  if (sidebarOpen) {
    return (
      <SidebarChatStyled>
        <SidebarChatName $skeleton>
          <SidebarChatIconSkeleton />
          <SidebarChatSkeletonStyled />
        </SidebarChatName>
      </SidebarChatStyled>
    );
  }
  return (
    <SidebarChatButton>
      <SidebarChatIconSkeleton />
    </SidebarChatButton>
  );
};
