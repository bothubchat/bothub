import React from 'react';
import { Variants } from 'framer-motion';
import * as S from '../styled';
import { Tooltip, TooltipConsumer } from '@/ui/components/tooltip';

type ActionButtonProps = {
  children?: React.ReactNode;
  variantsFramer?: Variants;
  onClick?: () => void;
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
  onMouseLeave?: () => void;
  tooltipLabel?: string;
  props?: unknown;
};

export const ActionButton = ({
  children,
  variantsFramer,
  onClick,
  onHoverStart,
  onHoverEnd,
  onMouseLeave,
  tooltipLabel,
  ...props
}: ActionButtonProps) => (
  <S.MessageActionsButton
    whileHover="hover"
    whileTap="tap"
    variants={variantsFramer}
    onClick={onClick}
    onHoverStart={onHoverStart}
    onHoverEnd={onHoverEnd}
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
