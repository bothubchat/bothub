import { useSidebar } from '../context';
import {
  SidebarChatStyled,
  SidebarChatName,
  SidebarChatIconStyled,
  SidebarChatButton,
} from './styled';
import { IconProvider } from '@/ui/components/icon';
import { SidebarChatSkeleton } from './skeleton';
import { Tooltip, TooltipConsumer } from '../../tooltip';

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

export const SidebarChat: React.FC<SidebarChatProps> = (props) => {
  const { isOpen: sidebarOpen } = useSidebar();

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
        {props.icon || <SidebarChatIconStyled />}
      </IconProvider>
      <SidebarChatName>{props.name}</SidebarChatName>
      {props.actions}
    </SidebarChatStyled>
  );
};
