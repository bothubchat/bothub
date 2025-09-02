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
import {
  FolderIcon,
  LoaderCircularGradientIcon,
  DragDotIcon,
} from '@/ui/icons';
import { SidebarGroupSkeleton } from './skeleton';
import { Tooltip, TooltipConsumer } from '@/ui/components/tooltip';

export interface SidebarGroupDefaultProps {
  name: string;
  skeleton?: false;
  loading?: boolean;
  color?: string;
  id: string;
  edit?: boolean;
  actions?: React.ReactNode;
  checkbox?: React.ReactNode;
  open?: boolean;
  active?: boolean;
  onHandleOpen?: () => void;
}

export interface SidebarGroupSkeletonProps {
  skeleton: true;
  open?: boolean;
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
        {isEdit ? (
          <DragDotIcon size={18} />
        ) : props.loading ? (
          <LoaderCircularGradientIcon size={18} />
        ) : (
          <FolderIcon
            size={18}
            {...(props.color && { fill: props.color })}
          />
        )}
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
