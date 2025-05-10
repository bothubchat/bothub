import * as S from './styled';
import {
  SelectModal,
  useSelectField,
  UseSelectFieldProps
} from '../select-field';

export type BadgeSelectDropdownProps = {
  options: string[];
} & UseSelectFieldProps;

export const BadgeSelectDropdown = ({
  options,
  ...useSelectFieldProps
}: BadgeSelectDropdownProps) => {
  const {
    isOpen,
    setValue,
    triggerRef,
    value,
    handleInputClick,
    ...selectModalProps
  } = useSelectField<HTMLButtonElement>(useSelectFieldProps);

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
