import React, { useCallback } from 'react';
import {
  CheckboxCheckedIcon, CheckboxLabel, CheckboxInput, CheckboxStyled, CheckboxBlock 
} from './styled';
import { useTooltip } from '@/ui/components/tooltip';

export type CheckboxValueChangeEventHandler = (checked: boolean) => unknown;

export interface CheckboxProps extends React.ComponentProps<'input'> {
  className?: string;
  label?: string;
  onValueChange?: CheckboxValueChangeEventHandler;
}

export const Checkbox: React.FC<CheckboxProps> = ({ 
  className, label, onValueChange, ...props 
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
      <CheckboxInput 
        {...props} 
        type="checkbox"
        onChange={handleChange}
      />
      <CheckboxBlock>
        <CheckboxCheckedIcon />
      </CheckboxBlock>
      {typeof label === 'string' && (
        <CheckboxLabel>
          {label}
        </CheckboxLabel>
      )}
    </CheckboxStyled>
  );
};
