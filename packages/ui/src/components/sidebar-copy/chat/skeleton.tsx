import {
  SidebarChatStyled,
  SidebarChatIconSkeleton,
  SidebarChatName,
  SidebarChatSkeleton as SidebarChatSkeletonStyled
} from './styled';

export const SidebarChatSkeleton: React.FC = () => (
  <SidebarChatStyled>
    <SidebarChatIconSkeleton />
    <SidebarChatName>
      <SidebarChatSkeletonStyled />
    </SidebarChatName>
    <SidebarChatIconSkeleton />
  </SidebarChatStyled>
);
