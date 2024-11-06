import { DeleteChatIcon } from '@/ui/icons/delete-chat';
import { SidebarEmptyGroupIcon, SidebarEmptyGroupStyled, SidebarEmptyGroupText } from './styled';
import { useTheme } from '@/ui/theme';

interface SidebarGroupEmptyProps {
  children?: React.ReactNode | string;
}
export const SidebarGroupEmpty: React.FC<SidebarGroupEmptyProps> = ({ children }) => {
  return (
    <SidebarEmptyGroupStyled>
      <SidebarEmptyGroupIcon />
      {typeof children === 'string' && (
        <SidebarEmptyGroupText>
          {children}
        </SidebarEmptyGroupText>
      )}
      {typeof children !== 'string' && children}
    </SidebarEmptyGroupStyled>
  );
};

export * from './styled';