import { useCallback, useEffect, useRef, useState } from 'react';
import {
  SelectFieldChangeEventHandler,
  SelectFieldDataItem,
  SelectFieldMultiChangeEventHandler,
  SelectFieldMultiValueChangeEventHandler,
  SelectFieldPlacement,
  SelectFieldValueChangeEventHandler
} from './types';
import { ValueSetter, ValueType } from '.';

export interface UseSelectFieldDefaultProps {
  multiple?: false;
  value?: SelectFieldDataItem | null;
  onChange?: SelectFieldChangeEventHandler;
  onValueChange?: SelectFieldValueChangeEventHandler;
}

export interface UseSelectFieldMultiProps {
  multiple: true;
  value?: SelectFieldDataItem[];
  onChange?: SelectFieldMultiChangeEventHandler;
  onValueChange?: SelectFieldMultiValueChangeEventHandler;
}

export type UseSelectFieldUnionProps =
  | UseSelectFieldDefaultProps
  | UseSelectFieldMultiProps;

export type UseSelectFieldProps = {
  followContentHeight?: boolean;
  disabled?: boolean;
  placement?: SelectFieldPlacement;
  onClose?: () => void;
  onSelectClick?: () => void;
} & UseSelectFieldUnionProps;

export type UseSelectFieldReturnType = ReturnType<typeof useSelectField>;

export const useSelectField = ({
  value: initialValue,
  multiple = false,
  followContentHeight = false,
  disabled = false,
  placement: initialPlacement = 'bottom-left',
  onClose,
  onSelectClick,
  onChange,
  onValueChange
}: UseSelectFieldProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [width, setWidth] = useState(0);
  const [placement, setPlacement] = useState(initialPlacement);
  const [blockHeight, setBlockHeight] = useState<number | null>(null);

  const setInitialValue = useCallback(
    (item: ValueType) => {
      if (multiple && Array.isArray(item)) {
        const items = item;

        onChange?.(items);
        (onValueChange as SelectFieldMultiValueChangeEventHandler)?.(
          items
            .map((item) => {
              if (typeof item === 'string') {
                return item;
              }

              if (typeof item.value === 'string') {
                return item.value;
              }

              return '';
            })
            .filter((item) => !!item)
        );
      }

      if (!multiple && item && !Array.isArray(item)) {
        (onChange as SelectFieldChangeEventHandler)?.(item);

        const onValueChangeTyped =
          onValueChange as SelectFieldValueChangeEventHandler;

        if (item) {
          if (typeof item === 'string') {
            onValueChangeTyped?.(item);
          } else if (typeof item.value === 'string') {
            onValueChangeTyped?.(item.value);
          }
        } else {
          onValueChangeTyped?.(null);
        }
      }
    },
    [multiple, onChange, onValueChange]
  );

  let [value, setValue] = useState<ValueType>(multiple ? [] : null) as [
    ValueType,
    ValueSetter
  ];
  if (typeof initialValue !== 'undefined') {
    [value, setValue] = [initialValue, setInitialValue];
  }

  const isKeyboardOpen = useRef(false);
  const inputRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  if (followContentHeight && contentRef.current && !blockHeight) {
    const { height } = getComputedStyle(contentRef.current.children[0]);
    setBlockHeight(parseInt(height));
  }

  useEffect(() => {
    if (!isOpen) return;

    const listener = (event: Event) => {
      if (isKeyboardOpen.current && event.type !== 'orientationchange') return;

      if (event.type === 'mousedown') {
        const inputEl: HTMLDivElement | null = inputRef.current;
        const contentEl: HTMLDivElement | null = contentRef.current;

        if (inputEl === null || contentEl === null) {
          return;
        }
        if (
          inputEl.contains(event.target as Element) ||
          contentEl.contains(event.target as Element)
        ) {
          return;
        }
      }

      handleClose();
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('scroll', listener);
    window.addEventListener('resize', listener);
    window.addEventListener('orientationchange', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('scroll', listener);
      window.removeEventListener('resize', listener);
      window.removeEventListener('orientationchange', listener);
    };
  }, [isOpen]);

  const handleInputClick = useCallback(
    (native: boolean, event: React.MouseEvent<HTMLElement>) => {
      onSelectClick?.();
      const inputEl: HTMLDivElement | null = inputRef.current;

      if (!inputEl || disabled) {
        return;
      }
      if (native) {
        event.stopPropagation();
      }

      const windowHeight =
        window.innerHeight || document.documentElement.clientHeight;

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
    },
    [disabled, isOpen, placement, initialPlacement, onSelectClick]
  );

  const handleClose = useCallback(() => {
    setIsOpen(false);
    onClose?.();
  }, []);

  return {
    x,
    y,
    width,
    isOpen,
    inputRef,
    contentRef,
    placement,
    isKeyboardOpen,
    blockHeight,
    value,
    disabled,
    followContentHeight,
    multiple,
    handleInputClick,
    handleClose,
    setValue
  };
};
