import { PropsWithChildren } from 'react';
import {
  SidebarGroupStyled,
  SidebarGroupList,
  SidebarGroupSkeletonStyled,
  SidebarGroupIconSkeleton,
  SidebarGroupSkeletonContainer,
  SidebarGroupButton,
} from './styled';
import { useSidebar } from '../context';

export const SidebarGroupSkeleton: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const { isOpen: sidebarOpen } = useSidebar();

  if (!sidebarOpen) {
    return (
      <SidebarGroupStyled>
        <SidebarGroupButton>
          <SidebarGroupIconSkeleton />
        </SidebarGroupButton>
      </SidebarGroupStyled>
    );
  }
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
