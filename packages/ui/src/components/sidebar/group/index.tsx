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
  SidebarGroupsStyled,
  SidebarGroupSkeletonIcon,
  SidebarGroupTooltip,
  SidebarGroupNameWithOutline,
  SidebarGroupNameWithBg
} from './styled';
import { Tooltip, TooltipConsumer } from '@/ui/components/tooltip';
import { useSidebar } from '../context';

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
  active?: boolean;
  onHandleOpen?: () => void;
}

export interface SidebarGroupSkeletonProps {
  skeleton: true;
  open?: boolean;
  color?: string;
  isDefault?: boolean;
  onHandleOpen?: () => void;
}

export type SidebarGroupProps = (
  | SidebarGroupDefaultProps
  | SidebarGroupSkeletonProps
) &
  React.PropsWithChildren;

export const SidebarGroup: React.FC<SidebarGroupProps> = ({
  children,
  ...props
}) => {
  const [open, setOpen] =
    props.open !== undefined
      ? [props.open, props.onHandleOpen]
      : useState<boolean>(false);
  const { setNodeRef } = useDroppable({
    id: !props.skeleton ? props.id : 'draggable-skeleton'
  });
  const sidebarOpen = useSidebar().isOpen;
  const onHandleOpen = useCallback(() => {
    setOpen?.(!open);
  }, [open, setOpen]);

  const over = !props.skeleton && props.edit && props.over;
  return (
    <SidebarGroupStyled
      $over={over}
      ref={!props.skeleton && props.edit ? setNodeRef : undefined}
    >
      {!props.isDefault && (
        <SidebarGroupNameWithOutline
          $active={!props.skeleton && props.active}
          $open={open}
        >
          <SidebarGroupNameWithBg>
            <SidebarGroupName
              open={open}
              $skeleton={!!props.skeleton}
              onClick={!props.skeleton ? onHandleOpen : undefined}
            >
              {!props.skeleton && props.edit && <SidebarGroupDragHandle />}
              {!props.skeleton && (
                <>
                  <SidebarGroupTooltip
                    label={props.name}
                    placement="center-right"
                    placementX={15}
                    disabled={props.name.length <= 0 || sidebarOpen}
                  >
                    <TooltipConsumer>
                      {({
                        handleTooltipMouseEnter,
                        handleTooltipMouseLeave
                      }) => (
                        <SidebarGroupDragFolder
                          onMouseEnter={handleTooltipMouseEnter}
                          onMouseLeave={handleTooltipMouseLeave}
                          fill={props.color}
                        />
                      )}
                    </TooltipConsumer>
                  </SidebarGroupTooltip>
                </>
              )}
              {props.skeleton && (
                <SidebarGroupSkeletonIcon
                  width={24}
                  height={24}
                />
              )}
              {!props.skeleton && (
                <Tooltip
                  label={props.name}
                  placement="top-left"
                  disabled={props.name.length <= 24}
                >
                  <TooltipConsumer>
                    {({ handleTooltipMouseEnter, handleTooltipMouseLeave }) => (
                      <SidebarGroupNameBox
                        onMouseEnter={handleTooltipMouseEnter}
                        onMouseLeave={handleTooltipMouseLeave}
                      >
                        {props.name.slice(0, 22)}
                        {props.name.length > 22 && '...'}
                      </SidebarGroupNameBox>
                    )}
                  </TooltipConsumer>
                </Tooltip>
              )}
              {!props.skeleton && <SidebarGroupArrowDown />}
              {!props.skeleton && props.edit && props.checkbox}
              {!props.skeleton && !props.edit && props.actions}
              {props.skeleton && <SidebarGroupSkeleton />}
            </SidebarGroupName>
          </SidebarGroupNameWithBg>
        </SidebarGroupNameWithOutline>
      )}
      <SidebarChatList open={props.isDefault || open}>
        {children}
      </SidebarChatList>
    </SidebarGroupStyled>
  );
};

export const SidebarGroups: React.FC<{ children: React.ReactNode }> = ({
  children
}) => <SidebarGroupsStyled>{children}</SidebarGroupsStyled>;

export * from './styled';
