import { DeleteChatIcon } from '@/ui/icons/delete-chat';
import { SidebarEmptyGroupStyled, SidebarEmptyGroupText } from './styled';
import { useTheme } from '@/ui/theme';

interface SidebarGroupEmptyProps {
  children?: React.ReactNode | string;
}
export const SidebarGroupEmpty: React.FC<SidebarGroupEmptyProps> = ({ children }) => {
  const theme = useTheme();
  return (
    <SidebarEmptyGroupStyled>
      <DeleteChatIcon fill={theme.colors.grayScale.gray6} />
      {typeof children === 'string' && (
        <SidebarEmptyGroupText>
          {children}
        </SidebarEmptyGroupText>
      )}
      {typeof children !== 'string' && children}
    </SidebarEmptyGroupStyled>
  );
};
