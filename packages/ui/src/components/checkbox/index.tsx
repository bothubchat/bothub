import React, { useCallback } from 'react';
import {
  CheckboxCheckedIcon,
  CheckboxLabel,
  CheckboxInput,
  CheckboxStyled,
  CheckboxBlock,
  CheckboxBlockSkeleton,
  CheckboxHalfCheckedSquare
} from './styled';
import { useTooltip } from '@/ui/components/tooltip';
import { Skeleton } from '@/ui/components/skeleton';

export type CheckboxValueChangeEventHandler = (checked: boolean) => unknown;

export interface CheckboxProps
  extends Omit<React.ComponentProps<'input'>, 'onPointerLeave'> {
  className?: string;
  size?: number;
  halfChecked?: boolean;
  label?: string | boolean | React.ReactNode;
  rowReverse?: boolean;
  skeleton?: boolean;
  fullWidth?: boolean;
  dataTest?: string;
  onValueChange?: CheckboxValueChangeEventHandler;
  onPointerLeave?: React.PointerEventHandler<HTMLLabelElement>;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  className,
  label,
  size = 20,
  halfChecked = false,
  skeleton = false,
  rowReverse,
  fullWidth = false,
  dataTest,
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
      data-test={dataTest}
    >
      {!skeleton && (
        <>
          <CheckboxInput
            {...props}
            $halfCheckedStyle={halfChecked}
            type="checkbox"
            onChange={handleChange}
          />
          <CheckboxBlock $size={size}>
            {halfChecked ? (
              <CheckboxHalfCheckedSquare />
            ) : (
              <CheckboxCheckedIcon size={size} />
            )}
          </CheckboxBlock>
        </>
      )}
      {skeleton && <CheckboxBlockSkeleton $size={size} />}
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
