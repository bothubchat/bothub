import React, { useCallback, useState } from 'react';
import { 
  SidebarCollapseArrow,
  SidebarCollapseBody,
  SidebarCollapseHead, 
  SidebarCollapseLabel, 
  SidebarCollapseLabelSkeleton, 
  SidebarCollapseStyled 
} from './styled';

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
  const [isOpen, setIsOpen] = useState(true);

  const handleToggle = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  return (
    <SidebarCollapseStyled>
      <SidebarCollapseHead onClick={handleToggle}>
        {!props.skeleton && (
          <SidebarCollapseArrow
            initial={{
              transform: `rotateZ(${isOpen ? 0 : 180}deg)`
            }}
            animate={{
              transform: `rotateZ(${isOpen ? 0 : 180}deg)`
            }}
          />
        )}
        <SidebarCollapseLabel>
          {!props.skeleton && props.label}
          {props.skeleton && (
            <SidebarCollapseLabelSkeleton />
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
