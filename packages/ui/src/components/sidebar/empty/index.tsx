import React from 'react';
import { SidebarEmptyIcon, SidebarEmptyStyled, SidebarEmptyText } from './styled';
import { useSidebar } from '../context';
import { Tooltip, TooltipConsumer } from '@/ui/components/tooltip';
import { DeleteChatIcon } from '@/ui/icons';

export type SidebarEmptyProps = React.ComponentProps<'div'>;

export const SidebarEmpty: React.FC<SidebarEmptyProps> = ({
  children, ...props
}) => {
  const { isOpen } = useSidebar();

  return (
    <SidebarEmptyStyled
      {...props}
    >
      <Tooltip
        label={children}
        placement="top-left"
        disabled={isOpen}
      >
        <TooltipConsumer>
          {({
            handleTooltipMouseEnter,
            handleTooltipMouseLeave
          }) => (
            <SidebarEmptyIcon
              onMouseEnter={handleTooltipMouseEnter}
              onMouseLeave={handleTooltipMouseLeave}
            />
          )}
        </TooltipConsumer>
      </Tooltip>
      {typeof children === 'string' && (
        <SidebarEmptyText
          $open={isOpen}
        >
          {children}
        </SidebarEmptyText>
      )}
      {typeof children !== 'string' && children}
    </SidebarEmptyStyled>
  );
};