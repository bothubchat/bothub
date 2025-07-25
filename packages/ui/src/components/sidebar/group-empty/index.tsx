import {
  SidebarEmptyGroupIcon,
  SidebarEmptyGroupStyled,
  SidebarEmptyGroupText,
} from './styled';

interface SidebarGroupEmptyProps {
  children?: React.ReactNode | string;
}
export const SidebarGroupEmpty: React.FC<SidebarGroupEmptyProps> = ({
  children,
}) => (
  <SidebarEmptyGroupStyled>
    <SidebarEmptyGroupIcon />
    {typeof children === 'string' && (
      <SidebarEmptyGroupText>{children}</SidebarEmptyGroupText>
    )}
    {typeof children !== 'string' && children}
  </SidebarEmptyGroupStyled>
);

export * from './styled';
