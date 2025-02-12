import React, { MutableRefObject } from 'react';
import * as S from '../styled';
import { Tooltip, TooltipConsumer } from '@/ui/components/tooltip';
import { MessageActionEventHandler } from '../../types';

interface ActionButtonProps {
  id?: string;
  ref?: MutableRefObject<HTMLButtonElement | null>;
  message?: string;
  tooltipLabel?: string | null;
  children?: React.ReactNode;
  onClick?: MessageActionEventHandler;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export const ActionButton = ({
  id,
  ref,
  message,
  tooltipLabel,
  children,
  onClick,
  onMouseEnter,
  onMouseLeave,
  ...props
}: ActionButtonProps) => (
  <S.MessageActionsButton
    ref={ref}
    onClick={() => {
      onClick?.({ id, message });
    }}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    {...props}
  >
    <Tooltip
      label={tooltipLabel}
      placement="top"
      align="center"
    >
      <TooltipConsumer>
        {({ handleTooltipMouseEnter, handleTooltipMouseLeave }) => (
          <S.MessageActionsButtonWithTooltip
            onMouseEnter={handleTooltipMouseEnter}
            onMouseLeave={handleTooltipMouseLeave}
          >
            {children}
          </S.MessageActionsButtonWithTooltip>
        )}
      </TooltipConsumer>
    </Tooltip>
  </S.MessageActionsButton>
);
