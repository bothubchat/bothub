import React, { useCallback, useState } from 'react';
import { useDroppable } from '@dnd-kit/core';
import {
  SidebarChatList,
  SidebarGroupStyled,
  SidebarGroupName,
  SidebarGroupSkeleton,
  SidebarGroupArrowDown,
  SidebarGroupNameBox,
  SidebarGroupDragHandle,
  SidebarGroupDragFolder,
  SidebarGroupCheckbox,
  SidebarGroupsStyled,
  SidebarGroupSkeletonIcon
} from './styled';

export interface SidebarGroupDefaultProps {
  name: string;
  skeleton?: false;
  id: string;
  edit?: boolean;
  actions?: React.ReactNode;
  checkbox?: React.ReactNode;
  over?: boolean;
  open?: boolean;
  color?: string;
  isDefault?: boolean;
  onHandleOpen?: () => void;
}

export interface SidebarGroupSkeletonProps {
  skeleton: true;
  open?: boolean;
  color?: string;
  isDefault?: boolean;
  onHandleOpen?: () => void;
}

export type SidebarGroupProps
  = (SidebarGroupDefaultProps | SidebarGroupSkeletonProps) & React.PropsWithChildren;

export const SidebarGroup: React.FC<SidebarGroupProps> = ({
  children, ...props
}) => {
  const [open, setOpen] = props.open !== undefined
    ? [props.open, props.onHandleOpen] : useState<boolean>(false);
  const { setNodeRef } = useDroppable({
    id: !props.skeleton ? props.id : 'draggable-skeleton',
  });

  const onHandleOpen = useCallback((e: React.MouseEvent) => {
    setOpen?.(!open);
  }, [open, setOpen]);

  const over = !props.skeleton && props.edit && props.over;
  return (
    <SidebarGroupStyled
      $over={over}
      ref={!props.skeleton && props.edit ? setNodeRef : undefined}
    >
      {!props.isDefault && <SidebarGroupName
        open={open}
        $skeleton={!!props.skeleton}
        onClick={!props.skeleton ? onHandleOpen : undefined}
      >
        {!props.skeleton && props.edit && <SidebarGroupDragHandle />}
        {!props.skeleton && <SidebarGroupDragFolder fill={props.color} />}
        {props.skeleton && <SidebarGroupSkeletonIcon width={24} height={24} />}
        {!props.skeleton && (
          <SidebarGroupNameBox>
            {props.name.slice(0, 22)}
            {props.name.length > 22 && '...'}
          </SidebarGroupNameBox>
        )}
        {!props.skeleton && <SidebarGroupArrowDown />}
        {!props.skeleton && props.edit && props.checkbox}
        {!props.skeleton && !props.edit && props.actions}
        {props.skeleton && <SidebarGroupSkeleton />}
      </SidebarGroupName>}
      <SidebarChatList open={props.isDefault ? true : open}>
        {children}
      </SidebarChatList>
    </SidebarGroupStyled>
  );
};

export const SidebarGroups: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <SidebarGroupsStyled>
    {children}
  </SidebarGroupsStyled>
);

export * from './styled';
