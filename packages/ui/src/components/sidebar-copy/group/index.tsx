import { useCallback, useState } from 'react';
import { useTransition } from '@react-spring/web';
import {
  SidebarGroupBox,
  SidebarGroupList,
  SidebarGroupName,
  SidebarGroupStyled
} from './styled';
import { useSidebar } from '../context';

export interface SidebarGroupDefaultProps {
  name: string;
  skeleton?: false;
  id: string;
  edit?: boolean;
  actions?: React.ReactNode;
  checkbox?: React.ReactNode;
  over?: boolean;
  open?: boolean;
  color?: string;
  isDefault?: boolean;
  active?: boolean;
  onHandleOpen?: () => void;
}

export interface SidebarGroupSkeletonProps {
  skeleton: true;
  open?: boolean;
  color?: string;
  isDefault?: boolean;
  onHandleOpen?: () => void;
}

export type SidebarGroupProps = (
  | SidebarGroupDefaultProps
  | SidebarGroupSkeletonProps
) &
  React.PropsWithChildren;

export const SidebarGroup: React.FC<SidebarGroupProps> = ({
  children,
  ...props
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const { isOpen: sidebarOpen, isEdit } = useSidebar();
  const listTransition = useTransition(open, {
    from: { opacity: 0, scale: 0.85 },
    enter: { opacity: 1, scale: 1 },
    leave: { opacity: 0, scale: 0.85 },
    config: { duration: 150 }
  });

  const handleOpen = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  if (props.skeleton) {
    return (
      <SidebarGroupStyled>
        <SidebarGroupBox>
          <SidebarGroupName />
        </SidebarGroupBox>
        <SidebarGroupList>{children}</SidebarGroupList>
      </SidebarGroupStyled>
    );
  }

  return (
    <SidebarGroupStyled>
      <SidebarGroupBox onClick={handleOpen}>
        <SidebarGroupName>{props.name}</SidebarGroupName>
        {!isEdit && props.actions}
        {isEdit && props.checkbox}
      </SidebarGroupBox>
      {listTransition(
        (style, item) =>
          item && <SidebarGroupList style={style}>{children}</SidebarGroupList>
      )}
    </SidebarGroupStyled>
  );
};
