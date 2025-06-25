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

export interface CheckboxProps
  extends Omit<React.ComponentProps<'input'>, 'onPointerLeave'> {
  className?: string;
  label?: string | boolean | React.ReactNode;
  rowReverse?: boolean;
  skeleton?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  checkedColor?: string;
  onValueChange?: CheckboxValueChangeEventHandler;
  onPointerLeave?: React.PointerEventHandler<HTMLLabelElement>;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  className,
  label,
  skeleton = false,
  rowReverse,
  fullWidth = false,
  icon,
  checkedColor,
  onValueChange,
  onPointerLeave,
  ...props
}) => {
  const { handleTooltipMouseEnter, handleTooltipMouseLeave } = useTooltip();

  const handleChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      props.onChange?.(event);
      onValueChange?.(event.target.checked);
    },
    [props.onChange, onValueChange]
  );

  return (
    <CheckboxStyled
      $disabled={props.disabled ?? false}
      $fullWidth={fullWidth}
      $rowReverse={rowReverse}
      className={className}
      onMouseEnter={handleTooltipMouseEnter}
      onMouseLeave={handleTooltipMouseLeave}
      onPointerLeave={onPointerLeave}
    >
      {!skeleton && (
        <>
          <CheckboxInput
            {...props}
            $checkedColor={checkedColor}
            type="checkbox"
            onChange={handleChange}
          />
          <CheckboxBlock $checkedColor={checkedColor}>
            {icon || <CheckboxCheckedIcon />}
          </CheckboxBlock>
        </>
      )}
      {skeleton && <CheckboxBlockSkeleton />}
      {label && skeleton && (
        <CheckboxLabel>
          <Skeleton width={200} />
        </CheckboxLabel>
      )}
      {typeof label === 'string' && !skeleton && (
        <CheckboxLabel>{label}</CheckboxLabel>
      )}
      {typeof label !== 'string' && !skeleton && label}
    </CheckboxStyled>
  );
};

export * from './styled';
