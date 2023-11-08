import React, { useCallback, useState } from 'react';
import { 
  SidebarCollapseArrow,
  SidebarCollapseBody,
  SidebarCollapseHead, 
  SidebarCollapseLabel, 
  SidebarCollapseLabelSkeleton, 
  SidebarCollapseStyled 
} from './styled';
import { useSidebar } from '../context';
import { Tooltip, TooltipConsumer } from '@/ui/components/tooltip';

export interface SidebarCollapseDefaultProps extends React.PropsWithChildren {
  label: string;
  skeleton?: false;
}

export interface SidebarCollapseSkeletonProps extends React.PropsWithChildren {
  skeleton: true;
}

export type SidebarCollapseProps = SidebarCollapseDefaultProps | SidebarCollapseSkeletonProps;

export const SidebarCollapse: React.FC<SidebarCollapseProps> = ({ 
  children, ...props 
}) => {
  const { isOpen: isSidebarOpen } = useSidebar();
  const [isOpen, setIsOpen] = useState(true);

  const handleToggle = useCallback(() => {
    if (props.skeleton) {
      return;
    }

    setIsOpen(!isOpen);
  }, [isOpen, props.skeleton]);

  return (
    <SidebarCollapseStyled>
      <SidebarCollapseHead onClick={handleToggle}>
        {!props.skeleton && (
          <Tooltip
            label={props.label}
            placement="top-left"
            disabled={isSidebarOpen}
          >
            <TooltipConsumer>
              {({
                handleTooltipMouseEnter,
                handleTooltipMouseLeave
              }) => (
                <SidebarCollapseArrow
                  initial={{
                    transform: `rotateZ(${isOpen ? 0 : 180}deg)`
                  }}
                  animate={{
                    transform: `rotateZ(${isOpen ? 0 : 180}deg)`
                  }}
                  onMouseEnter={handleTooltipMouseEnter}
                  onMouseLeave={handleTooltipMouseLeave}
                />
              )}
            </TooltipConsumer>
          </Tooltip>
        )}
        <SidebarCollapseLabel
          style={{
            opacity: isSidebarOpen || props.skeleton ? 1 : 0
          }}
        >
          {!props.skeleton && props.label}
          {props.skeleton && (
            <SidebarCollapseLabelSkeleton 
              $open={isSidebarOpen}
            />
          )}
        </SidebarCollapseLabel>
      </SidebarCollapseHead>
      {isOpen && (
        <SidebarCollapseBody>
          {children}
        </SidebarCollapseBody>
      )}
    </SidebarCollapseStyled>
  );
};
