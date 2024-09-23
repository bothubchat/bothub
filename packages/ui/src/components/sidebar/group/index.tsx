import React, { useState } from 'react';
import {
  SidebarChatList, SidebarGroupStyled, SidebarGroupName, SidebarGroupTooltip,
  SidebarGroupSkeleton,
  SidebarGroupArrowDown
} from './styled';
import { TooltipConsumer } from '@/ui/components/tooltip';
import { useDroppable } from '@dnd-kit/core';

export interface SidebarGroupDefaultProps {
  name: string;
  skeleton?: false;
  id: string;
  edit?: boolean;
}

export interface SidebarGroupSkeletonProps {
  skeleton: true;
}

export type SidebarGroupProps
  = (SidebarGroupDefaultProps | SidebarGroupSkeletonProps) & React.PropsWithChildren;

export const SidebarGroup: React.FC<SidebarGroupProps> = ({
  children, ...props
}) => {
  const [open, setOpen] = useState<boolean>(true);
  const { setNodeRef } = useDroppable({
    id: !props.skeleton ? props.id : 'draggable-skeleton',
  });
  return (
    <SidebarGroupStyled ref={!props.skeleton && props.edit ? setNodeRef : undefined} onClick={() => setOpen(prev => !prev)}>
      <SidebarGroupName open={open}>
        {!props.skeleton && props.name}
        {props.skeleton && (
          <SidebarGroupSkeleton />
        )}
        <SidebarGroupArrowDown />
      </SidebarGroupName>
      <SidebarChatList open={open}>
        {children}
      </SidebarChatList>
    </SidebarGroupStyled>
  )
};

export * from './styled';
