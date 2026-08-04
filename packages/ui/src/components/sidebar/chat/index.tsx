import { useEffect, useRef, useState } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { useSidebar } from '../context';
import {
  SidebarChatStyled,
  SidebarChatName,
  SidebarChatIconStyled,
  SidebarChatButton,
  SidebarChatDraggbleButton,
  SidebarChatDragHandle,
  SidebarChatBox,
  SidebarChatPromtLine,
  SidebarChatLoadingText,
} from './styled';
import { Tooltip, TooltipConsumer } from '@/ui/components/tooltip';
import { IconProvider } from '@/ui/components/icon';
import { CheckCircleIcon, DragDotIcon } from '@/ui/icons';
import { SidebarChatSkeleton } from './skeleton';

export interface SidebarChatDefaultProps
  extends React.HTMLAttributes<HTMLDivElement | HTMLButtonElement> {
  name: string;
  icon?: React.ReactNode;
  active?: boolean;
  actions?: React.ReactNode;
  id: string;
  checkbox?: React.ReactNode;
  promtQueue?: boolean;
  progress?: {
    max?: number;
    value?: number;
  };
  skeleton?: boolean;
  isDefault?: boolean;
  onToggleCheckbox?: () => unknown;
}

export const SidebarChat: React.FC<SidebarChatDefaultProps> = ({
  id,
  name,
  icon,
  active,
  actions,
  checkbox,
  promtQueue,
  progress,
  skeleton,
  ...props
}) => {
  const { isOpen: sidebarOpen } = useSidebar();
  const { isEdit } = useSidebar();
  const [showTooltip, setShowTooltip] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);
  const { attributes, listeners, setNodeRef } = useDraggable({
    disabled: !isEdit || skeleton,
    id: skeleton ? 'skeleton' : id,
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

  if (skeleton) {
    return <SidebarChatSkeleton />;
  }

  if (!sidebarOpen) {
    return (
      <Tooltip
        label={name}
        placement="center-right"
        align="center"
      >
        <TooltipConsumer>
          {({ handleTooltipMouseEnter, handleTooltipMouseLeave }) => (
            <SidebarChatButton
              {...props}
              onMouseEnter={handleTooltipMouseEnter}
              onMouseLeave={handleTooltipMouseLeave}
            >
              <IconProvider size={18}>
                {icon || <SidebarChatIconStyled />}
              </IconProvider>
            </SidebarChatButton>
          )}
        </TooltipConsumer>
      </Tooltip>
    );
  }

  return (
    <SidebarChatBox
      {...props}
      $active={active}
    >
      <SidebarChatStyled ref={setNodeRef}>
        {isEdit ? (
          <SidebarChatDragHandle
            {...attributes}
            {...listeners}
          >
            <IconProvider size={18}>
              <SidebarChatDraggbleButton>
                <DragDotIcon />
              </SidebarChatDraggbleButton>
            </IconProvider>
            <SidebarChatName ref={ref}>{name}</SidebarChatName>
          </SidebarChatDragHandle>
        ) : (
          <>
            <IconProvider size={18}>
              {promtQueue &&
                typeof progress === 'object' &&
                typeof progress?.max === 'number' &&
                typeof progress?.value === 'number' &&
                progress.max > 0 &&
                progress.value !== progress.max && (
                  <SidebarChatLoadingText>
                    {Math.round((progress.value / progress.max) * 100)}%
                  </SidebarChatLoadingText>
                )}
              {promtQueue &&
                typeof progress === 'object' &&
                typeof progress?.max === 'number' &&
                typeof progress?.value === 'number' &&
                progress.max > 0 &&
                progress.value === progress.max && <CheckCircleIcon />}
              {!promtQueue && (icon || <SidebarChatIconStyled />)}
            </IconProvider>
            <Tooltip
              label={name}
              placement="top"
              align="center"
              disabled={!showTooltip}
            >
              <TooltipConsumer>
                {({ handleTooltipMouseEnter, handleTooltipMouseLeave }) => (
                  <SidebarChatName
                    ref={ref}
                    onPointerEnter={handleTooltipMouseEnter}
                    onPointerLeave={handleTooltipMouseLeave}
                  >
                    {name}
                  </SidebarChatName>
                )}
              </TooltipConsumer>
            </Tooltip>
            {actions}
          </>
        )}
        {isEdit && checkbox}
      </SidebarChatStyled>
      {promtQueue &&
        typeof progress === 'object' &&
        typeof progress?.max === 'number' &&
        typeof progress?.value === 'number' && (
          <SidebarChatPromtLine
            percent={Math.round((progress.value / progress.max) * 100)}
          />
        )}
    </SidebarChatBox>
  );
};
