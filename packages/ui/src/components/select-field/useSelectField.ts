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
  disabled?: boolean;
  placement?: SelectFieldPlacement;
  contentHeight?: number;
  onClose?: () => void;
  onSelectClick?: () => void;
} & UseSelectFieldUnionProps;

export type UseSelectFieldReturnType = ReturnType<typeof useSelectField>;

export const useSelectField = <
  TriggerType extends HTMLElement = HTMLDivElement
>({
  value: initialValue,
  multiple = false,
  disabled = false,
  placement: initialPlacement = 'bottom-left',
  contentHeight,
  onClose,
  onSelectClick,
  onChange,
  onValueChange
}: UseSelectFieldProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState<number | undefined>(contentHeight);
  const [placement, setPlacement] = useState(initialPlacement);

  const setInitialValue = useCallback(
    (item: ValueType) => {
      if (multiple && Array.isArray(item)) {
        const items = item;

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

  const setValueHandler = (value: ValueType) => {
    setValue(value);

    if (!onChange) return;

    if (multiple && Array.isArray(value)) {
      onChange(value);
    }

    if (!multiple && !Array.isArray(value)) {
      (onChange as SelectFieldChangeEventHandler)(value);
    }
  };

  const isKeyboardOpen = useRef(false);
  const triggerRef = useRef<TriggerType>(null);
  const selectModalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const listener = () => {
      const trigger = triggerRef.current;

      if (!trigger || !height || !contentHeight) return;

      let modalMaxHeight = contentHeight;

      const { top, bottom } = trigger.getBoundingClientRect();

      if (placement.includes('top')) {
        modalMaxHeight = top - 20;
      } else {
        modalMaxHeight = window.innerHeight - bottom - 20;
      }

      if (modalMaxHeight < contentHeight) {
        setHeight(modalMaxHeight);
      } else {
        setHeight(contentHeight);
      }
    };

    listener();

    window.addEventListener('resize', listener);

    return () => window.removeEventListener('resize', listener);
  }, [triggerRef.current, height, placement, contentHeight, isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const listener = (event: Event) => {
      if (isKeyboardOpen.current && event.type !== 'orientationchange') return;

      if (event.type === 'mousedown') {
        const inputEl: HTMLElement | null = triggerRef.current;
        const contentEl: HTMLDivElement | null = selectModalRef.current;

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
      const triggerEl: HTMLElement | null = triggerRef.current;
      const selectModalEl: HTMLDivElement | null = selectModalRef.current;

      if (!triggerEl || !selectModalEl || disabled) {
        return;
      }
      if (native) {
        event.stopPropagation();
      }

      const windowHeight =
        window.innerHeight || document.documentElement.clientHeight;

      const { width, height, top, bottom, left, right } =
        triggerEl.getBoundingClientRect();
      const { width: modalWidth } = selectModalEl.getBoundingClientRect();

      let newPlacement = placement;

      if (top - 186 < 0) {
        if (newPlacement === 'bottom-left') {
          newPlacement = 'bottom-left';
        } else {
          newPlacement = 'bottom-center';
        }
      } else if (bottom + 186 > windowHeight) {
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
          x = left + window.scrollX;
          y = top + window.scrollY + height;
          break;
        case 'bottom-center':
          x = Math.floor((left + right) / 2 + window.scrollX - modalWidth / 2);
          y = top + window.scrollY + height;
          break;
        case 'top-left':
          x = left + window.scrollX;
          y = top + window.scrollY;
          break;
        case 'top-right':
          x = left + window.scrollX + width;
          y = top + window.scrollY;
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
    triggerRef,
    selectModalRef,
    placement,
    isKeyboardOpen,
    value,
    disabled,
    multiple,
    contentHeight: height,
    handleInputClick,
    handleClose,
    setValue: setValueHandler
  };
};
