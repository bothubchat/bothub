import React, { useCallback } from 'react';
import {
  RadioCircle,
  RadioCircleDot,
  RadioInput,
  RadioLabel,
  RadioStyled
} from './styled';
import { Skeleton } from '@/ui/components/skeleton';

export type RadioValueChangeEventHandler = (checked: boolean) => unknown;

export interface RadioProps extends React.ComponentProps<'input'> {
  className?: string;
  label?: string | boolean;
  skeleton?: boolean;
  onValueChange?: RadioValueChangeEventHandler;
  icon?: React.ReactNode;
}

export const Radio: React.FC<RadioProps> = ({
  className,
  label,
  skeleton = false,
  onValueChange,
  icon,
  ...props
}) => {
  const handleChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      props.onChange?.(event);
      onValueChange?.(event.target.checked);
    },
    [props.onChange, onValueChange]
  );

  return (
    <RadioStyled
      $disabled={props.disabled ?? false}
      className={className}
    >
      {!skeleton && (
        <RadioInput
          {...props}
          type="radio"
          onChange={handleChange}
        />
      )}
      {!skeleton && (
        <>
          {icon || (
            <RadioCircle $skeleton={false}>
              <RadioCircleDot />
            </RadioCircle>
          )}
        </>
      )}
      {skeleton && (
        <RadioCircle
          $skeleton
          as={Skeleton}
        />
      )}
      {typeof label === 'string' && <RadioLabel>{label}</RadioLabel>}
      {skeleton && label && (
        <RadioLabel>
          <Skeleton />
        </RadioLabel>
      )}
    </RadioStyled>
  );
};
