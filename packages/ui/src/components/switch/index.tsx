import React, { useId } from 'react';
import { useControllableState } from '@/ui/utils';
import * as S from './styled';

type BaseSwitchProps = {
  id?: string;
  name?: string;
  onChange?: (value: boolean) => void;
  value?: boolean;
  label?: string;
  className?: string;
};

export type SwitchProps = BaseSwitchProps &
  Omit<React.InputHTMLAttributes<HTMLInputElement>, keyof BaseSwitchProps>;

export const Switch = ({
  id,
  name,
  onChange,
  value: initialValue,
  label,
  className,
  checked,
  defaultChecked,
  ...inputProps
}: SwitchProps) => {
  const localId = useId();
  const elId = id || localId;
  // The input is always controlled, so it doesn't switch from uncontrolled
  // to controlled when the parent starts passing a value
  const [value, setValue] = useControllableState<boolean>({
    value: initialValue ?? checked,
    defaultValue: defaultChecked ?? false,
    onChange,
  });

  return (
    <S.Wrapper className={className}>
      <S.Checkbox
        id={elId}
        name={name}
        checked={value}
        onChange={(event) => setValue(event.target.checked)}
        {...inputProps}
      />
      <S.HiddenLabel htmlFor={elId} />
      {label && <S.TextLabel htmlFor={elId}>{label}</S.TextLabel>}
    </S.Wrapper>
  );
};
