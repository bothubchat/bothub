import { useCallback, useMemo, useState } from 'react';

import * as S from './styled';
import { Skeleton } from '@/ui/components/skeleton';
import { useControllableState } from '@/ui/utils';

import { SelectModalGeneralProps, SelectModal } from './select-modal';
import { SelectFieldInputValue } from './nodes';

import {
  SelectFieldDataItem,
  SelectFieldInputChangeEventHandler,
  SelectFieldInputType,
} from './types';

import { SelectFieldProvider } from './context';
import { useSelectField, UseSelectFieldProps } from './useSelectField';

export type SelectFieldProps = {
  className?: string;
  label?: string | boolean | React.ReactNode;
  placeholder?: string;
  fullWidth?: boolean;
  error?: string;
  skeleton?: boolean;
  searchSampleIcon?: boolean;
  enableInput?: boolean;
  inputType?: SelectFieldInputType;
  inputValue?: string;
  clearable?: boolean;
  loading?: boolean;
  dataTest?: string;
  onInputChange?: SelectFieldInputChangeEventHandler;
  onPointerLeave?: React.PointerEventHandler<HTMLDivElement>;
} & SelectModalGeneralProps &
  UseSelectFieldProps &
  React.PropsWithChildren;

export const SelectField = ({
  className,
  label,
  placeholder,
  data,
  fullWidth = false,
  contentWidth,
  error,
  skeleton = false,
  blur = false,
  size = 'small',
  disableSelect = false,
  disableScrollbar = false,
  empty,
  after,
  loading = false,
  searchSampleIcon = false,
  enableInput = false,
  inputType = 'text',
  inputValue: initialInputValue,
  clearable = false,
  disablePortal,
  tabs,
  search,
  searchPlaceholder,
  resetStyleState,
  children,
  modalWidth,
  dataTest,
  selectedColor,
  compactWidth,
  modalStyles,
  openedModel,
  onSearch,
  onOptionClick,
  onGroupCheckboxClick,
  onInputChange,
  onPointerLeave,
  ...useSelectFieldProps
}: SelectFieldProps) => {
  const {
    isOpen,
    triggerRef,
    value,
    disabled,
    multiple,
    handleClose,
    handleInputClick,
    setValue,
    ...selectModalProps
  } = useSelectField(useSelectFieldProps);

  const [inputValue, setInputValue] = useControllableState({
    value: initialInputValue,
    defaultValue: '',
    onChange: onInputChange,
  });

  const [isInputNativeFocus, setIsInputNativeFocus] = useState(false);

  const handleSelectClick = useCallback(
    (event: React.MouseEvent<HTMLElement>) => handleInputClick(false, event),
    [handleInputClick],
  );

  const handleNativeInputClick = useCallback(
    (event: React.MouseEvent<HTMLElement>) => handleInputClick(true, event),
    [handleInputClick],
  );

  const handleNativeInputFocus = useCallback(
    () => setIsInputNativeFocus(true),
    [],
  );

  const handleNativeInputBlur = useCallback(
    () => setIsInputNativeFocus(false),
    [],
  );

  const isSearch = useMemo(
    () => enableInput && inputType === 'search',
    [enableInput, inputType],
  );

  const isMultipleWithValues = useMemo(
    () => multiple && Array.isArray(value) && value.length > 0,
    [multiple, value],
  );

  const labelNode = useMemo(() => {
    if (skeleton && label !== undefined && label !== null) {
      return (
        <S.SelectFieldLabel>
          <Skeleton width={100} />
        </S.SelectFieldLabel>
      );
    }

    if (typeof label === 'string') {
      return <S.SelectFieldLabel>{label}</S.SelectFieldLabel>;
    }

    return label;
  }, [skeleton, label]);

  const handleValueDelete = useCallback(
    (item: SelectFieldDataItem, event: React.MouseEvent) => {
      event.stopPropagation();

      if (Array.isArray(value)) {
        if (typeof item === 'string') {
          setValue(
            value.filter((value) => {
              if (typeof value === 'string') {
                return value !== item;
              }

              return value.value !== item;
            }),
          );
          return;
        }

        setValue(
          value.filter((value) => {
            if (typeof value === 'string') {
              return value !== item.value;
            }

            return value.value !== item.value;
          }),
        );
      }

      handleClose();
    },
    [value, setValue, handleClose],
  );

  const handleInputChange = useCallback<
    React.ChangeEventHandler<HTMLInputElement>
  >(
    (event) => {
      setInputValue(event.currentTarget.value);
    },
    [setInputValue],
  );

  const handleClear = useCallback(
    (event: React.MouseEvent) => {
      // The button is inside the trigger: without this the click would also
      // open the modal right after clearing the value.
      event.stopPropagation();
      setValue(null);
      setInputValue('');
    },
    [setValue, setInputValue],
  );

  return (
    <SelectFieldProvider
      selectRef={triggerRef}
      handleSelectClick={handleSelectClick}
    >
      <S.SelectFieldStyled
        $fullWidth={fullWidth}
        $disabled={disabled}
        className={className}
        onPointerLeave={onPointerLeave}
      >
        {labelNode}
        {children ?? (
          <>
            {skeleton ? (
              <S.SelectFieldInput
                $open={false}
                $error={false}
                $disabled={false}
                $skeleton
                $loading={false}
                $blur={blur}
                $multiple={false}
                ref={triggerRef}
              >
                <S.SelectFieldSkeleton />
              </S.SelectFieldInput>
            ) : (
              <S.SelectFieldInput
                $open={isOpen}
                $error={!!error}
                $disabled={disabled}
                $skeleton={false}
                $blur={blur}
                $loading={loading}
                $multiple={isMultipleWithValues}
                ref={triggerRef}
                onClick={handleSelectClick}
                data-test={dataTest}
              >
                <S.SelectFieldInputLeftSide>
                  {(!value || (Array.isArray(value) && value.length === 0)) && (
                    <>
                      {isSearch &&
                        (searchSampleIcon ? (
                          <S.SelectFieldSearchSimpleIcon
                            $focus={isInputNativeFocus}
                          />
                        ) : (
                          <S.SelectFieldSearchIcon
                            $focus={isInputNativeFocus}
                          />
                        ))}
                      {enableInput ? (
                        <S.SelectFieldInputNative
                          type={inputType}
                          value={inputValue}
                          placeholder={placeholder}
                          disabled={disabled}
                          onClick={handleNativeInputClick}
                          onChange={handleInputChange}
                          onFocus={handleNativeInputFocus}
                          onBlur={handleNativeInputBlur}
                        />
                      ) : (
                        <S.SelectFieldPlaceholder $open={isOpen}>
                          {placeholder}
                        </S.SelectFieldPlaceholder>
                      )}
                    </>
                  )}
                  <SelectFieldInputValue
                    value={value}
                    handleValueDelete={handleValueDelete}
                  />
                </S.SelectFieldInputLeftSide>
                <S.SelectFieldInputSide>
                  {((value && (clearable || enableInput)) ||
                    (isSearch && !loading && inputValue)) && (
                    <S.SelectFieldClearButton onClick={handleClear} />
                  )}
                  {loading && <S.SelectFieldLoader />}
                  <S.SelectFieldArrow $isOpen={isOpen} />
                </S.SelectFieldInputSide>
              </S.SelectFieldInput>
            )}
          </>
        )}
        <SelectModal
          {...selectModalProps}
          isOpen={isOpen}
          data={data}
          contentWidth={contentWidth}
          size={size}
          disableSelect={disableSelect}
          disableScrollbar={disableScrollbar}
          empty={empty}
          after={after}
          tabs={tabs}
          search={search}
          searchPlaceholder={searchPlaceholder}
          resetStyleState={resetStyleState}
          blur={blur}
          disablePortal={disablePortal}
          value={value}
          multiple={multiple}
          onSearch={onSearch}
          onOptionClick={onOptionClick}
          onGroupCheckboxClick={onGroupCheckboxClick}
          handleClose={handleClose}
          setValue={setValue}
          modalWidth={modalWidth}
          selectedColor={selectedColor}
          compactWidth={compactWidth}
          modalStyles={modalStyles}
          openedModel={openedModel}
        />
        {error && <S.SelectFieldErrorText>{error}</S.SelectFieldErrorText>}
      </S.SelectFieldStyled>
    </SelectFieldProvider>
  );
};

export * from './types';
export * from './styled';
export * from './context';
export * from './select-modal';
export * from './useSelectField';
