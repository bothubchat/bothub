import { IconProvider } from '@/ui/components/icon';
import { SidebarDropdownItemStyled, SidebarDropdownItemText } from '../styled';
import { useTheme } from '@/ui/theme';

type SidebarDropdownItemProps = {
  icon?: React.ReactNode;
} & React.HTMLAttributes<HTMLButtonElement>;

export const SidebarDropdownItem: React.FC<SidebarDropdownItemProps> = ({
  icon,
  ...props
}) => {
  const theme = useTheme();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <SidebarDropdownItemStyled
      onClick={handleClick}
      {...props}
    >
      <IconProvider fill={theme.colors.grayScale.gray1}>{icon}</IconProvider>
      <SidebarDropdownItemText>{props.children}</SidebarDropdownItemText>
    </SidebarDropdownItemStyled>
  );
};
