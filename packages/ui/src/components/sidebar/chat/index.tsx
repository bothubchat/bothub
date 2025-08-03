import React, { useEffect, useMemo, useRef, useState } from 'react';
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
  SidebarChatWithBackgroundStyled,
  SidebarChatContent,
  SidebarChatProgress,
  SidebarChatProgressValue,
  SidebarChatProgressIcon,
} from './styled';
import { TooltipConsumer } from '@/ui/components/tooltip';
import { Typography } from '../../typography';
import { LoaderCircularGradientIcon } from '@/ui/icons';

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
  progress?: {
    value?: number;
    max?: number;
    loading?: boolean;
  };
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
      id: !props.skeleton ? props.id : 'draggable-skeleton',
    });
    const ref = useRef<HTMLDivElement>(null);
    const [disableTooltip, setDisableTooltip] = useState(true);

    const draggable =
      !props.skeleton && props.edit
        ? {
            ...listeners,
            ...attributes,
          }
        : {};

    const style =
      !props.skeleton && props.dragging
        ? {
            height: 0,
            opacity: 0,
          }
        : {};

    const progressValue = useMemo(() => {
      if (props.skeleton || !props.progress) return null;

      if (props.progress.loading) {
        return <LoaderCircularGradientIcon size={18} />;
      }

      const percent = Math.floor(
        ((props.progress.value || 0) / (props.progress.max || 1)) * 100,
      );

      if (percent === 100) {
        return <SidebarChatProgressIcon />;
      }

      return <Typography variant="body-s-medium">{`${percent}%`}</Typography>;
    }, [props]);

    useEffect(() => {
      if (ref.current) {
        const { scrollWidth, offsetWidth } = ref.current!;
        setDisableTooltip(scrollWidth <= offsetWidth);
      }
    }, [!props.skeleton && props.name]);

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
            $isProgress={!props.skeleton && !!props.progress}
            $progressDone={
              !props.skeleton &&
              !!props.progress &&
              props.progress.value === props.progress.max
            }
            ref={!props.skeleton && props.edit ? setNodeRef : undefined}
            onClick={
              !props.skeleton
                ? !props.edit
                  ? onClick
                  : onToggleCheckbox
                : undefined
            }
          >
            <SidebarChatContent>
              {!props.skeleton && !props.progress ? (
                props.edit ? (
                  <SidebarChatDragHandle {...draggable} />
                ) : (
                  <SidebarChatIconContainer $isDefault={props.isDefault}>
                    {!props.skeleton && props.icon ? (
                      props.icon
                    ) : (
                      <SidebarChatIconStyled />
                    )}
                  </SidebarChatIconContainer>
                )
              ) : null}
              {!props.skeleton && props.progress && (
                <SidebarChatProgressValue>
                  {progressValue}
                </SidebarChatProgressValue>
              )}
              {!props.skeleton && (
                <SidebarChatTooltip
                  label={props.name}
                  placement="center-right"
                  placementX={15}
                  disabled={!!props.name.length}
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
                  label={!props.skeleton && props?.name}
                  placement="top-left"
                  disabled={disableTooltip}
                >
                  <TooltipConsumer>
                    {({ handleTooltipMouseEnter, handleTooltipMouseLeave }) => (
                      <SidebarChatName
                        ref={ref}
                        onMouseEnter={handleTooltipMouseEnter}
                        onMouseLeave={handleTooltipMouseLeave}
                      >
                        {!props.skeleton ? (
                          props.name
                        ) : (
                          <SidebarChatNameSkeleton />
                        )}
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
            </SidebarChatContent>

            {!props.skeleton && props.progress && (
              <SidebarChatProgress
                {...props.progress}
                value={props.progress.value || 0}
              />
            )}
          </SidebarChatStyled>
        </SidebarChatWithBackgroundStyled>
      </SidebarChatWithOutlineStyled>
    );
  },
);

export * from './styled';
