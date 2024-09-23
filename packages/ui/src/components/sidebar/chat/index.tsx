import React from 'react';
import {
  SidebarChatColor,
  SidebarChatLeft,
  SidebarChatName,
  SidebarChatNameSkeleton,
  SidebarChatCaps,
  SidebarChatRight,
  SidebarChatStyled,
  SidebarChatTooltip,
  SidebarChatNameTooltip
} from './styled';
import { Skeleton } from '@/ui/components/skeleton';
import { TooltipConsumer } from '@/ui/components/tooltip';
import { useDraggable } from '@dnd-kit/core';
import { DragDotIcon } from '@/ui/icons';

export interface SidebarChatDefaultProps {
  color: string;
  name: string;
  caps?: string;
  active?: boolean;
  actions?: React.ReactNode;
  skeleton?: false;
  id: string;
  isDndOverflow?: boolean;
  edit?: boolean;
  checkbox?: React.ReactNode;
}

export interface SidebarChatSkeletonProps {
  skeleton: true;
}

export type SidebarChatProps = (SidebarChatDefaultProps | SidebarChatSkeletonProps) & {
  onClick?: React.MouseEventHandler<HTMLDivElement>;
};

export const SidebarChat: React.FC<SidebarChatProps> = ({
  onClick, ...props
}) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: !props.skeleton ? props.id : 'draggable-skeleton',
  });
  const style = transform ? {
    transform: `translate3d(1px, ${transform.y}px, 0)`,
    outline: '1px solid black',
    padding: '8px 10px',
  } : {};

  return (
    <SidebarChatStyled
      ref={!props.skeleton && props.edit ? setNodeRef : undefined} style={style} {...listeners} {...attributes}
      $active={(!props.skeleton && props.active) ?? false}
      $skeleton={!!props.skeleton}
      onClick={onClick}
    >
      <SidebarChatLeft>
        {!props.skeleton && props.edit && <DragDotIcon />}
        {!props.skeleton && (
          <SidebarChatTooltip
            label={props.name}
            placement="top-left"
          >
            <TooltipConsumer>
              {({
                handleTooltipMouseEnter,
                handleTooltipMouseLeave
              }) => (
                <SidebarChatColor
                  $color={props.color}
                  onMouseEnter={handleTooltipMouseEnter}
                  onMouseLeave={handleTooltipMouseLeave}
                />
              )}
            </TooltipConsumer>
          </SidebarChatTooltip>
        )}
        {props.skeleton && (
          <SidebarChatColor
            $skeleton
            as={Skeleton}
          />
        )}
        <SidebarChatNameTooltip
          {...(!props.skeleton && {
            label: props.name
          })}
          placement="top-left"
          disabled={props.skeleton || props.name.length <= 16}
        >
          <TooltipConsumer>
            {({
              handleTooltipMouseEnter,
              handleTooltipMouseLeave
            }) => (
              <SidebarChatName
                onMouseEnter={handleTooltipMouseEnter}
                onMouseLeave={handleTooltipMouseLeave}
              >
                {!props.skeleton && (
                  <>
                    {props.name.slice(0, 16)}
                    {props.name.length > 16 && '...'}
                  </>
                )}
                {props.skeleton && <SidebarChatNameSkeleton />}
              </SidebarChatName>
            )}
          </TooltipConsumer>
        </SidebarChatNameTooltip>
        {!props.skeleton && props.actions}
      </SidebarChatLeft>
      <SidebarChatRight>
        {(!props.skeleton && props.caps) && (
          <SidebarChatCaps>
            {props.caps}
          </SidebarChatCaps>
        )}
        {(!props.skeleton && props.edit) && props.checkbox}
      </SidebarChatRight>
    </SidebarChatStyled>
  )
};

export * from './styled';
