import { useEffect, useRef, useState } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { useSidebar } from '../context';
import {
  SidebarChatStyled,
  SidebarChatName,
  SidebarChatIconStyled,
  SidebarChatButton,
  SidebarChatDraggbleButton,
  SidebarChatBox,
  SidebarChatPromtLine,
  SidebarChatLoadingText,
} from './styled';
import { Tooltip, TooltipConsumer } from '@/ui/components/tooltip';
import { IconProvider } from '@/ui/components/icon';
import { CheckCircleIcon, DragDotIcon } from '@/ui/icons';
import { SidebarChatSkeleton } from './skeleton';

export interface SidebarChatDefaultProps {
  name: string;
  icon?: React.ReactNode;
  active?: boolean;
  actions?: React.ReactNode;
  skeleton?: false;
  id: string;
  checkbox?: React.ReactNode;
  promtQueue?: boolean;
  progress?: {
    max?: number;
    value?: number;
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
  onClick?: () => unknown;
  onToggleCheckbox?: () => unknown;
};

export const SidebarChat: React.FC<SidebarChatProps> = (props) => {
  const { isOpen: sidebarOpen } = useSidebar();
  const { isEdit } = useSidebar();
  const [showTooltip, setShowTooltip] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);
  const { attributes, listeners, setNodeRef } = useDraggable({
    disabled: !isEdit || props.skeleton,
    id: props.skeleton ? 'skeleton' : props.id,
    data: {
      type: 'chat',
    },
  });
  useEffect(() => {
    const observer = new ResizeObserver(() => {
      if (ref.current && ref.current.scrollWidth > ref.current.clientWidth) {
        setShowTooltip(true);
      } else {
        setShowTooltip(false);
      }
    });

    if (ref.current && ref.current.scrollWidth > ref.current.clientWidth) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  const handleClick = () => {
    if (props.onClick) {
      props.onClick();
    }
  };

  if (props.skeleton) {
    return <SidebarChatSkeleton />;
  }

  if (!sidebarOpen) {
    return (
      <Tooltip
        label={props.name}
        placement="center-right"
        align="center"
      >
        <TooltipConsumer>
          {({ handleTooltipMouseEnter, handleTooltipMouseLeave }) => (
            <SidebarChatButton
              onClick={handleClick}
              onMouseEnter={handleTooltipMouseEnter}
              onMouseLeave={handleTooltipMouseLeave}
            >
              <IconProvider size={18}>
                {props.icon || <SidebarChatIconStyled />}
              </IconProvider>
            </SidebarChatButton>
          )}
        </TooltipConsumer>
      </Tooltip>
    );
  }

  return (
    <SidebarChatBox $active={props.active}>
      <SidebarChatStyled ref={setNodeRef}>
        <IconProvider size={18}>
          {props.promtQueue &&
            typeof props.progress === 'object' &&
            typeof props.progress?.max === 'number' &&
            typeof props.progress?.value === 'number' &&
            props.progress.max > 0 &&
            props.progress.value !== props.progress.max && (
              <SidebarChatLoadingText>
                {Math.round((props.progress.value / props.progress.max) * 100)}%
              </SidebarChatLoadingText>
            )}
          {props.promtQueue &&
            typeof props.progress === 'object' &&
            typeof props.progress?.max === 'number' &&
            typeof props.progress?.value === 'number' &&
            props.progress.max > 0 &&
            props.progress.value === props.progress.max && <CheckCircleIcon />}
          {!isEdit ? (
            !props.promtQueue && (props.icon || <SidebarChatIconStyled />)
          ) : (
            <SidebarChatDraggbleButton
              {...attributes}
              {...listeners}
            >
              <DragDotIcon />
            </SidebarChatDraggbleButton>
          )}
        </IconProvider>
        <Tooltip
          label={props.name}
          placement="top"
          align="center"
          disabled={isEdit || !showTooltip}
        >
          <TooltipConsumer>
            {({ handleTooltipMouseEnter, handleTooltipMouseLeave }) => (
              <SidebarChatName
                ref={ref}
                onClick={handleClick}
                onPointerEnter={handleTooltipMouseEnter}
                onPointerLeave={handleTooltipMouseLeave}
              >
                {props.name}
              </SidebarChatName>
            )}
          </TooltipConsumer>
        </Tooltip>
        {!isEdit && props.actions}
        {isEdit && props.checkbox}
      </SidebarChatStyled>
      {props.promtQueue &&
        typeof props.progress === 'object' &&
        typeof props.progress?.max === 'number' &&
        typeof props.progress?.value === 'number' && (
          <SidebarChatPromtLine
            percent={Math.round(
              (props.progress.value / props.progress.max) * 100,
            )}
          />
        )}
    </SidebarChatBox>
  );
};
