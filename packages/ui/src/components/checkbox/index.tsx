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
  label?: string | boolean;
  skeleton?: boolean;
  onValueChange?: CheckboxValueChangeEventHandler;
}

export const Checkbox: React.FC<CheckboxProps> = ({ 
  className, label, skeleton = false, onValueChange, ...props 
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
      {label && (
        <CheckboxLabel>
          {!skeleton && label}
          {skeleton && (
            <Skeleton width={200} />
          )}
        </CheckboxLabel>
      )}
    </CheckboxStyled>
  );
};
