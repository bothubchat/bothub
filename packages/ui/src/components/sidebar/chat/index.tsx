import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import {
  SidebarChatLeft,
  SidebarChatName,
  SidebarChatNameSkeleton,
  SidebarChatCaps,
  SidebarChatStyled,
  SidebarChatTooltip,
  SidebarChatNameTooltip,
  SidebarChatDragHandle,
  SidebarChatIconStyled,
  SidebarChatIconContainer,
  SidebarChatWithOutlineStyled,
  SidebarChatWithBackgroundStyled
} from './styled';
import { TooltipConsumer } from '@/ui/components/tooltip';

export interface SidebarChatDefaultProps {
  color: string;
  name: string;
  icon?: React.ReactNode;
  caps?: string;
  active?: boolean;
  actions?: React.ReactNode;
  skeleton?: false;
  id: string;
  isDndOverflow?: boolean;
  edit?: boolean;
  checkbox?: React.ReactNode;
  dragging?: boolean;
  isDefault?: boolean;
}

export interface SidebarChatSkeletonProps {
  skeleton: true;
  isDefault?: boolean;
}

export type SidebarChatProps = (
  | SidebarChatDefaultProps
  | SidebarChatSkeletonProps
) & {
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  onToggleCheckbox?: () => unknown;
};

export const SidebarChat: React.FC<SidebarChatProps> = React.memo(
  ({ onClick, onToggleCheckbox, ...props }) => {
    const { attributes, listeners, setNodeRef } = useDraggable({
      id: !props.skeleton ? props.id : 'draggable-skeleton'
    });

    const draggable =
      !props.skeleton && props.edit
        ? {
            ...listeners,
            ...attributes
          }
        : {};

    const style =
      !props.skeleton && props.dragging
        ? {
            height: 0,
            opacity: 0
          }
        : {};

    return (
      <SidebarChatWithOutlineStyled
        $active={(!props.skeleton && props.active) ?? false}
      >
        <SidebarChatWithBackgroundStyled
          $active={(!props.skeleton && props.active) ?? false}
        >
          <SidebarChatStyled
            style={style}
            $draggble={(!props.skeleton && props.isDndOverflow) || false}
            $active={(!props.skeleton && props.active) ?? false}
            $skeleton={!!props.skeleton}
            ref={!props.skeleton && props.edit ? setNodeRef : undefined}
            onClick={
              !props.skeleton
                ? !props.edit
                  ? onClick
                  : onToggleCheckbox
                : undefined
            }
          >
            {!props.skeleton && props.edit ? (
              <SidebarChatDragHandle {...draggable} />
            ) : (
              <SidebarChatIconContainer $isDefault={props.isDefault}>
                {!props.skeleton && props.icon ? (
                  props.icon
                ) : (
                  <SidebarChatIconStyled />
                )}
              </SidebarChatIconContainer>
            )}
            {!props.skeleton && (
              <SidebarChatTooltip
                label={props.name}
                placement="center-right"
                placementX={15}
                disabled={props.name.length <= 0}
              >
                <TooltipConsumer>
                  {({ handleTooltipMouseEnter, handleTooltipMouseLeave }) => (
                    <SidebarChatIconStyled
                      onClick={onClick as React.MouseEventHandler<Element>}
                      onMouseEnter={handleTooltipMouseEnter}
                      onMouseLeave={handleTooltipMouseLeave}
                    />
                  )}
                </TooltipConsumer>
              </SidebarChatTooltip>
            )}
            <SidebarChatLeft {...draggable}>
              <SidebarChatNameTooltip
                {...(!props.skeleton && {
                  label: props.name
                })}
                placement="top-left"
                disabled={props.skeleton || props.name.length <= 24}
              >
                <TooltipConsumer>
                  {({ handleTooltipMouseEnter, handleTooltipMouseLeave }) => (
                    <SidebarChatName
                      onMouseEnter={handleTooltipMouseEnter}
                      onMouseLeave={handleTooltipMouseLeave}
                    >
                      {!props.skeleton && (
                        <>
                          {props.name.slice(0, 18)}
                          {props.name.length > 18 && '...'}
                        </>
                      )}
                      {props.skeleton && <SidebarChatNameSkeleton />}
                    </SidebarChatName>
                  )}
                </TooltipConsumer>
              </SidebarChatNameTooltip>
            </SidebarChatLeft>
            {!props.skeleton && props.caps && (
              <SidebarChatCaps>{props.caps}</SidebarChatCaps>
            )}
            {!props.skeleton && !props.edit && props.actions}
            {!props.skeleton && props.edit && props.checkbox}
          </SidebarChatStyled>
        </SidebarChatWithBackgroundStyled>
      </SidebarChatWithOutlineStyled>
    );
  }
);

export * from './styled';
