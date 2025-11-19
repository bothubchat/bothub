import { PropsWithChildren } from 'react';
import {
  SidebarGroupStyled,
  SidebarGroupList,
  SidebarGroupSkeletonStyled,
  SidebarGroupIconSkeleton,
  SidebarGroupSkeletonContainer,
} from './styled';
import { useSidebar } from '../context';

export const SidebarGroupSkeleton: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const { isOpen: sidebarOpen } = useSidebar();
  return (
    <SidebarGroupStyled>
      <SidebarGroupSkeletonContainer>
        <SidebarGroupIconSkeleton />
        <SidebarGroupSkeletonStyled />
      </SidebarGroupSkeletonContainer>
      {!!children && (
        <SidebarGroupList $isSidebarOpen={sidebarOpen}>
          {children}
        </SidebarGroupList>
      )}
    </SidebarGroupStyled>
  );
};
