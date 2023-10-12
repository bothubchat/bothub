import React from 'react';
import {
  SidebarChatColor,
  SidebarChatLeft, 
  SidebarChatName, 
  SidebarChatNameSkeleton, 
  SidebarChatNumbers, 
  SidebarChatRight, 
  SidebarChatStyled 
} from './styled';
import { Skeleton } from '@/ui/components/skeleton';

export interface SidebarChatDefaultProps {
  color: string;
  name: string;
  numbers?: string;
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
        <SidebarChatColor 
          $color={props.color} 
        />
      )}
      {props.skeleton && (
        <SidebarChatColor
          $skeleton
          as={Skeleton}
        />
      )}
      <SidebarChatName>
        {!props.skeleton && props.name}
        {props.skeleton && <SidebarChatNameSkeleton />}
      </SidebarChatName>
      {!props.skeleton && props.actions}
    </SidebarChatLeft>
    <SidebarChatRight>
      {(!props.skeleton && props.numbers) && (
        <SidebarChatNumbers>
          {props.numbers}
        </SidebarChatNumbers>
      )}
    </SidebarChatRight>
  </SidebarChatStyled>
);

export * from './styled';
