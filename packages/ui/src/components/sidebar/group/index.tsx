import React from 'react';
import { SidebarChatList, SidebarGroupStyled, SidebarGroupName } from './styled';
import { Skeleton } from '@/ui/components/skeleton';
import { Tooltip, TooltipConsumer } from '@/ui/components/tooltip';
import { useSidebar } from '../context';

export interface SidebarGroupDefaultProps {
  name: string;
  skeleton?: false;
}

export interface SidebarGroupSkeletonProps {
  skeleton: true;
}

export type SidebarGroupProps 
  = (SidebarGroupDefaultProps | SidebarGroupSkeletonProps) & React.PropsWithChildren;

export const SidebarGroup: React.FC<SidebarGroupProps> = ({
  children, ...props
}) => {
  const { isOpen } = useSidebar();

  return (
    <SidebarGroupStyled>
      <Tooltip
        label={props.skeleton ? '' : props.name}
        placement="top-left"
        disabled={isOpen}
      >
        <TooltipConsumer>
          {({
            handleTooltipMouseEnter,
            handleTooltipMouseLeave
          }) => (
            <SidebarGroupName
              onMouseEnter={handleTooltipMouseEnter}
              onMouseLeave={handleTooltipMouseLeave}
            >
              {!props.skeleton && props.name}
              {props.skeleton && (
                <Skeleton width={isOpen ? 120 : 30} />
              )}
            </SidebarGroupName>
          )}
        </TooltipConsumer>
      </Tooltip>
      <SidebarChatList>
        {children}
      </SidebarChatList>
    </SidebarGroupStyled>
  );
};

export * from './styled';
