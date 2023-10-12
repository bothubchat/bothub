import React, {
  useCallback, useRef, useState 
} from 'react';
import {
  SelectFieldArrow,
  SelectFieldBody, 
  SelectFieldBodyBackgroundWrapper, 
  SelectFieldBodyContent, 
  SelectFieldColorOptionText, 
  SelectFieldColorValueText, 
  SelectFieldErrorText, 
  SelectFieldHead, 
  SelectFieldLabel, 
  SelectFieldOption, 
  SelectFieldOptionColor, 
  SelectFieldOptionList, 
  SelectFieldOptionText, 
  SelectFieldPlaceholder, 
  SelectFieldScrollbarWrapper, 
  SelectFieldSelect, 
  SelectFieldStyled,
  SelectFieldValue,
  SelectFieldValueColor,
  SelectFieldValueText
} from './styled';
import { SelectFieldData, SelectFieldDataItem } from './types';
import { useTheme } from '@/ui/theme';

export type SelectFieldChangeEventHandler = (item: SelectFieldDataItem) => unknown;

export type SelectFieldValueChangeEventHandler = (value: string) => unknown;

export interface SelectFieldProps {
  label?: string;
  value?: SelectFieldDataItem;
  placeholder?: string;
  data: SelectFieldData;
  fullWidth?: boolean;
  error?: string;
  tabIndex?: number;
  onChange?: SelectFieldChangeEventHandler;
  onValueChange?: SelectFieldValueChangeEventHandler;
}

export const SelectField: React.FC<SelectFieldProps> = ({ 
  label, 
  value: initialValue, 
  placeholder, 
  data, 
  fullWidth = false, 
  error, 
  tabIndex = 0, 
  onChange,
  onValueChange
}) => {
  const theme = useTheme();

  const setInitialValue = useCallback<SelectFieldChangeEventHandler>((item) => {
    onChange?.(item);
    if (typeof item === 'string') {
      onValueChange?.(item);
    } else {
      onValueChange?.(item.value);
    }
  }, [onChange, onValueChange]);

  const [value, setValue] = typeof initialValue !== 'undefined' ? [initialValue, setInitialValue] : useState(data[0]);
  const [isOpen, setIsOpen] = useState(false);
  
  const elementRef = useRef<HTMLDivElement>(null);

  const handleChange = useCallback((item: SelectFieldDataItem) => {
    setValue?.(item);

    elementRef.current?.blur();
  }, [setValue]);

  return (
    <SelectFieldStyled 
      $fullWidth={fullWidth}
      ref={elementRef}
      tabIndex={tabIndex}
      onFocus={setIsOpen.bind(null, true)}
      onBlur={setIsOpen.bind(null, false)}
    >
      {label && (
        <SelectFieldLabel>
          {label}
        </SelectFieldLabel>
      )}
      <SelectFieldSelect>
        <SelectFieldHead 
          $open={isOpen}
          $error={!!error}  
        >
          {!value && (
            <SelectFieldPlaceholder
              $open={isOpen}
            >
              {placeholder}
            </SelectFieldPlaceholder>
          )}
          {(typeof value === 'string' && value !== '') && (
            <SelectFieldValue>
              <SelectFieldValueText>
                {value}
              </SelectFieldValueText>
            </SelectFieldValue>
          )}
          {typeof value === 'object' && (
            <SelectFieldValue>
              {value.color && (
                <SelectFieldValueColor $color={value.color} />
              )}
              {value.value && (
                <SelectFieldColorValueText>
                  {value.value}
                </SelectFieldColorValueText>
              )}
            </SelectFieldValue>
          )}
          <SelectFieldArrow 
            initial={{
              transform: `rotateZ(${isOpen ? 180 : 0}deg)`
            }}
            animate={{
              transform: `rotateZ(${isOpen ? 180 : 0}deg)`
            }}
          />
        </SelectFieldHead>
        {isOpen && (
          <SelectFieldBody>
            <SelectFieldBodyBackgroundWrapper>
              <SelectFieldScrollbarWrapper>
                <SelectFieldBodyContent>
                  <SelectFieldOptionList>
                    {data.map((item, index) => {
                      if (typeof item === 'string') {
                        const selected: boolean = typeof value === 'string' ? item === value : item === value.value;

                        return (
                          <SelectFieldOption
                            $selected={selected}
                            key={index}
                            onClick={handleChange.bind(null, item)}
                          >
                            <SelectFieldOptionText>
                              {item}
                            </SelectFieldOptionText>
                          </SelectFieldOption>
                        );
                      }

                      const selected: boolean = typeof value === 'string' ? item.value === value : item.value === value.value;

                      return (
                        <SelectFieldOption
                          $selected={selected}
                          key={item.id ?? index}
                          onClick={handleChange.bind(null, item)}
                        >
                          {!item.color && (
                            <SelectFieldOptionText>
                              {item.value}
                            </SelectFieldOptionText>
                          )}
                          {item.color && (
                            <SelectFieldOptionColor 
                              $color={
                                item.color === theme.colors.accent.primary && selected ? (
                                  theme.colors.accent.primaryLight
                                ) : item.color
                              } 
                            />
                          )}
                          {item.color && (
                            <SelectFieldColorOptionText $selected={selected}>
                              {item.value}
                            </SelectFieldColorOptionText>
                          )}
                        </SelectFieldOption>
                      );
                    })}
                  </SelectFieldOptionList>
                </SelectFieldBodyContent>
              </SelectFieldScrollbarWrapper>
            </SelectFieldBodyBackgroundWrapper>
          </SelectFieldBody>
        )}
      </SelectFieldSelect>
      {error && (
        <SelectFieldErrorText>
          {error}
        </SelectFieldErrorText>
      )}
    </SelectFieldStyled>
  );
};

export * from './types';
