import React from 'react';
import { SidebarChatList, SidebarGroupStyled, SidebarGroupName } from './styled';
import { Skeleton } from '@/ui/components/skeleton';

export interface SidebarGroupDefaultProps {
  name: string;
  skeleton?: false;
}

export interface SidebarGroupSkeletonProps {
  skeleton: true;
}

export type SidebarGroupProps = (SidebarGroupDefaultProps | SidebarGroupSkeletonProps) & React.PropsWithChildren;

export const SidebarGroup: React.FC<SidebarGroupProps> = ({
  children, ...props
}) => (
  <SidebarGroupStyled>
    <SidebarGroupName>
      {!props.skeleton && props.name}
      {props.skeleton && (
        <Skeleton width={120} />
      )}
    </SidebarGroupName>
    <SidebarChatList>
      {children}
    </SidebarChatList>
  </SidebarGroupStyled>
);

export * from './styled';
