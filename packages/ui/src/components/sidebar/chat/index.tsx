import { useSidebar } from '../context';
import {
  SidebarChatStyled,
  SidebarChatName,
  SidebarChatIconStyled,
  SidebarChatButton,
} from './styled';
import { Tooltip, TooltipConsumer } from '@/ui/components/tooltip';
import { IconProvider } from '@/ui/components/icon';
import { DragDotIcon } from '@/ui/icons';
import { SidebarChatSkeleton } from './skeleton';

export interface SidebarChatDefaultProps {
  name: string;
  icon?: React.ReactNode;
  active?: boolean;
  actions?: React.ReactNode;
  skeleton?: false;
  id: string;
  checkbox?: React.ReactNode;
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

export const SidebarChat: React.FC<SidebarChatProps> = (props) => {
  const { isOpen: sidebarOpen } = useSidebar();
  const { isEdit } = useSidebar();
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
    <SidebarChatStyled>
      <IconProvider size={18}>
        {!isEdit ? props.icon || <SidebarChatIconStyled /> : <DragDotIcon />}
      </IconProvider>
      <SidebarChatName>{props.name}</SidebarChatName>
      {!isEdit && props.actions}
      {isEdit && props.checkbox}
    </SidebarChatStyled>
  );
};
