import React, {
  useCallback, useEffect, useRef, useState 
} from 'react';
import {
  SelectFieldArrow,
  SelectFieldBlock, 
  SelectFieldBlockPositionWrapper, 
  SelectFieldBlockContent,
  SelectFieldColorValueText, 
  SelectFieldErrorText, 
  SelectFieldLabel, 
  SelectFieldPlaceholder,
  SelectFieldInput, 
  SelectFieldSkeleton, 
  SelectFieldStyled,
  SelectFieldValue,
  SelectFieldValueColor,
  SelectFieldValueText,
  SelectFieldGroup,
  SelectFieldGroups,
  SelectFieldValues,
  SelectFieldValueList,
  SelectFieldValueListItem,
  SelectFieldInputNative,
  SelectFieldInputLeftSide,
  SelectFieldInputSide,
  SelectFieldLoader,
  SelectFieldSearchIcon,
  SelectFieldClearButton
} from './styled';
import {
  SelectFieldChangeEventHandler, 
  SelectFieldData, 
  SelectFieldDataItem, 
  SelectFieldInputChangeEventHandler, 
  SelectFieldInputType, 
  SelectFieldMultiChangeEventHandler, 
  SelectFieldMultiValueChangeEventHandler, 
  SelectFieldOptionClickEventHandler, 
  SelectFieldPlacement, 
  SelectFieldSize, 
  SelectFieldValueChangeEventHandler 
} from './types';
import { useTheme } from '@/ui/theme';
import { Skeleton } from '@/ui/components/skeleton';
import { Portal } from '@/ui/components/portal';
import { IconProvider } from '../icon';
import { SelectFieldProvider } from './context';
import { SelectFieldOptions } from './option';
import { Tooltip, TooltipConsumer } from '@/ui/components/tooltip';

export interface SelectFieldDefaultProps {
  multiple?: false;
  value?: SelectFieldDataItem | null;
  onChange?: SelectFieldChangeEventHandler;
  onValueChange?: SelectFieldValueChangeEventHandler;
}

export interface SelectFieldMultiProps {
  multiple: true;
  value?: SelectFieldDataItem[];
  onChange?: SelectFieldMultiChangeEventHandler;
  onValueChange?: SelectFieldMultiValueChangeEventHandler;
}

export type SelectFieldProps = (SelectFieldDefaultProps | SelectFieldMultiProps) & {
  className?: string;
  label?: string | boolean | React.ReactNode;
  placeholder?: string;
  data?: SelectFieldData;
  fullWidth?: boolean;
  contentWidth?: number;
  error?: string;
  disabled?: boolean;
  skeleton?: boolean;
  blur?: boolean;
  size?: SelectFieldSize;
  disableSelect?: boolean;
  placement?: SelectFieldPlacement;
  disableScrollbar?: boolean;
  before?: SelectFieldData;
  after?: SelectFieldData;
  enableInput?: boolean;
  inputType?: SelectFieldInputType;
  inputValue?: string;
  clearable?: boolean;
  loading?: boolean;
  padding?: [number, number];
  onOptionClick?: SelectFieldOptionClickEventHandler;
  onInputChange?: SelectFieldInputChangeEventHandler;
  onSelectClick?: () => void;
} & React.PropsWithChildren;

export const SelectField: React.FC<SelectFieldProps> = ({
  className,
  label, 
  value: initialValue, 
  placeholder, 
  data = [], 
  fullWidth = false,
  contentWidth,
  error,
  disabled = false,
  skeleton = false,
  blur = false,
  size = 'small',
  disableSelect = false,
  placement: initialPlacement = 'bottom-left',
  disableScrollbar = false,
  before,
  after,
  loading = false,
  enableInput = false,
  inputType = 'text',
  inputValue: initialInputValue,
  clearable = false,
  onOptionClick,
  onInputChange,
  onSelectClick,
  children,
  ...props
}) => {
  const theme = useTheme();

  const { multiple = false } = props;

  const setInitialValue = useCallback((
    item: SelectFieldDataItem | SelectFieldDataItem[] | null
  ) => {
    if (props.multiple && Array.isArray(item)) {
      const items = item;

      props.onChange?.(items);
      props.onValueChange?.(
        items
          .map((item) => {
            if (typeof item === 'string') {
              return item;
            } if (typeof item.value === 'string') {
              return item.value;
            } 

            return '';
          })
          .filter((item) => !!item)
      );
    } else if (!props.multiple && !Array.isArray(item)) {
      props.onChange?.(item);

      if (item) {
        if (typeof item === 'string') {
          props.onValueChange?.(item);
        } else if (typeof item.value === 'string') {
          props.onValueChange?.(item.value);
        }
      } else {
        props.onValueChange?.(null);
      }
    }
  }, [props.multiple, props.onChange, props.onValueChange]);

  const setInitialInputValue = useCallback((value: string) => {
    onInputChange?.(value);
  }, [onInputChange]);

  const [value, setValue] = typeof initialValue !== 'undefined' ? [initialValue, setInitialValue] : useState<SelectFieldDataItem | SelectFieldDataItem[] | null>(multiple ? [] : null);
  const [inputValue, setInputValue] = typeof initialInputValue !== 'undefined' ? [initialInputValue, setInitialInputValue] : useState('');
  const [isInputNativeFocus, setIsInputNativeFocus] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [width, setWidth] = useState(0);
  const [placement, setPlacement] = useState(initialPlacement);

  const handleOptionClick = useCallback((item: SelectFieldDataItem) => {
    if (typeof item === 'object' && item.disabled) {
      return;
    }

    onOptionClick?.(item);

    if (!disableSelect) {
      if (multiple && Array.isArray(value)) {
        setValue([...new Set([...value, item])]);
      } else {
        setValue(item);
      }
    }
    setIsOpen(false);
  }, [value, setValue, multiple, onOptionClick, disableSelect]);

  const handleValueDelete = useCallback((item: SelectFieldDataItem, event: React.MouseEvent) => {
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
    
    setIsOpen(false);
  }, [value]);

  const handleInputClick = useCallback((native: boolean, event: React.MouseEvent<HTMLElement>) => {
    onSelectClick?.();
    const inputEl: HTMLDivElement | null = inputRef.current;
    
    if (!inputEl || disabled) {
      return;
    }
    if (native) {
      event.stopPropagation();
    }

    const windowHeight = window.innerHeight || document.documentElement.clientHeight;

    const rect = inputEl.getBoundingClientRect();
    const { width, height } = rect;

    let newPlacement = placement;

    if (rect.top - 186 < 0) {
      newPlacement = 'bottom-left';
    } else if (rect.bottom + 186 > windowHeight) {
      if (initialPlacement === 'top-right') {
        newPlacement = 'top-right';
      } else {
        newPlacement = 'top-left';
      }
    } else {
      newPlacement = initialPlacement;
    }

    let x: number = 0;
    let y: number = 0;

    switch (newPlacement) {
      case 'bottom-left':
        x = rect.left + window.scrollX;
        y = rect.top + window.scrollY + height;
        break;
      case 'top-left':
        x = rect.left + window.scrollX;
        y = rect.top + window.scrollY;
        break;
      case 'top-right':
        x = rect.left + window.scrollX + width;
        y = rect.top + window.scrollY;
        break;
    }

    setX(x);
    setY(y);
    setWidth(width);
    setPlacement(newPlacement);
    
    if (native) {
      setIsOpen(true);
    } else {
      setIsOpen(!isOpen);
    }
  }, [disabled, isOpen, placement, initialPlacement, onSelectClick]);

  const handleInputChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>((event) => {
    setInputValue(event.currentTarget.value);
  }, [setInputValue]);

  const handleClear = useCallback(() => {
    setValue(null);
    setInputValue('');
  }, [setValue, setInputValue]);

  const inputRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      const clickListener = (event: Event) => {
        const inputEl: HTMLDivElement | null = inputRef.current;
        const contentEl: HTMLDivElement | null = contentRef.current;

        if (inputEl === null || contentEl === null) {
          return;
        }
        if (
          inputEl.contains(event.target as Element) 
          || contentEl.contains(event.target as Element)
        ) {
          return;
        }

        setIsOpen(false);
      };
      
      document.addEventListener('click', clickListener);

      return () => {
        document.removeEventListener('click', clickListener);
      };
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      const scrollListener = () => {
        setIsOpen(false);
      };

      document.addEventListener('scroll', scrollListener);

      return () => {
        document.removeEventListener('scroll', scrollListener);
      };
    }
  }, [isOpen]);

  return (
    <SelectFieldProvider
      selectRef={inputRef}
      handleSelectClick={handleInputClick.bind(null, false)}
    >
      <SelectFieldStyled 
        $fullWidth={fullWidth}
        $disabled={disabled}
        className={className}
      >
        {(label && skeleton) && (
          <SelectFieldLabel>
            <Skeleton width={100} />
          </SelectFieldLabel>
        )}
        {(typeof label === 'string' && !skeleton) && (
          <SelectFieldLabel>
            {label}
          </SelectFieldLabel>
        )}
        {(typeof label !== 'string' && !skeleton) && label}
        {children && children}
        {!children && (
          <>
            {!skeleton && (
              <SelectFieldInput 
                $open={isOpen}
                $error={!!error}
                $disabled={disabled}
                $skeleton={false}
                $blur={blur}
                $loading={loading}
                $multiple={multiple && Array.isArray(value) && value.length > 0}
                ref={inputRef}
                onClick={handleInputClick.bind(null, false)}
              >
                <SelectFieldInputLeftSide>
                  {(!value || (Array.isArray(value) && value.length === 0)) && (
                    <>
                      {(enableInput && inputType === 'search') && (
                        <SelectFieldSearchIcon 
                          $focus={isInputNativeFocus}
                        />
                      )}
                      {enableInput && (
                        <SelectFieldInputNative
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
                        <SelectFieldPlaceholder
                          $open={isOpen}
                        >
                          {placeholder}
                        </SelectFieldPlaceholder>
                      )}
                    </>
                  )}
                  {(typeof value === 'string' && value !== '') && (
                    <SelectFieldValue>
                      <SelectFieldValueText>
                        {value}
                      </SelectFieldValueText>
                    </SelectFieldValue>
                  )}
                  {(value && typeof value === 'object' && !Array.isArray(value)) && (
                    <SelectFieldValue>
                      {value.icon && (
                        <IconProvider
                          fill={theme.colors.base.white}
                          size={18}
                        >
                          {value.icon}
                        </IconProvider>
                      )}
                      {value.color && (
                        <SelectFieldValueColor $color={value.color} />
                      )}
                      {value.label && (
                        <Tooltip
                          label={value.label}
                          placement="top-left"
                          disabled={value.label.length <= 128}
                        >
                          <TooltipConsumer>
                            {({ handleTooltipMouseEnter, handleTooltipMouseLeave }) => (
                              <SelectFieldColorValueText
                                onMouseEnter={handleTooltipMouseEnter}
                                onMouseLeave={handleTooltipMouseLeave}
                              >
                                {value.label && value.label.slice(0, 64)}
                                {value.label && value.label.length > 64 && '...'}
                              </SelectFieldColorValueText>
                            )}
                          </TooltipConsumer>
                        </Tooltip>
                      )}
                      {(!value.label && value.value) && (
                        <SelectFieldColorValueText>
                          {value.value}
                        </SelectFieldColorValueText>
                      )}
                    </SelectFieldValue>
                  )}
                  {(Array.isArray(value) && value.length > 0) && (
                    <SelectFieldValues>
                      <SelectFieldValueList>
                        {value.map((item, index) => {
                          if (typeof item === 'string') {
                            return (
                              <SelectFieldValueListItem
                                key={item}
                                onDelete={handleValueDelete.bind(null, item)}
                              >
                                {item}
                              </SelectFieldValueListItem>
                            );
                          }

                          return (
                            <SelectFieldValueListItem
                              key={item.id ?? item.value ?? index}
                              onDelete={handleValueDelete.bind(null, item)}
                            >
                              {item.label ?? item.value}
                            </SelectFieldValueListItem>
                          );
                        })}
                      </SelectFieldValueList>
                    </SelectFieldValues>
                  )}
                </SelectFieldInputLeftSide>
                <SelectFieldInputSide>
                  {(
                    (clearable && value)
                    || (enableInput && inputType === 'search' && !loading && inputValue)
                    || (enableInput && value)) && (
                    <SelectFieldClearButton 
                      onClick={handleClear}
                    />
                  )}
                  {loading && (
                    <SelectFieldLoader />
                  )}
                  <SelectFieldArrow 
                    style={{
                      transform: isOpen ? 'rotateZ(180deg)' : 'rotateZ(0deg)'
                    }} 
                  />
                </SelectFieldInputSide>
              </SelectFieldInput>
            )}
            {skeleton && (
              <SelectFieldInput
                $open={false}
                $error={false}
                $disabled={false}
                $skeleton
                $loading={false}
                $blur={blur}
                $multiple={false}
                ref={inputRef}
              >
                <SelectFieldSkeleton />
              </SelectFieldInput>
            )}
          </>
        )}
        {isOpen && (
          <Portal>
            <SelectFieldBlock
              $contentWidth={contentWidth}
              ref={contentRef}
              style={{
                ...(x !== 0 && {
                  ...(placement !== 'top-right' && {
                    left: `${x}px`
                  }),
                  ...(placement === 'top-right' && {
                    ...(typeof contentWidth === 'undefined' && {
                      left: `calc(${x}px - ${width})`,
                    }),
                    ...(typeof contentWidth === 'number' && {
                      left: `calc(${x}px - ${contentWidth > width ? `calc(var(--bothub-scale, 1) * ${contentWidth}px)` : `${width}px`})`
                    })
                  })
                }),
                ...(y !== 0 && {
                  top: `${y}px`
                }),
                ...(typeof contentWidth === 'undefined' && {
                  width: `${width}px`
                }),
                ...(typeof contentWidth === 'number' && {
                  width: `${contentWidth > width ? `calc(var(--bothub-scale, 1) * ${contentWidth}px)` : `${width}px`}`
                })
              }}
            >
              <SelectFieldBlockPositionWrapper
                $blur={blur}
                $placement={placement}
              >
                <SelectFieldBlockContent>
                  <SelectFieldGroups
                    $size={size}
                  >
                    {before && (
                      <SelectFieldGroup
                        $size={size}
                        $disableScrollbar={disableScrollbar}
                      >
                        <SelectFieldOptions
                          value={value}
                          data={before}
                          size={size}
                          disableSelect={disableSelect}
                          onOptionClick={handleOptionClick}
                        />
                      </SelectFieldGroup>
                    )}
                    <SelectFieldGroup
                      $size={size}
                      $disableScrollbar={disableScrollbar}
                    >
                      <SelectFieldOptions
                        value={value}
                        data={data}
                        size={size}
                        disableSelect={disableSelect}
                        onOptionClick={handleOptionClick}
                      />
                    </SelectFieldGroup>
                    {after && (
                      <SelectFieldGroup
                        $size={size}
                        $disableScrollbar={disableScrollbar}
                      >
                        <SelectFieldOptions
                          value={value}
                          data={after}
                          size={size}
                          disableSelect={disableSelect}
                          onOptionClick={handleOptionClick}
                        />
                      </SelectFieldGroup>
                    )}
                  </SelectFieldGroups>
                </SelectFieldBlockContent>
              </SelectFieldBlockPositionWrapper>
            </SelectFieldBlock>
          </Portal>
        )}
        {error && (
          <SelectFieldErrorText>
            {error}
          </SelectFieldErrorText>
        )}
      </SelectFieldStyled>
    </SelectFieldProvider>
  );
};

export * from './types';
export * from './styled';
export * from './context';
