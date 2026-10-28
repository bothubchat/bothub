import { useDraggable } from '@dnd-kit/core';
import { useSidebarEdit } from '../context';
import { isInCollapsedSidebar } from '../collapsed';
import {
  SidebarChatStyled,
  SidebarChatName,
  SidebarChatIconStyled,
  SidebarChatDraggbleButton,
  SidebarChatDragHandle,
  SidebarChatBox,
  SidebarChatPromtLine,
  SidebarChatLoadingText,
  SidebarChatOpenOnly,
  SidebarChatCollapsedOnly,
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
  dragAriaLabel?: string;
  progressAriaLabel?: string;
}

type ProgressStyle = React.CSSProperties & {
  '--sidebar-chat-progress': string;
};

const isTruncated = (element: Element) =>
  element.scrollWidth > element.clientWidth;

/**
 * A chat in the sidebar. It doesn't read whether the sidebar is collapsed:
 * the collapsed look comes from CSS, so collapsing neither remounts nor
 * re-renders the rows.
 */
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
  dragAriaLabel,
  progressAriaLabel,
  onMouseEnter,
  onMouseLeave,
  ...props
}) => {
  const { isEdit } = useSidebarEdit();
  const { attributes, listeners, setNodeRef } = useDraggable({
    disabled: !isEdit || skeleton,
    id: skeleton ? 'skeleton' : id,
    data: {
      type: 'chat',
    },
  });

  if (skeleton) {
    return <SidebarChatSkeleton />;
  }

  const chatIcon = icon || <SidebarChatIconStyled />;
  const hasProgress =
    !!promtQueue &&
    typeof progress?.max === 'number' &&
    typeof progress?.value === 'number';
  const progressMax = hasProgress ? (progress?.max ?? 0) : 0;
  const progressValue = hasProgress ? (progress?.value ?? 0) : 0;
  const percent =
    progressMax > 0 ? Math.round((progressValue / progressMax) * 100) : 0;
  const isProgressDone = progressMax > 0 && progressValue === progressMax;

  return (
    <Tooltip
      label={name}
      placement="center-right"
      align="center"
    >
      <TooltipConsumer>
        {(rowTooltip) => (
          <SidebarChatBox
            {...props}
            $active={active}
            aria-current={active ? 'page' : undefined}
            onMouseEnter={(event) => {
              onMouseEnter?.(event);
              // The icon of a collapsed row needs the name next to it
              if (isInCollapsedSidebar(event.currentTarget)) {
                rowTooltip.handleTooltipMouseEnter(event);
              }
            }}
            onMouseLeave={(event) => {
              onMouseLeave?.(event);
              rowTooltip.handleTooltipMouseLeave(event);
            }}
          >
            <SidebarChatStyled ref={setNodeRef}>
              {isEdit ? (
                <SidebarChatDragHandle
                  {...attributes}
                  {...listeners}
                  aria-label={dragAriaLabel}
                >
                  <IconProvider size={18}>
                    <SidebarChatDraggbleButton>
                      <DragDotIcon />
                    </SidebarChatDraggbleButton>
                    <SidebarChatCollapsedOnly>
                      {chatIcon}
                    </SidebarChatCollapsedOnly>
                  </IconProvider>
                  <SidebarChatName>{name}</SidebarChatName>
                </SidebarChatDragHandle>
              ) : (
                <>
                  <IconProvider size={18}>
                    {promtQueue ? (
                      <>
                        <SidebarChatOpenOnly>
                          {progressMax > 0 && !isProgressDone && (
                            <SidebarChatLoadingText>
                              {percent}%
                            </SidebarChatLoadingText>
                          )}
                          {isProgressDone && <CheckCircleIcon />}
                        </SidebarChatOpenOnly>
                        <SidebarChatCollapsedOnly>
                          {chatIcon}
                        </SidebarChatCollapsedOnly>
                      </>
                    ) : (
                      chatIcon
                    )}
                  </IconProvider>
                  <Tooltip
                    label={name}
                    placement="top"
                    align="center"
                  >
                    <TooltipConsumer>
                      {(nameTooltip) => (
                        <SidebarChatName
                          onPointerEnter={(event) => {
                            // Only a cut off name needs a tooltip
                            if (
                              isTruncated(event.currentTarget) &&
                              !isInCollapsedSidebar(event.currentTarget)
                            ) {
                              nameTooltip.handleTooltipMouseEnter(event);
                            }
                          }}
                          onPointerLeave={nameTooltip.handleTooltipMouseLeave}
                        >
                          {name}
                        </SidebarChatName>
                      )}
                    </TooltipConsumer>
                  </Tooltip>
                  <SidebarChatOpenOnly>{actions}</SidebarChatOpenOnly>
                </>
              )}
              {isEdit && <SidebarChatOpenOnly>{checkbox}</SidebarChatOpenOnly>}
            </SidebarChatStyled>
            {hasProgress && (
              <SidebarChatPromtLine
                style={
                  {
                    '--sidebar-chat-progress': `${percent}%`,
                  } as ProgressStyle
                }
                aria-label={progressAriaLabel}
              />
            )}
          </SidebarChatBox>
        )}
      </TooltipConsumer>
    </Tooltip>
  );
};
