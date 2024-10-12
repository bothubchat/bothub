import React from 'react';
import { Variants } from 'framer-motion';
import * as S from '../styled';
import { Tooltip, TooltipConsumer } from '@/ui/components/tooltip';
import { MessageActionEventHandler } from '../../types';

type ActionButtonProps = {
  id?: string;
  message?: string;
  children?: React.ReactNode;
  variantsFramer?: Variants;
  onClick?: MessageActionEventHandler;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  tooltipLabel?: string;
  props?: unknown;
};

export const ActionButton = ({
  id,
  message,
  children,
  variantsFramer,
  onClick,
  onMouseEnter,
  onMouseLeave,
  tooltipLabel,
  ...props
}: ActionButtonProps) => (
  <S.MessageActionsButton
    whileHover="hover"
    whileTap="tap"
    variants={variantsFramer}
    onClick={() => {
      onClick?.({ id, message });
    }}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    {...props}
  >
    <Tooltip label={tooltipLabel} placement="top" align="center">
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
