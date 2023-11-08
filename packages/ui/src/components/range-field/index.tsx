import React, { useCallback, useState } from 'react';
import { Tooltip, TooltipConsumer, useTooltip } from '@/ui/components/tooltip';
import {
  RangeFieldErrorText, 
  RangeFieldLabel, 
  RangeFieldRange, 
  RangeFieldRangeThumb, 
  RangeFieldRangeTrack, 
  RangeFieldSkeleton, 
  RangeFieldStyled 
} from './styled';
import { RangeFieldValue } from './types';
import { Skeleton } from '@/ui/components/skeleton';

export interface RangeFieldProps {
  className?: string;
  label?: string | boolean;
  error?: string;
  min?: number;
  max?: number;
  step?: number;
  value?: RangeFieldValue;
  fullWidth?: boolean;
  disabled?: boolean;
  skeleton?: boolean;
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
  disabled = false,
  skeleton = false,
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
    <RangeFieldStyled 
      $fullWidth={fullWidth}
      $disabled={disabled}  
    >
      {label && (
        <RangeFieldLabel
          onMouseEnter={handleTooltipMouseEnter}
          onMouseLeave={handleTooltipMouseLeave}
        >
          {!skeleton && label}
          {skeleton && (
            <Skeleton width={100} />
          )}
        </RangeFieldLabel>
      )}
      {!skeleton && (
        <Tooltip 
          label={String(value)}
          disabled={disabled}
        >
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
                disabled={disabled}
                renderTrack={(props, state) => (
                  <RangeFieldRangeTrack 
                    {...props} 
                    $index={state.index}
                    $disabled={disabled}
                  />
                )}
                renderThumb={(props) => (
                  <RangeFieldRangeThumb 
                    {...props}
                    $disabled={disabled}
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
      )}
      {skeleton && (
        <RangeFieldSkeleton />
      )}
      {error && (
        <RangeFieldErrorText>
          {error}
        </RangeFieldErrorText>
      )}
    </RangeFieldStyled>
  );
};

export * from './types';
