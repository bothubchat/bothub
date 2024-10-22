import React from 'react';
import {
  SidebarChatColor,
  SidebarChatLeft, 
  SidebarChatName, 
  SidebarChatNameSkeleton, 
  SidebarChatCaps, 
  SidebarChatRight, 
  SidebarChatStyled, 
  SidebarChatTooltip,
  SidebarChatNameTooltip
} from './styled';
import { Skeleton } from '@/ui/components/skeleton';
import { TooltipConsumer } from '@/ui/components/tooltip';

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
}) => (
  <SidebarChatStyled 
    $active={(!props.skeleton && props.active) ?? false}
    $skeleton={!!props.skeleton}
    onClick={onClick} 
  >
    <SidebarChatLeft>
      {!props.skeleton && (
        <SidebarChatTooltip 
          label={props.name}
          placement="top-left"
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
        </SidebarChatTooltip>
      )}
      {props.skeleton && (
        <SidebarChatColor
          $skeleton
          as={Skeleton}
        />
      )}
      <SidebarChatNameTooltip
        {...(!props.skeleton && {
          label: props.name
        })}
        placement="top-left"
        disabled={props.skeleton || props.name.length <= 16}
      >
        <TooltipConsumer>
          {({
            handleTooltipMouseEnter,
            handleTooltipMouseLeave
          }) => (
            <SidebarChatName
              onMouseEnter={handleTooltipMouseEnter}
              onMouseLeave={handleTooltipMouseLeave}
            >
              {!props.skeleton && (
                <>
                  {props.name.slice(0, 16)}
                  {props.name.length > 16 && '...'}
                </>
              )}
              {props.skeleton && <SidebarChatNameSkeleton />}
            </SidebarChatName>
          )}
        </TooltipConsumer>
      </SidebarChatNameTooltip>
      {!props.skeleton && props.actions}
    </SidebarChatLeft>
    <SidebarChatRight>
      {(!props.skeleton && props.caps) && (
        <SidebarChatCaps>
          {props.caps}
        </SidebarChatCaps>
      )}
    </SidebarChatRight>
  </SidebarChatStyled>
);

export * from './styled';
