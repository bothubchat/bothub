import React, { useCallback } from 'react';
import {
  CheckboxCheckedIcon, 
  CheckboxLabel, 
  CheckboxInput, 
  CheckboxStyled, 
  CheckboxBlock, 
  CheckboxBlockSkeleton 
} from './styled';
import { useTooltip } from '@/ui/components/tooltip';
import { Skeleton } from '@/ui/components/skeleton';

export type CheckboxValueChangeEventHandler = (checked: boolean) => unknown;

export interface CheckboxProps extends React.ComponentProps<'input'> {
  className?: string;
  label?: string | boolean | React.ReactNode;
  skeleton?: boolean;
  fullWidth?: boolean;
  onValueChange?: CheckboxValueChangeEventHandler;
}

export const Checkbox: React.FC<CheckboxProps> = ({ 
  className, label, skeleton = false, fullWidth = false, onValueChange, ...props 
}) => {
  const {
    handleTooltipMouseEnter,
    handleTooltipMouseLeave
  } = useTooltip();

  const handleChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>((event) => {
    props.onChange?.(event);
    onValueChange?.(event.target.checked);
  }, [props.onChange, onValueChange]);

  return (
    <CheckboxStyled
      $disabled={props.disabled ?? false}
      $fullWidth={fullWidth}
      className={className}
      onMouseEnter={handleTooltipMouseEnter}
      onMouseLeave={handleTooltipMouseLeave}
    >
      {!skeleton && (
        <>
          <CheckboxInput 
            {...props} 
            type="checkbox"
            onChange={handleChange}
          />
          <CheckboxBlock>
            <CheckboxCheckedIcon />
          </CheckboxBlock>
        </>
      )}
      {skeleton && (
        <CheckboxBlockSkeleton />
      )}
      {(label && skeleton) && (
        <CheckboxLabel>
          <Skeleton width={200} />
        </CheckboxLabel>
      )}
      {(typeof label === 'string' && !skeleton) && (
        <CheckboxLabel>
          {label}
        </CheckboxLabel>
      )}
      {(typeof label !== 'string' && !skeleton) && label}
    </CheckboxStyled>
  );
};

export * from './styled';
