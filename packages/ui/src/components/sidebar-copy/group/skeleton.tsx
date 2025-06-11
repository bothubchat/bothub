import { PropsWithChildren } from 'react';
import {
  SidebarGroupStyled,
  SidebarGroupList,
  SidebarGroupSkeletonStyled,
  SidebarGroupIconSkeleton,
  SidebarGroupSkeletonContainer
} from './styled';

export const SidebarGroupSkeleton: React.FC<PropsWithChildren> = ({
  children
}) => (
  <SidebarGroupStyled>
    <SidebarGroupSkeletonContainer>
      <SidebarGroupIconSkeleton />
      <SidebarGroupSkeletonStyled />
    </SidebarGroupSkeletonContainer>
    <SidebarGroupList>{children}</SidebarGroupList>
  </SidebarGroupStyled>
);
