import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import * as S from './styled';
import { SearchSimpleIcon } from '@/ui/icons';

import { Portal } from '@/ui/components/portal';
import { ScrollableTabsProps } from '@/ui/components/scrollable-tabs';

import { SelectFieldGroup } from './select-field-group';
import { SelectFieldOptions } from './option';
import { filterData } from './filterData';

import { UseSelectFieldReturnType } from '..';
import {
  ResetStyleStateType,
  SelectFieldData,
  SelectFieldDataItem,
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
  handleClose,
  setValue,
}: SelectModalProps) => {
  const [openedOptions, setOpenedOptions] = useState<(string | number)[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const scrollTop = useRef(0);

  const handleScrollTopChange = (value: number) => {
    scrollTop.current = value;
  };

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

      if (!disableSelect) {
        if (multiple && Array.isArray(value)) {
          setValue([...new Set([...value, item])]);
        } else {
          setValue(item);
        }
      }

      handleClose();
    },
    [value, multiple, disableSelect, setValue, onOptionClick, handleClose],
  );

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

  return (
    <SelectModalWrapper>
      <S.SelectModalStyled
        $isOpen={isOpen}
        $contentWidth={contentWidth}
        $disablePortal={disablePortal}
        $placement={placement}
        ref={selectModalRef}
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
              {data.length > 0 ? (
                <SelectFieldGroup
                  scrollTop={scrollTop.current}
                  onScrollTopChange={handleScrollTopChange}
                  $size={size}
                  $disableScrollbar={disableScrollbar}
                  $followContentHeight={!!contentHeight}
                >
                  <SelectFieldOptions
                    value={value}
                    data={onSearch ? data : filterData(data, searchValue)}
                    size={size}
                    disableSelect={disableSelect}
                    onOptionClick={handleOptionClick}
                    selectedColor={selectedColor}
                  />
                </SelectFieldGroup>
              ) : (
                empty
              )}
              {after && (
                <S.SelectModalAfter>
                  <SelectFieldOptions
                    value={value}
                    data={after}
                    size={size}
                    disableSelect={disableSelect}
                    onOptionClick={handleOptionClick}
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
