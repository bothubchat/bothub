import { useCallback, useState } from 'react';
import * as S from './styled';
import {
  SelectFieldDataItem,
  SelectFieldInputChangeEventHandler,
  SelectFieldInputType
} from './types';
import { useTheme } from '@/ui/theme';
import { Skeleton } from '@/ui/components/skeleton';
import { IconProvider } from '../icon';
import { SelectFieldProvider } from './context';
import { Tooltip, TooltipConsumer } from '@/ui/components/tooltip';
import { SelectModalGeneralProps, SelectModal } from './select-modal';
import { useSelectField, UseSelectFieldProps } from './useSelectField';

export type SelectFieldProps = {
  className?: string;
  label?: string | boolean | React.ReactNode;
  placeholder?: string;
  fullWidth?: boolean;
  error?: string;
  skeleton?: boolean;
  enableInput?: boolean;
  inputType?: SelectFieldInputType;
  inputValue?: string;
  clearable?: boolean;
  loading?: boolean;
  padding?: [number, number];
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
  before,
  after,
  loading = false,
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
  openedModel,
  onSearch,
  onOptionClick,
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

  const theme = useTheme();

  const setInitialInputValue = useCallback(
    (value: string) => {
      onInputChange?.(value);
    },
    [onInputChange]
  );

  let [inputValue, setInputValue] = useState('') as [
    string,
    (value: string) => void
  ];
  if (typeof initialInputValue !== 'undefined') {
    [inputValue, setInputValue] = [initialInputValue, setInitialInputValue];
  }

  const [isInputNativeFocus, setIsInputNativeFocus] = useState(false);

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
            })
          );
        } else {
          setValue(
            value.filter((value) => {
              if (typeof value === 'string') {
                return value !== item.value;
              }

              return value.value !== item.value;
            })
          );
        }
      }

      handleClose();
    },
    [value]
  );

  const handleInputChange = useCallback<
    React.ChangeEventHandler<HTMLInputElement>
  >(
    (event) => {
      setInputValue(event.currentTarget.value);
    },
    [setInputValue]
  );

  const handleClear = useCallback(() => {
    setValue(null);
    setInputValue('');
  }, [setValue, setInputValue]);

  return (
    <SelectFieldProvider
      selectRef={triggerRef}
      handleSelectClick={handleInputClick.bind(null, false)}
    >
      <S.SelectFieldStyled
        $fullWidth={fullWidth}
        $disabled={disabled}
        className={className}
        onPointerLeave={onPointerLeave}
      >
        {label && skeleton && (
          <S.SelectFieldLabel>
            <Skeleton width={100} />
          </S.SelectFieldLabel>
        )}
        {typeof label === 'string' && !skeleton && (
          <S.SelectFieldLabel>{label}</S.SelectFieldLabel>
        )}
        {typeof label !== 'string' && !skeleton && label}
        {children}
        {!children && (
          <>
            {!skeleton && (
              <S.SelectFieldInput
                $open={isOpen}
                $error={!!error}
                $disabled={disabled}
                $skeleton={false}
                $blur={blur}
                $loading={loading}
                $multiple={multiple && Array.isArray(value) && value.length > 0}
                ref={triggerRef}
                onClick={handleInputClick.bind(null, false)}
                data-test={dataTest}
              >
                <S.SelectFieldInputLeftSide>
                  {(!value || (Array.isArray(value) && value.length === 0)) && (
                    <>
                      {enableInput && inputType === 'search' && (
                        <S.SelectFieldSearchIcon $focus={isInputNativeFocus} />
                      )}
                      {enableInput && (
                        <S.SelectFieldInputNative
                          type={inputType}
                          value={inputValue}
                          placeholder={placeholder}
                          disabled={disabled}
                          onClick={handleInputClick.bind(null, true)}
                          onChange={handleInputChange}
                          onFocus={setIsInputNativeFocus.bind(null, true)}
                          onBlur={setIsInputNativeFocus.bind(null, false)}
                        />
                      )}
                      {!enableInput && (
                        <S.SelectFieldPlaceholder $open={isOpen}>
                          {placeholder}
                        </S.SelectFieldPlaceholder>
                      )}
                    </>
                  )}
                  {typeof value === 'string' && value !== '' && (
                    <S.SelectFieldValue>
                      <S.SelectFieldValueText>{value}</S.SelectFieldValueText>
                    </S.SelectFieldValue>
                  )}
                  {value &&
                    typeof value === 'object' &&
                    !Array.isArray(value) && (
                      <S.SelectFieldValue>
                        {value.icon && (
                          <IconProvider
                            fill={theme.colors.base.white}
                            size={18}
                          >
                            {value.icon}
                          </IconProvider>
                        )}
                        {value.color && (
                          <S.SelectFieldValueColor $color={value.color} />
                        )}
                        {value.label && (
                          <Tooltip
                            label={value.label}
                            placement="top-left"
                            disabled={value.label.length <= 128}
                          >
                            <TooltipConsumer>
                              {({
                                handleTooltipMouseEnter,
                                handleTooltipMouseLeave
                              }) => (
                                <S.SelectFieldColorValueText
                                  onMouseEnter={handleTooltipMouseEnter}
                                  onMouseLeave={handleTooltipMouseLeave}
                                >
                                  {value.label}
                                </S.SelectFieldColorValueText>
                              )}
                            </TooltipConsumer>
                          </Tooltip>
                        )}
                        {!value.label && value.value && (
                          <S.SelectFieldColorValueText>
                            {value.value}
                          </S.SelectFieldColorValueText>
                        )}
                      </S.SelectFieldValue>
                    )}
                  {Array.isArray(value) && value.length > 0 && (
                    <S.SelectFieldValues>
                      <S.SelectFieldValueList>
                        {value.map((item, index) => {
                          if (typeof item === 'string') {
                            return (
                              <S.SelectFieldValueListItem
                                key={item}
                                onDelete={handleValueDelete.bind(null, item)}
                              >
                                {item}
                              </S.SelectFieldValueListItem>
                            );
                          }

                          return (
                            <S.SelectFieldValueListItem
                              key={item.id ?? item.value ?? index}
                              onDelete={handleValueDelete.bind(null, item)}
                            >
                              {item.label ?? item.value}
                            </S.SelectFieldValueListItem>
                          );
                        })}
                      </S.SelectFieldValueList>
                    </S.SelectFieldValues>
                  )}
                </S.SelectFieldInputLeftSide>
                <S.SelectFieldInputSide>
                  {((clearable && value) ||
                    (enableInput &&
                      inputType === 'search' &&
                      !loading &&
                      inputValue) ||
                    (enableInput && value)) && (
                    <S.SelectFieldClearButton onClick={handleClear} />
                  )}
                  {loading && <S.SelectFieldLoader />}
                  <S.SelectFieldArrow
                    style={{
                      transform: isOpen ? 'rotateZ(180deg)' : 'rotateZ(0deg)'
                    }}
                  />
                </S.SelectFieldInputSide>
              </S.SelectFieldInput>
            )}
            {skeleton && (
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
          before={before}
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
          handleClose={handleClose}
          setValue={setValue}
          modalWidth={modalWidth}
          selectedColor={selectedColor}
          compactWidth={compactWidth}
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
