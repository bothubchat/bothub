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
  SelectFieldSkeleton, 
  SelectFieldStyled,
  SelectFieldValue,
  SelectFieldValueColor,
  SelectFieldValueText
} from './styled';
import { SelectFieldData, SelectFieldDataItem } from './types';
import { useTheme } from '@/ui/theme';
import { Skeleton } from '@/ui/components/skeleton';

export type SelectFieldChangeEventHandler = (item: SelectFieldDataItem) => unknown;

export type SelectFieldValueChangeEventHandler = (value: string) => unknown;

export interface SelectFieldProps {
  label?: string | boolean;
  value?: SelectFieldDataItem;
  placeholder?: string;
  data?: SelectFieldData;
  fullWidth?: boolean;
  error?: string;
  tabIndex?: number;
  disabled?: boolean;
  skeleton?: boolean;
  onChange?: SelectFieldChangeEventHandler;
  onValueChange?: SelectFieldValueChangeEventHandler;
}

export const SelectField: React.FC<SelectFieldProps> = ({ 
  label, 
  value: initialValue, 
  placeholder, 
  data = [], 
  fullWidth = false, 
  error, 
  tabIndex = 0, 
  disabled = false,
  skeleton = false,
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
      $disabled={disabled}
      ref={elementRef}
      tabIndex={tabIndex}
      onClick={setIsOpen.bind(null, !disabled && !skeleton && !isOpen)}
      onBlur={setIsOpen.bind(null, false)}
    >
      {label && (
        <SelectFieldLabel>
          {!skeleton && label}
          {skeleton && (
            <Skeleton width={100} />
          )}
        </SelectFieldLabel>
      )}
      <SelectFieldSelect>
        {!skeleton && (
          <SelectFieldHead 
            $open={isOpen}
            $error={!!error}
            $disabled={disabled}
            $skeleton={false}
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
        )}
        {skeleton && (
          <SelectFieldHead
            $open={false}
            $error={false}
            $disabled={false}
            $skeleton
          >
            <SelectFieldSkeleton />
          </SelectFieldHead>
        )}
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
                            <SelectFieldColorOptionText>
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
