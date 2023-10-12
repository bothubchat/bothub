import React, { useCallback, useState } from 'react';
import { Tooltip, TooltipConsumer, useTooltip } from '@/ui/components/tooltip';
import {
  RangeFieldErrorText, 
  RangeFieldLabel, 
  RangeFieldRange, 
  RangeFieldRangeThumb, 
  RangeFieldRangeTrack, 
  RangeFieldStyled 
} from './styled';
import { RangeFieldValue } from './types';

export interface RangeFieldProps {
  className?: string;
  label?: string;
  error?: string;
  min?: number;
  max?: number;
  step?: number;
  value?: RangeFieldValue;
  fullWidth?: boolean;
  onChange?: (value: RangeFieldValue) => unknown;
}

export const RangeField: React.FC<RangeFieldProps> = ({
  label,
  error, 
  min, 
  max, 
  step, 
  value: initialValue, 
  fullWidth = false, 
  onChange, 
  ...props 
}) => {
  const {
    handleTooltipMouseEnter,
    handleTooltipMouseLeave
  } = useTooltip();

  const [value, setValue] = typeof initialValue === 'number' || Array.isArray(initialValue) ? (
    [initialValue, onChange] 
  ) : useState<RangeFieldValue>([0]);

  const handleChange = useCallback((value: RangeFieldValue) => {
    setValue?.(value);
  }, [setValue]);

  return (
    <RangeFieldStyled $fullWidth={fullWidth}>
      {label && (
        <RangeFieldLabel
          onMouseEnter={handleTooltipMouseEnter}
          onMouseLeave={handleTooltipMouseLeave}
        >
          {label}
        </RangeFieldLabel>
      )}
      <Tooltip label={String(value)}>
        <TooltipConsumer>
          {({ 
            handleTooltipMouseEnter, 
            handleTooltipMouseLeave,
            handleTooltipMouseDown,
            handleTooltipMouseUp
          }) => (
            <RangeFieldRange 
              {...props}
              min={min}
              max={max}
              step={step}
              value={value}
              renderTrack={(props, state) => (
                <RangeFieldRangeTrack 
                  {...props} 
                  $index={state.index}
                />
              )}
              renderThumb={(props) => (
                <RangeFieldRangeThumb 
                  {...props}
                  onMouseEnter={handleTooltipMouseEnter}
                  onMouseLeave={handleTooltipMouseLeave}
                  onMouseDown={handleTooltipMouseDown}
                  onMouseUp={handleTooltipMouseUp}
                />
              )}
              onChange={handleChange}
            />
          )}
        </TooltipConsumer>
      </Tooltip>
      {error && (
        <RangeFieldErrorText>
          {error}
        </RangeFieldErrorText>
      )}
    </RangeFieldStyled>
  );
};

export * from './types';
