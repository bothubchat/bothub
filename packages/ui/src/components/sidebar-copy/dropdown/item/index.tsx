import { SidebarDropdownItemStyled, SidebarDropdownItemText } from "../styled"

type SidebarDropdownItemProps = {
  icon?: React.ReactNode;
} & React.HTMLAttributes<HTMLButtonElement>

export const SidebarDropdownItem: React.FC<SidebarDropdownItemProps> = ({ icon, ...props }) => {
  return (
    <SidebarDropdownItemStyled {...props}>
      {icon}
      <SidebarDropdownItemText>{props.children}</SidebarDropdownItemText>
    </SidebarDropdownItemStyled>
  )
}