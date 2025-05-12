import * as S from './styled';
import {
  SelectFieldChangeEventHandler,
  SelectFieldDataItem,
  SelectModal,
  useSelectField,
  UseSelectFieldProps
} from '../select-field';

export type Variant = 'primary' | 'secondary';

export type BadgeSelectDropdownProps = {
  options: string[];
  value: SelectFieldDataItem | null;
  variant?: 'primary' | 'secondary';
  onChange(value: string): void;
} & Omit<
  UseSelectFieldProps,
  'onChange' | 'multiple' | 'onValueChange' | 'value'
>;

export const BadgeSelectDropdown = ({
  options,
  value: initialValue,
  variant = 'primary',
  onChange,
  ...useSelectFieldProps
}: BadgeSelectDropdownProps) => {
  const onChangeHandler: SelectFieldChangeEventHandler = (value) => {
    if (typeof value === 'string') {
      onChange(value);
    }
  };

  const {
    isOpen,
    setValue,
    triggerRef,
    value,
    handleInputClick,
    ...selectModalProps
  } = useSelectField<HTMLButtonElement>({
    ...useSelectFieldProps,
    value: initialValue,
    multiple: false,
    onChange: onChangeHandler
  });

  let label = '';
  if (typeof value === 'string') {
    label = value;
  }
  if (
    value &&
    typeof value !== 'string' &&
    !Array.isArray(value) &&
    value.label
  ) {
    label = value.label;
  }

  return (
    <>
      <S.BadgeSelectDropdownTrigger
        $active={isOpen}
        $variant={variant}
        onClick={(e) => handleInputClick(false, e)}
        type="button"
        ref={triggerRef}
      >
        <S.BadgeSelectDropdownSpanStyled>
          {label}
        </S.BadgeSelectDropdownSpanStyled>

        <S.BadgeSelectDropdownTogglerArrow $open={isOpen} />
      </S.BadgeSelectDropdownTrigger>

      <SelectModal
        data={options}
        isOpen={isOpen}
        setValue={setValue}
        value={value}
        triggerRef={triggerRef}
        {...selectModalProps}
      />
    </>
  );
};

export * from './styled';
