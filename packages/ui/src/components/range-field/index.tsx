import React from 'react';
import { Tooltip, TooltipConsumer, useTooltip } from '@/ui/components/tooltip';
import {
  RangeFieldErrorText,
  RangeFieldLabel,
  RangeFieldFormattedValue,
  RangeFieldRange,
  RangeFieldRangeThumb,
  RangeFieldSkeleton,
  RangeFieldStyled,
} from './styled';
import { RangeFieldValue } from './types';
import { Skeleton } from '@/ui/components/skeleton';
import { useControllableState } from '@/ui/utils';

export interface RangeFieldProps {
  className?: string;
  label?: string | boolean | React.ReactNode;
  error?: string;
  min?: number;
  max?: number;
  step?: number;
  value?: RangeFieldValue;
  fullWidth?: boolean;
  disabled?: boolean;
  skeleton?: boolean;
  formatValue?: (value: RangeFieldValue) => React.ReactNode;
  onChange?: (value: RangeFieldValue) => unknown;
  onPointerLeave?: React.PointerEventHandler<HTMLDivElement>;
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
  formatValue: preview,
  onPointerLeave,
  ...props
}) => {
  const { handleTooltipMouseEnter, handleTooltipMouseLeave } = useTooltip();

  const [value, setValue] = useControllableState<RangeFieldValue>({
    value:
      typeof initialValue === 'number' || Array.isArray(initialValue)
        ? initialValue
        : undefined,
    defaultValue: [0],
    onChange,
  });

  return (
    <RangeFieldStyled
      $fullWidth={fullWidth}
      $disabled={disabled}
      onPointerLeave={onPointerLeave}
    >
      {label && skeleton && (
        <RangeFieldLabel>
          <Skeleton width={100} />
        </RangeFieldLabel>
      )}
      {typeof label === 'string' && !skeleton && (
        <RangeFieldLabel
          onPointerEnter={handleTooltipMouseEnter}
          onPointerLeave={handleTooltipMouseLeave}
        >
          {label}
        </RangeFieldLabel>
      )}
      {typeof label !== 'string' && !skeleton && label}
      {preview && (
        <RangeFieldFormattedValue>{preview(value)}</RangeFieldFormattedValue>
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
              handleTooltipPointerMove,
            }) => (
              <RangeFieldRange
                {...props}
                min={min}
                max={max}
                step={step}
                value={value}
                $disabled={disabled}
                disabled={disabled}
                classNames={{
                  track: 'custom-track',
                }}
                handleRender={(node, handleProps) => (
                  <RangeFieldRangeThumb
                    {...handleProps}
                    key={node.key}
                    $disabled={disabled}
                    onPointerMove={handleTooltipPointerMove}
                    onPointerEnter={handleTooltipMouseEnter}
                    onPointerLeave={handleTooltipMouseLeave}
                  >
                    {node}
                  </RangeFieldRangeThumb>
                )}
                onChange={setValue}
              />
            )}
          </TooltipConsumer>
        </Tooltip>
      )}
      {skeleton && <RangeFieldSkeleton />}
      {error && <RangeFieldErrorText>{error}</RangeFieldErrorText>}
    </RangeFieldStyled>
  );
};

export * from './types';
export * from './styled';
