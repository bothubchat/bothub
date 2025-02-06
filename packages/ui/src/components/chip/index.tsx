import React from 'react';
import { ChipDeleteButton, ChipStyled, ChipText } from './styled';
import { ChipVariant } from './types';
import { Tooltip, TooltipConsumer } from '@/ui/components/tooltip';

export type ChipDeleteEventHandler = React.MouseEventHandler<HTMLButtonElement>;

export interface ChipProps extends React.ComponentProps<'div'> {
  variant?: ChipVariant;
  start?: React.ReactNode;
  image?: React.ReactNode;
  onDelete?: ChipDeleteEventHandler;
}

export const Chip: React.FC<ChipProps> = ({
  variant = 'default',
  start,
  image,
  children,
  onDelete,
  ...props
}) => (
  <ChipStyled
    $variant={variant}
    {...props}
  >
    {start}
    {image}
    {typeof children === 'string' && (
      <Tooltip
        label={children}
        placement="top-left"
        disabled={children.length <= 36}
      >
        <TooltipConsumer>
          {({ handleTooltipMouseEnter, handleTooltipMouseLeave }) => (
            <ChipText
              onMouseEnter={handleTooltipMouseEnter}
              onMouseLeave={handleTooltipMouseLeave}
            >
              {children.slice(0, 36)}
              {children.length > 36 && '...'}
            </ChipText>
          )}
        </TooltipConsumer>
      </Tooltip>
    )}
    {typeof children !== 'string' && children}
    <ChipDeleteButton onClick={onDelete} />
  </ChipStyled>
);

export * from './types';
export * from './styled';
