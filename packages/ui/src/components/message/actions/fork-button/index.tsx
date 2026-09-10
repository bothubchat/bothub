import React from 'react';

import { IconProvider } from '@/ui/components/icon';
import { Tooltip, TooltipConsumer } from '@/ui/components/tooltip';
import { ForkChatIcon } from '@/ui/icons/fork-chat';

import { MessageActionEventHandler } from '../../types';
import { MessageForkButtonStyled } from './styled';

interface ForkButtonProps {
  id?: string;
  message?: string;
  selected?: boolean;
  tooltipLabel?: string | null;
  iconColor?: string;
  onFork?: MessageActionEventHandler;
}

export const ForkButton = ({
  id,
  message,
  selected,
  tooltipLabel,
  iconColor,
  onFork,
}: ForkButtonProps) => (
  <Tooltip
    label={tooltipLabel}
    placement="top"
    align="center"
  >
    <TooltipConsumer>
      {({ handleTooltipMouseEnter, handleTooltipMouseLeave }) => (
        <MessageForkButtonStyled
          $selected={selected}
          aria-label={tooltipLabel ?? undefined}
          aria-pressed={selected}
          onClick={() => {
            onFork?.({ id, message });
          }}
          onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
            handleTooltipMouseEnter(e);
          }}
          onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
            handleTooltipMouseLeave(e);
          }}
        >
          <IconProvider stroke={iconColor}>
            <ForkChatIcon size={18} />
          </IconProvider>
        </MessageForkButtonStyled>
      )}
    </TooltipConsumer>
  </Tooltip>
);
