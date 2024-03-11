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
  SelectFieldGroups
} from './styled';
import {
  SelectFieldChangeEventHandler, 
  SelectFieldData, 
  SelectFieldDataItem, 
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

export interface SelectFieldProps extends React.PropsWithChildren {
  className?: string;
  label?: string | boolean | React.ReactNode;
  value?: SelectFieldDataItem;
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
  onChange?: SelectFieldChangeEventHandler;
  onValueChange?: SelectFieldValueChangeEventHandler;
  onOptionClick?: SelectFieldOptionClickEventHandler;
}

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
  placement = 'bottom-left',
  disableScrollbar = false,
  before,
  after,
  onChange,
  onValueChange,
  onOptionClick,
  children
}) => {
  const theme = useTheme();

  const setInitialValue = useCallback<SelectFieldChangeEventHandler>((item) => {
    onChange?.(item);
    if (typeof item === 'string') {
      onValueChange?.(item);
    } else if (typeof item.value === 'string') {
      onValueChange?.(item.value);
    }
  }, [onChange, onValueChange]);

  const [value, setValue] = typeof initialValue !== 'undefined' ? [initialValue, setInitialValue] : useState(data[0]);
  const [isOpen, setIsOpen] = useState(false);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [bottom, setBottom] = useState(0);
  const [right, setRight] = useState(0);
  const [width, setWidth] = useState(0);

  const handleOptionClick = useCallback((item: SelectFieldDataItem) => {
    if (typeof item === 'object' && item.disabled) {
      return;
    }

    onOptionClick?.(item);

    if (!disableSelect) {
      setValue?.(item);
    }
    setIsOpen(false);
  }, [setValue, onOptionClick, disableSelect]);

  const handleInputClick = useCallback<React.MouseEventHandler<HTMLDivElement>>((event) => {
    if (disabled || !(event.currentTarget instanceof HTMLElement)) {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const { width, height } = rect;

    let x: number = 0;
    let y: number = 0;
    const right: number = 0;
    const bottom: number = 0;

    switch (placement) {
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
    setRight(right);
    setBottom(bottom);
    setWidth(width);
      
    setIsOpen(!isOpen);
  }, [disabled, isOpen, placement]);

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
      handleSelectClick={handleInputClick}
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
                ref={inputRef}
                onClick={handleInputClick}
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
                      <SelectFieldColorValueText>
                        {value.label}
                      </SelectFieldColorValueText>
                    )}
                    {(!value.label && value.value) && (
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
              </SelectFieldInput>
            )}
            {skeleton && (
              <SelectFieldInput
                $open={false}
                $error={false}
                $disabled={false}
                $skeleton
                $blur={blur}
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
                ...(right !== 0 && {
                  right: `${right}px`
                }),
                ...(bottom !== 0 && {
                  bottom: `${bottom}px`
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
