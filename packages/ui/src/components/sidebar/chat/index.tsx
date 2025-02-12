import React, { useMemo } from 'react';
import { useSortable } from '@dnd-kit/sortable';
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
  SidebarChatIconContainer
} from './styled';
import { TooltipConsumer } from '@/ui/components/tooltip';

export interface SidebarChatDefaultProps {
  color: string;
  name: string;
  caps?: string;
  active?: boolean;
  actions?: React.ReactNode;
  skeleton?: false;
  id: string;
  edit?: boolean;
  checkbox?: React.ReactNode;
}

export interface SidebarChatDragAndDropProps {
  dragging?: boolean;
  countDragging?: number;
  isDndOverflow?: boolean;
  draggingHidden?: boolean;
  parentId?: string;
  index?: number;
}

export interface SidebarChatSkeletonProps {
  skeleton: true;
}

export type SidebarChatProps = (
  | (SidebarChatDefaultProps & SidebarChatDragAndDropProps)
  | SidebarChatSkeletonProps
) & {
  onClick?: React.MouseEventHandler<HTMLDivElement | HTMLOrSVGElement>;
  onToggleCheckbox?: () => unknown;
  isDefault?: boolean;
  id?: string;
};

export const SidebarChat: React.FC<SidebarChatProps> = ({
  onClick,
  onToggleCheckbox,
  ...props
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: !props.skeleton ? props.id : 'draggable-skeleton',
      data: {
        type: 'chat',
        parent: (!props.skeleton && props?.parentId) || '',
        index: (!props.skeleton && props?.index) || 0
      }
    });

  const draggable =
    !props.skeleton && props.edit
      ? {
          ...listeners,
          ...attributes
        }
      : {};

  const dragStyle = {
    transform: transform
      ? `translate3d(${transform?.x}px, ${transform?.y}px, 0)`
      : undefined,
    transition
  };

  const style =
    !props.skeleton && props.edit && props.dragging
      ? {
          height:
            props?.countDragging !== undefined
              ? props.countDragging * 36
              : undefined,
          opacity: 0
        }
      : {};

  const styleDraggingHidden =
    !props.skeleton && props.edit && props.draggingHidden
      ? {
          display: 'none'
        }
      : {};

  const chatStyle = useMemo(
    () => ({
      ...style,
      ...dragStyle,
      ...styleDraggingHidden
    }),
    [style, dragStyle, styleDraggingHidden]
  );

  return (
    <SidebarChatStyled
      style={chatStyle}
      id={props.id}
      $draggble={(!props.skeleton && props.isDndOverflow) || false}
      $active={(!props.skeleton && props.active) ?? false}
      $skeleton={!!props.skeleton}
      ref={!props.skeleton && props.edit ? setNodeRef : undefined}
      onClick={
        !props.skeleton ? (!props.edit ? onClick : onToggleCheckbox) : undefined
      }
    >
      {!props.skeleton && props.edit ? (
        <SidebarChatDragHandle {...draggable} />
      ) : (
        <SidebarChatIconContainer $isDefault={props.isDefault}>
          <SidebarChatIconStyled />
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
                onClick={onClick}
                onMouseEnter={handleTooltipMouseEnter}
                onMouseLeave={handleTooltipMouseLeave}
              />
            )}
          </TooltipConsumer>
        </SidebarChatTooltip>
      )}
      {props.skeleton && <SidebarChatIconStyled />}
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
                    {props.name.slice(0, 24)}
                    {props.name.length > 24 && '...'}
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
  );
};

export * from './styled';
