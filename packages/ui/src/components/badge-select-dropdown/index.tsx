import * as S from './styled';
import {
  SelectFieldChangeEventHandler,
  SelectFieldDataItem,
  SelectFieldValueChangeEventHandler,
  SelectModal,
  useSelectField,
  UseSelectFieldProps
} from '../select-field';
import { Variant } from './types';
import { useTheme } from '@/ui/theme';

export type BadgeSelectDropdownProps = {
  options: SelectFieldDataItem[];
  value?: SelectFieldDataItem | null;
  variant?: Variant;
  colorButtonOpened?: string;
  className?: string;
  compactWidth?: boolean;
  modalStyles?: React.CSSProperties;
  onChange?: SelectFieldChangeEventHandler;
  onValueChange?: SelectFieldValueChangeEventHandler;
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
  modalStyles,
  ...useSelectFieldProps
}: BadgeSelectDropdownProps) => {
  const theme = useTheme();

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
    multiple: false
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
        selectedColor={theme.colors.grayScale.gray2}
        modalStyles={modalStyles}
        {...selectModalProps}
      />
    </>
  );
};

export * from './styled';
