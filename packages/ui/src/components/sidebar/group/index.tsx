import React from 'react';
import {
  SidebarChatList, SidebarGroupStyled, SidebarGroupName, SidebarGroupTooltip, 
  SidebarGroupSkeleton
} from './styled';
import { TooltipConsumer } from '@/ui/components/tooltip';

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
}) => (
  <SidebarGroupStyled>
    <SidebarGroupTooltip
      label={props.skeleton ? '' : props.name}
      placement="top-left"
      disabled={!props.skeleton && props.name.length <= 5}
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
              <SidebarGroupSkeleton />
            )}
          </SidebarGroupName>
        )}
      </TooltipConsumer>
    </SidebarGroupTooltip>
    <SidebarChatList>
      {children}
    </SidebarChatList>
  </SidebarGroupStyled>
);

export * from './styled';
