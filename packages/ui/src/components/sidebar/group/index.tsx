import React, { useCallback, useState } from 'react';
import {
  AnimateLayoutChanges, defaultAnimateLayoutChanges, useSortable
} from '@dnd-kit/sortable';
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
} from './styled';
import { Tooltip, TooltipConsumer } from '@/ui/components/tooltip';
import { useSidebar } from '../context';

export interface SidebarGroupDefaultProps {
  skeleton?: false;
  id: string;
  name: string;
  actions?: React.ReactNode;
  checkbox?: React.ReactNode;
  open?: boolean;
  color?: string;
  isDefault?: boolean;
  onHandleOpen?: () => void;
}

export interface SidebarGroupDraggableProps {
  edit?: boolean;
  itemsSortable?: string[];
  index?: number;
  isDragOverflow?: boolean;
}

export interface SidebarGroupSkeletonProps {
  skeleton: true;
  open?: boolean;
  color?: string;
  isDefault?: boolean;
  onHandleOpen?: () => void;
}

export type SidebarGroupProps
  = (SidebarGroupDefaultProps | SidebarGroupSkeletonProps)
  & SidebarGroupDraggableProps
  & React.PropsWithChildren;

const animateLayoutChanges: AnimateLayoutChanges = (args) => defaultAnimateLayoutChanges({
  ...args, wasDragging: true
});

export const SidebarGroup: React.FC<SidebarGroupProps> = ({
  children, ...props
}) => {
  const {
    setNodeRef,
    listeners,
    attributes,
    transform,
    transition,
    active,
    isDragging,
    over
  } = useSortable({
    id: !props.skeleton ? props.id : 'draggable-skeleton',
    data: {
      type: 'group',
      index: !props.skeleton && props?.index || 0,
      items: props.itemsSortable,
    },
    animateLayoutChanges,
  });
  const { isOpen: sidebarOpen } = useSidebar();

  const [open, setOpen] = props.open !== undefined
    ? [props.open, props.onHandleOpen]
    : useState<boolean>(false);

  const onChangeOpen = useCallback(() => {
    setOpen?.(!open);
  }, [open, setOpen]);

  const dragHandle = !props.skeleton && props.edit ? {
    ...listeners,
    ...attributes,
  } : {};

  const style = !props.skeleton && props.edit ? {
    transform: transform ? `translate3d(${transform?.x}px, ${transform?.y}px, 0)` : undefined,
    transition,
    opacity: isDragging ? 0 : 1,
  } : {};

  const isOverContainer = !props.skeleton
    && over
    && active?.data.current?.type !== 'group'
    ? props.id === over.id
    || props.itemsSortable?.includes(`${over.id}`)
    : false;

  return (
    <SidebarGroupStyled
      id={!props.skeleton ? props.id : ''}
      style={style}
      ref={!props.skeleton && props.edit ? setNodeRef : undefined}
      $over={isOverContainer}
      $dragging={props.isDragOverflow}
    >
      {!props.isDefault && (
        <SidebarGroupName
          onClick={!props.skeleton ? onChangeOpen : undefined}
          $open={isDragging ? false : open}
          $skeleton={!!props.skeleton}
        >
          {!props.skeleton && props.edit && (
            <SidebarGroupDragHandle {...dragHandle} />
          )}
          {!props.skeleton && (
            <>
              <SidebarGroupTooltip
                label={props.name}
                placement="center-right"
                placementX={15}
                disabled={props.name.length <= 0 || sidebarOpen}
              >
                <TooltipConsumer>
                  {({ handleTooltipMouseEnter, handleTooltipMouseLeave }) => (
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
          {props.skeleton && <SidebarGroupSkeletonIcon width={24} height={24} />}
          {!props.skeleton && (
            <Tooltip label={props.name} placement="top-left" disabled={props.name.length <= 24}>
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
      )}
      <SidebarChatList open={props.isDefault || open}>
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
