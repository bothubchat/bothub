import {
  SidebarChatStyled,
  SidebarChatIconSkeleton,
  SidebarChatName,
  SidebarChatSkeleton as SidebarChatSkeletonStyled
} from './styled';

export const SidebarChatSkeleton: React.FC = () => (
  <SidebarChatStyled>
    <SidebarChatName>
      <SidebarChatIconSkeleton />
      <SidebarChatSkeletonStyled />
    </SidebarChatName>
  </SidebarChatStyled>
);
