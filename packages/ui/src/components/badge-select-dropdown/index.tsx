import * as S from './styled';
import {
  SelectFieldChangeEventHandler,
  SelectFieldDataItem,
  SelectModal,
  useSelectField,
  UseSelectFieldProps
} from '../select-field';
import { Variant } from './types';

export type BadgeSelectDropdownProps = {
  options: SelectFieldDataItem[];
  value?: SelectFieldDataItem | null;
  variant?: Variant;
  colorButtonOpened?: string;
  className?: string;
  compactWidth?: boolean;
  onChange?: SelectFieldChangeEventHandler;
} & Omit<
  UseSelectFieldProps,
  'onChange' | 'multiple' | 'onValueChange' | 'value'
>;

export const BadgeSelectDropdown = ({
  options,
  value: initialValue,
  variant = 'primary',
  colorButtonOpened,
  className,
  compactWidth,
  onChange,
  ...useSelectFieldProps
}: BadgeSelectDropdownProps) => {
  const {
    isOpen,
    triggerRef,
    value,
    setValue,
    handleInputClick,
    ...selectModalProps
  } = useSelectField<HTMLButtonElement>({
    ...useSelectFieldProps,
    value: initialValue,
    multiple: false,
    onChange
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
        ref={triggerRef}
        $active={isOpen}
        $variant={variant}
        $colorButtonOpened={colorButtonOpened}
        type="button"
        onClick={(e) => handleInputClick(false, e)}
        className={className}
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
        compactWidth={compactWidth}
        {...selectModalProps}
      />
    </>
  );
};

export * from './styled';
