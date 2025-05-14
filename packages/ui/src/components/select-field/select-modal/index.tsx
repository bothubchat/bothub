import { useCallback, useEffect, useState } from 'react';
import * as S from './styled';
import { Portal } from '../../portal';
import {
  ResetStyleStateType,
  SelectFieldData,
  SelectFieldDataItem,
  SelectFieldOptionClickEventHandler,
  SelectFieldSize
} from '../types';
import { SelectFieldGroup } from '../select-field-group';
import { SelectFieldOptions } from '../option';
import { filterData } from './filterData';
import { ITab } from '../../scrollable-tabs';
import { UseSelectFieldReturnType } from '..';
import { SearchSimpleIcon } from '@/ui/icons';

export type SelectModalGeneralProps = {
  data?: SelectFieldData;
  contentWidth?: number;
  size?: SelectFieldSize;
  disableSelect?: boolean;
  disableScrollbar?: boolean;
  before?: SelectFieldData;
  after?: SelectFieldData;
  tabs?: {
    tabs: ITab[];
    defaultTabId?: string;
    onTabClick?: (id: string | null) => void;
  };
  search?:
    | {
        icon?: React.ReactNode;
        onChange?: (value: string) => void;
      }
    | boolean;
  searchPlaceholder?: string;
  resetStyleState?: ResetStyleStateType;
  blur?: boolean;
  onOptionClick?: SelectFieldOptionClickEventHandler;
};

export type SelectModalProps = SelectModalGeneralProps &
  Omit<UseSelectFieldReturnType, 'disabled' | 'handleInputClick'>;

export const SelectModal = ({
  isOpen,
  data = [],
  contentWidth,
  size = 'small',
  disableSelect = false,
  disableScrollbar = false,
  before,
  after,
  tabs,
  search,
  searchPlaceholder,
  resetStyleState,
  placement,
  triggerRef,
  selectModalRef,
  blur = false,
  x,
  y,
  width,
  isKeyboardOpen,
  followContentHeight,
  blockHeight,
  value,
  multiple,
  onOptionClick,
  handleClose,
  setValue
}: SelectModalProps) => {
  const [modalMaxHeight, setModalMaxHeight] = useState<number | null>(null);
  const [openedOptions, setOpenedOptions] = useState<(string | number)[]>([]);
  const [scrollTop, setScrollTop] = useState([0, 0, 0]);
  const [searchValue, setSearchValue] = useState('');

  const handleScrollTopChange = (value: number, index: number) => {
    setScrollTop((prev) => prev.map((v, i) => (i === index ? value : v)));
  };

  const handleSearchChange = useCallback<
    React.ChangeEventHandler<HTMLInputElement>
  >(
    (event) => {
      const { value } = event.currentTarget;

      if (typeof search === 'object' && search.onChange) {
        search.onChange(value);
      } else {
        setSearchValue(value.trim());
      }
    },
    [setSearchValue]
  );

  const handleOptionClick = useCallback(
    (item: SelectFieldDataItem) => {
      if (typeof item === 'object' && item.disabled) {
        return;
      }

      if (typeof item === 'object' && item.noSelect) {
        item?.onClick?.(item);
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
    [value, setValue, multiple, onOptionClick, disableSelect]
  );

  const calculateMaxHeight = useCallback(() => {
    if (triggerRef.current && placement !== 'bottom-left' && isOpen) {
      const { top } = triggerRef.current.getBoundingClientRect();

      setModalMaxHeight(top - 20);
    } else {
      setTimeout(() => {
        setModalMaxHeight(null);
      }, 175);
    }
  }, [triggerRef.current, placement, isOpen]);

  useEffect(() => {
    calculateMaxHeight();

    window.addEventListener('resize', calculateMaxHeight);

    return () => window.removeEventListener('resize', calculateMaxHeight);
  }, [calculateMaxHeight]);

  useEffect(() => {
    setOpenedOptions([]);
    setScrollTop([0, 0, 0]);
    setSearchValue('');
  }, [resetStyleState]);

  const onTabClick = useCallback(
    (id: string | null) => {
      setScrollTop([0, 0, 0]);
      setOpenedOptions([]);

      if (tabs && tabs.onTabClick) {
        tabs.onTabClick(id);
      }
    },
    [tabs, setScrollTop]
  );

  const onOpenedOptionChange = useCallback(
    (itemId: string | number) =>
      setOpenedOptions((prev) =>
        prev.includes(itemId)
          ? prev.filter((id) => id !== itemId)
          : [...prev, itemId]
      ),
    [openedOptions]
  );

  data = data.map((item) => {
    if (
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
        ...(open && {
          open
        }),
        onClick: onOptionClick
      };
    }

    return item;
  });

  return (
    <Portal>
      <S.SelectModalStyled
        $isOpen={isOpen}
        $contentWidth={contentWidth}
        ref={selectModalRef}
        style={{
          ...(x !== 0 && {
            ...(placement !== 'top-right' && {
              left: `${x}px`
            }),
            ...(placement === 'top-right' && {
              ...(typeof contentWidth === 'undefined' && {
                left: `calc(${x}px - ${width})`
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
        <S.SelectModalPositionWrapper
          $blur={blur}
          $placement={placement}
          style={{
            ...(followContentHeight && blockHeight && { height: blockHeight }),
            ...(modalMaxHeight && {
              maxHeight: modalMaxHeight
            })
          }}
        >
          <S.SelectModalContent>
            <S.SelectModalGroups $size={size}>
              {!!tabs && (
                <S.SelectModalTabsContainer>
                  <S.SelectModalTabs
                    tabs={tabs.tabs}
                    component="button"
                    onClick={onTabClick}
                    defaultTabId={tabs.defaultTabId}
                  />
                </S.SelectModalTabsContainer>
              )}
              {search && (
                <S.SelectModalSearch
                  startIcon={
                    (typeof search === 'object' && search.icon) || (
                      <SearchSimpleIcon />
                    )
                  }
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
              {before && (
                <SelectFieldGroup
                  scrollTop={scrollTop[0]}
                  onScrollTopChange={(val) => handleScrollTopChange(val, 0)}
                  $size={size}
                  $disableScrollbar={disableScrollbar}
                  $followContentHeight={!!blockHeight}
                >
                  <SelectFieldOptions
                    value={value}
                    data={filterData(before, searchValue)}
                    size={size}
                    disableSelect={disableSelect}
                    onOptionClick={handleOptionClick}
                  />
                </SelectFieldGroup>
              )}
              <SelectFieldGroup
                scrollTop={scrollTop[1]}
                onScrollTopChange={(val) => handleScrollTopChange(val, 1)}
                $size={size}
                $disableScrollbar={disableScrollbar}
                $followContentHeight={!!blockHeight}
              >
                <SelectFieldOptions
                  value={value}
                  data={filterData(data, searchValue)}
                  size={size}
                  disableSelect={disableSelect}
                  onOptionClick={handleOptionClick}
                />
              </SelectFieldGroup>
              {after && (
                <SelectFieldGroup
                  scrollTop={scrollTop[2]}
                  onScrollTopChange={(val) => handleScrollTopChange(val, 2)}
                  $size={size}
                  $disableScrollbar={disableScrollbar}
                  $followContentHeight={!!blockHeight}
                >
                  <SelectFieldOptions
                    value={value}
                    data={filterData(after, searchValue)}
                    size={size}
                    disableSelect={disableSelect}
                    onOptionClick={handleOptionClick}
                  />
                </SelectFieldGroup>
              )}
            </S.SelectModalGroups>
          </S.SelectModalContent>
        </S.SelectModalPositionWrapper>
      </S.SelectModalStyled>
    </Portal>
  );
};

export * from './styled';
