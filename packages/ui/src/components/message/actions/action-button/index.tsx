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
  <Tooltip
    label={tooltipLabel}
    placement="top"
    align="center"
  >
    <TooltipConsumer>
      {({ handleTooltipMouseEnter, handleTooltipMouseLeave }) => (
        <S.MessageActionsButton
          ref={ref}
          onClick={() => {
            onClick?.({ id, message });
          }}
          onMouseEnter={(e) => {
            handleTooltipMouseEnter(e);
            onMouseEnter?.();
          }}
          onMouseLeave={(e) => {
            handleTooltipMouseLeave(e);
            onMouseLeave?.();
          }}
          {...props}
        >
          {children}
        </S.MessageActionsButton>
      )}
    </TooltipConsumer>
  </Tooltip>
);
