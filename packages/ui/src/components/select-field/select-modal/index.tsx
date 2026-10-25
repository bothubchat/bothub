import React, {
  useCallback,
  useDeferredValue,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import * as S from './styled';
import { SearchSimpleIcon } from '@/ui/icons';

import { Portal } from '@/ui/components/portal';
import { ScrollableTabsProps } from '@/ui/components/scrollable-tabs';
import { useEventCallback } from '@/ui/utils';

import { SelectFieldGroup } from './select-field-group';
import { SelectFieldOptions } from './option';
import { filterData } from './filterData';
import { getSelectFieldItemKey } from '../helpers';

import { UseSelectFieldReturnType } from '../useSelectField';
import {
  ResetStyleStateType,
  SelectFieldData,
  SelectFieldDataItem,
  SelectFieldGroupCheckboxClickEventHandler,
  SelectFieldInputChangeEventHandler,
  SelectFieldOptionClickEventHandler,
  SelectFieldSize,
} from '../types';

export type SelectModalGeneralProps = {
  data?: SelectFieldData;
  contentWidth?: number;
  contentHeight?: number | string;
  size?: SelectFieldSize;
  disableSelect?: boolean;
  disableScrollbar?: boolean;
  empty?: React.ReactNode;
  after?: SelectFieldData;
  tabs?: Omit<ScrollableTabsProps, 'variant' | 'component'>;
  search?: boolean;
  searchPlaceholder?: string;
  onSearch?: SelectFieldInputChangeEventHandler;
  resetStyleState?: ResetStyleStateType;
  disablePortal?: boolean;
  blur?: boolean;
  modalWidth?: string;
  openedModel?: string;
  selectedColor?: string;
  compactWidth?: boolean;
  modalStyles?: React.CSSProperties;
  onOptionClick?: SelectFieldOptionClickEventHandler;
  onGroupCheckboxClick?: SelectFieldGroupCheckboxClickEventHandler;
};

export type SelectModalProps = SelectModalGeneralProps &
  Omit<
    UseSelectFieldReturnType,
    'disabled' | 'handleInputClick' | 'maxHeight' | 'triggerRef'
  >;

export const SelectModal = ({
  isOpen,
  data: initialData = [],
  contentWidth,
  contentHeight,
  size = 'small',
  disableSelect = false,
  disableScrollbar = false,
  empty,
  after,
  tabs,
  search,
  searchPlaceholder,
  resetStyleState,
  placement,
  selectModalRef,
  disablePortal,
  blur = false,
  x,
  y,
  width,
  isKeyboardOpen,
  value,
  multiple,
  modalWidth,
  openedModel,
  selectedColor,
  compactWidth,
  modalStyles,
  onSearch,
  onOptionClick,
  onGroupCheckboxClick,
  handleClose,
  setValue,
}: SelectModalProps) => {
  const [openedOptions, setOpenedOptions] = useState<(string | number)[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const deferredSearchValue = useDeferredValue(searchValue);
  const scrollTop = useRef(0);

  // Options are mounted on the first open and kept afterwards: a select that
  // was never opened costs almost nothing, and reopening stays cheap.
  const [isContentMounted, setIsContentMounted] = useState(isOpen);
  if (isOpen && !isContentMounted) {
    setIsContentMounted(true);
  }

  const handleScrollTopChange = useCallback((value: number) => {
    scrollTop.current = value;
  }, []);

  const handleSearchChange = useCallback<
    React.ChangeEventHandler<HTMLInputElement>
  >(
    (event) => {
      const { value } = event.currentTarget;
      onSearch?.(value);
      setSearchValue(value);
    },
    [onSearch, setSearchValue],
  );

  const handleOptionClick = useCallback(
    (item: SelectFieldDataItem) => {
      if (typeof item === 'object' && item.disabled) {
        return;
      }

      if (typeof item === 'object' && item.noSelect) {
        item?.onClick?.(item);
        handleClose();
        return;
      }

      onOptionClick?.(item);

      if (
        !disableSelect &&
        !(
          typeof item === 'object' &&
          (item.type === 'checkbox' || item.type === 'checkbox-group')
        )
      ) {
        if (multiple && Array.isArray(value)) {
          const itemKey = getSelectFieldItemKey(item);
          const isSelected = value.some(
            (selectedItem) => getSelectFieldItemKey(selectedItem) === itemKey,
          );

          setValue(isSelected ? [...value] : [...value, item]);
        } else {
          setValue(item);
        }
      }

      if (
        typeof item === 'object' &&
        (item.type === 'checkbox' || item.type === 'checkbox-group')
      ) {
        return;
      }

      handleClose();
    },
    [value, multiple, disableSelect, setValue, onOptionClick, handleClose],
  );

  // Options get the same handler on every render, so memoized options are
  // not rerendered when the value changes.
  const handleStableOptionClick = useEventCallback(handleOptionClick);

  useEffect(() => {
    setOpenedOptions(openedModel ? [openedModel] : []);
    scrollTop.current = 0;
    setSearchValue('');
  }, [resetStyleState, openedModel]);

  const onTabClick = useCallback(
    (id: string | null) => {
      scrollTop.current = 0;
      setOpenedOptions([]);
      if (tabs && tabs.onClick) {
        tabs.onClick(id);
      }
    },
    [tabs],
  );

  const onOpenedOptionChange = useCallback(
    (itemId: string | number) =>
      setOpenedOptions((prev) =>
        prev.includes(itemId)
          ? prev.filter((id) => id !== itemId)
          : [...prev, itemId],
      ),
    [],
  );

  const SelectModalWrapper = useMemo(
    () => (!disablePortal ? Portal : React.Fragment),
    [disablePortal],
  );

  const data = useMemo(
    () =>
      initialData.map((item) => {
        if (
          !!item &&
          typeof item === 'object' &&
          item.type === 'collapse' &&
          item.id &&
          !item.disabled
        ) {
          const { onClick, ...rest } = item;

          const onOptionClick = () => {
            if (onClick) {
              onClick(item);
            }
            if (item.id) {
              onOpenedOptionChange(item.id);
            }
          };

          const open = openedOptions.includes(item.id);

          return {
            ...rest,
            open,
            onClick: onOptionClick,
          };
        }
        return item;
      }),
    [initialData, openedOptions, onOpenedOptionChange],
  );

  const hasOnSearch = !!onSearch;
  const filteredData = useMemo(
    () => (hasOnSearch ? data : filterData(data, deferredSearchValue)),
    [hasOnSearch, data, deferredSearchValue],
  );

  return (
    <SelectModalWrapper>
      <S.SelectModalStyled
        $isOpen={isOpen}
        $contentWidth={contentWidth}
        $disablePortal={disablePortal}
        $placement={placement}
        ref={selectModalRef}
        inert={!isOpen}
        style={{
          ...modalStyles,
          ...(x !== 0 && {
            ...(placement !== 'top-right' && {
              left: x,
            }),
            ...(placement === 'top-right' && {
              ...(typeof contentWidth === 'undefined' && {
                left: `calc(${x}px - ${width})`,
              }),
              ...(typeof contentWidth === 'number' && {
                left: `calc(${x}px - ${
                  contentWidth > width
                    ? `calc(var(--bothub-scale, 1) * ${contentWidth}px)`
                    : `${width}px`
                })`,
              }),
            }),
          }),
          ...(y !== 0 && {
            top: y,
          }),
          ...(typeof contentWidth === 'undefined' && {
            width,
          }),
          ...(typeof contentWidth === 'number' && {
            width:
              contentWidth > width
                ? `calc(var(--bothub-scale, 1) * ${contentWidth}px)`
                : width,
          }),
        }}
      >
        <S.SelectModalPositionWrapper
          $blur={blur}
          $placement={placement}
          $width={modalWidth}
          $compactWidth={compactWidth}
          style={{
            ...(typeof contentHeight === 'number' &&
              contentHeight >= 0 && {
                height: `calc(var(--bothub-scale, 1) * ${contentHeight}px)`,
              }),
            ...(typeof contentHeight === 'string' && {
              height: contentHeight,
            }),
          }}
        >
          <S.SelectModalContent>
            <S.SelectModalGroups $size={size}>
              {!!tabs && (
                <S.SelectModalTabsContainer>
                  <S.SelectModalTabs
                    {...tabs}
                    onClick={onTabClick}
                  />
                </S.SelectModalTabsContainer>
              )}
              {search && (
                <S.SelectModalSearch
                  startIcon={<SearchSimpleIcon />}
                  placeholder={searchPlaceholder}
                  value={searchValue}
                  onChange={handleSearchChange}
                  onClick={() => {
                    isKeyboardOpen.current = true;
                  }}
                  onBlur={() =>
                    setTimeout(() => {
                      isKeyboardOpen.current = false;
                    }, 500)
                  }
                />
              )}
              {!isContentMounted ? null : data.length > 0 ? (
                <SelectFieldGroup
                  scrollTop={scrollTop.current}
                  onScrollTopChange={handleScrollTopChange}
                  $size={size}
                  $disableScrollbar={disableScrollbar}
                  $followContentHeight={!!contentHeight}
                >
                  <SelectFieldOptions
                    value={value}
                    data={filteredData}
                    size={size}
                    disableSelect={disableSelect}
                    onGroupCheckboxClick={onGroupCheckboxClick}
                    onOptionClick={handleStableOptionClick}
                    selectedColor={selectedColor}
                  />
                </SelectFieldGroup>
              ) : (
                empty
              )}
              {isContentMounted && after && (
                <S.SelectModalAfter>
                  <SelectFieldOptions
                    value={value}
                    data={after}
                    size={size}
                    disableSelect={disableSelect}
                    onOptionClick={handleStableOptionClick}
                    selectedColor={selectedColor}
                  />
                </S.SelectModalAfter>
              )}
            </S.SelectModalGroups>
          </S.SelectModalContent>
        </S.SelectModalPositionWrapper>
      </S.SelectModalStyled>
    </SelectModalWrapper>
  );
};

export * from './styled';
export * from './option';
