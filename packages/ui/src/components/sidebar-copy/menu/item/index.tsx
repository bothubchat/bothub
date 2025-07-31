import {
  SidebarMenuListItem,
  SidebarMenuItemIconBox,
  SidebarMenuItemText
} from '../styled';
import { useSidebar } from '../../context';

type SidebarMenuItemProps = {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
};

export const SidebarMenuItem: React.FC<SidebarMenuItemProps> = ({
  icon,
  label,
  active
}) => {
  const { isOpen } = useSidebar();

  return (
    <SidebarMenuListItem>
      <SidebarMenuItemIconBox $active={!!active}>{icon}</SidebarMenuItemIconBox>
      {isOpen && (
        <SidebarMenuItemText $active={!!active}>{label}</SidebarMenuItemText>
      )}
    </SidebarMenuListItem>
  );
};
