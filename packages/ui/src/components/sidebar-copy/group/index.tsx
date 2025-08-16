import { useCallback, useState } from 'react';
import { useTransition } from '@react-spring/web';
import {
  SidebarArrowDownIcon,
  SidebarGroupBox,
  SidebarGroupButton,
  SidebarGroupList,
  SidebarGroupName,
  SidebarGroupStyled,
} from './styled';
import { useSidebar } from '../context';
import { FolderIcon } from '@/ui/icons/folder';
import { SidebarGroupSkeleton } from './skeleton';
import { Tooltip, TooltipConsumer } from '../../tooltip';

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
  const {
    isOpen: sidebarOpen,
    isEdit,
    setIsOpen: setSidebarOpen,
  } = useSidebar();
  const listTransition = useTransition(open, {
    from: { opacity: 0, scale: 0.8 },
    enter: { opacity: 1, scale: 1 },
    leave: { opacity: 0, scale: 0.8 },
    config: { duration: 100 },
  });

  const handleOpen = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (!open && !sidebarOpen) {
        setOpen(true);
        setSidebarOpen(true);
      } else {
        setOpen(!open);
      }
    },
    [open],
  );

  if (props.skeleton) {
    return <SidebarGroupSkeleton>{children}</SidebarGroupSkeleton>;
  }

  if (!sidebarOpen) {
    return (
      <SidebarGroupStyled>
        <Tooltip
          label={props.name}
          placement="center-right"
          align="center"
        >
          <TooltipConsumer>
            {({ handleTooltipMouseEnter, handleTooltipMouseLeave }) => (
              <SidebarGroupButton
                onMouseEnter={handleTooltipMouseEnter}
                onMouseLeave={handleTooltipMouseLeave}
                onClick={handleOpen}
              >
                <FolderIcon size={18} />
              </SidebarGroupButton>
            )}
          </TooltipConsumer>
        </Tooltip>
        {listTransition(
          (style, item) =>
            item && (
              <SidebarGroupList
                $isSidebarOpen={sidebarOpen}
                style={style}
              >
                {children}
              </SidebarGroupList>
            ),
        )}
      </SidebarGroupStyled>
    );
  }

  return (
    <SidebarGroupStyled id={props.id}>
      <SidebarGroupBox onClick={handleOpen}>
        <FolderIcon />
        <SidebarGroupName>{props.name}</SidebarGroupName>
        <SidebarArrowDownIcon $isOpen={open} />
        {!isEdit && props.actions}
        {isEdit && props.checkbox}
      </SidebarGroupBox>
      {listTransition(
        (style, item) =>
          item && <SidebarGroupList style={style}>{children}</SidebarGroupList>,
      )}
    </SidebarGroupStyled>
  );
};

export { SidebarGroupsList } from './styled';
