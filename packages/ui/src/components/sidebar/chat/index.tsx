import React from 'react';
import {
  SidebarChatColor,
  SidebarChatLeft, 
  SidebarChatName, 
  SidebarChatNameSkeleton, 
  SidebarChatCaps, 
  SidebarChatRight, 
  SidebarChatStyled 
} from './styled';
import { Skeleton } from '@/ui/components/skeleton';
import { useSidebar } from '../context';
import { Tooltip, TooltipConsumer } from '@/ui/components/tooltip';

export interface SidebarChatDefaultProps {
  color: string;
  name: string;
  caps?: string;
  active?: boolean;
  actions?: React.ReactNode;
  skeleton?: false;
}

export interface SidebarChatSkeletonProps {
  skeleton: true;
}

export type SidebarChatProps = (SidebarChatDefaultProps | SidebarChatSkeletonProps) & {
  onClick?: React.MouseEventHandler<HTMLDivElement>;
};

export const SidebarChat: React.FC<SidebarChatProps> = ({
  onClick, ...props
}) => {
  const { isOpen } = useSidebar();

  return (
    <SidebarChatStyled 
      $active={(!props.skeleton && props.active) ?? false}
      $skeleton={!!props.skeleton}
      onClick={onClick} 
    >
      <SidebarChatLeft>
        {!props.skeleton && (
          <Tooltip 
            label={props.name}
            placement="top-left"
            disabled={isOpen}
          >
            <TooltipConsumer>
              {({
                handleTooltipMouseEnter,
                handleTooltipMouseLeave
              }) => (
                <SidebarChatColor 
                  $color={props.color}
                  onMouseEnter={handleTooltipMouseEnter}
                  onMouseLeave={handleTooltipMouseLeave}
                />
              )}
            </TooltipConsumer>
          </Tooltip>
        )}
        {props.skeleton && (
          <SidebarChatColor
            $skeleton
            as={Skeleton}
          />
        )}
        <SidebarChatName
          $open={isOpen}
        >
          {!props.skeleton && props.name}
          {props.skeleton && <SidebarChatNameSkeleton />}
        </SidebarChatName>
        {!props.skeleton && props.actions}
      </SidebarChatLeft>
      <SidebarChatRight>
        {(!props.skeleton && props.caps) && (
          <SidebarChatCaps
            $open={isOpen}
          >
            {props.caps}
          </SidebarChatCaps>
        )}
      </SidebarChatRight>
    </SidebarChatStyled>
  );
};

export * from './styled';
