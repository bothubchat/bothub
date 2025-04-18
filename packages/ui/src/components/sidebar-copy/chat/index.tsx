import { SidebarChatStyled, SidebarChatName, SidebarChatIconStyled, SidebarChatIconSkeleton, SidebarChatSkeleton} from './styled';
import { IconProvider } from '@/ui/components/icon';

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

  if (props.skeleton) {
    return(
      <SidebarChatStyled>
        <SidebarChatIconSkeleton />
        <SidebarChatName>
          <SidebarChatSkeleton/>
        </SidebarChatName>
      </SidebarChatStyled>
    )
  }

  return(
    <SidebarChatStyled>
      <IconProvider size={18}>
        {props.icon || <SidebarChatIconStyled/>}
      </IconProvider>
      <SidebarChatName>
        {props.name}
      </SidebarChatName>
      {props.actions}
    </SidebarChatStyled>
  )
};

