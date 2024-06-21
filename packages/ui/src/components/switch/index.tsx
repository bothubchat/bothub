import React, { useMemo } from 'react';
import { nanoid } from 'nanoid';
import * as S from './styled';

type BaseSwitchProps = {
  id?: string;
  name?: string;
  onChange?: (value: boolean) => void;
  value?: boolean;
  label?: string;
  className?: string;
};

export type SwitchProps = BaseSwitchProps
& Omit<React.InputHTMLAttributes<HTMLInputElement>, keyof BaseSwitchProps>;

export const Switch = ({
  id,
  name,
  onChange,
  value,
  label,
  className,
  ...inputProps
}: SwitchProps) => {
  const elId = useMemo(() => id || nanoid(), [id]);

  return (
    <S.Wrapper className={className}>
      <S.Checkbox
        id={elId}
        name={name}
        checked={value}
        onChange={(event) => onChange?.(event.target.checked)}
        {...inputProps}
      />
      <S.HiddenLabel htmlFor={elId} />
      {label && <S.TextLabel htmlFor={elId}>{label}</S.TextLabel>}
    </S.Wrapper>
  );
};
