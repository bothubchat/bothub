import { Button } from '@/ui/components/button';
import { useSidebar } from '../context';
import {
  SidebarChatStyled,
  SidebarChatName,
  SidebarChatIconStyled
} from './styled';
import { IconProvider } from '@/ui/components/icon';
import { SidebarChatSkeleton } from './skeleton';

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
      <Button variant="secondary">
        {props.icon || <SidebarChatIconStyled />}
      </Button>
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
