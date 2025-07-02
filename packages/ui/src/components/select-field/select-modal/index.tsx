import { useCallback, useEffect, useRef, useState } from 'react';
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
import { ScrollableTabsProps } from '../../scrollable-tabs';
import { UseSelectFieldReturnType } from '..';
import { SearchSimpleIcon } from '@/ui/icons';

export type SelectModalGeneralProps = {
  data?: SelectFieldData;
  contentWidth?: number;
  contentHeight?: number;
  size?: SelectFieldSize;
  disableSelect?: boolean;
  disableScrollbar?: boolean;
  before?: SelectFieldData;
  after?: SelectFieldData;
  tabs?: Omit<ScrollableTabsProps, 'variant' | 'component'>;
  search?: boolean;
  searchPlaceholder?: string;
  resetStyleState?: ResetStyleStateType;
  blur?: boolean;
  modalWidth?: string;
  openedModel?: string;
  selectedColor?: string;
  compactWidth?: boolean;
  onOptionClick?: SelectFieldOptionClickEventHandler;
};

export type SelectModalProps = SelectModalGeneralProps &
  Omit<
    UseSelectFieldReturnType,
    'disabled' | 'handleInputClick' | 'maxHeight' | 'triggerRef'
  >;

export const SelectModal = ({
  isOpen,
  data = [],
  contentWidth,
  contentHeight,
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
  selectModalRef,
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
  onOptionClick,
  handleClose,
  setValue
}: SelectModalProps) => {
  const [openedOptions, setOpenedOptions] = useState<(string | number)[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const scrollTop = useRef([0, 0, 0]);

  const handleScrollTopChange = (value: number, index: number) => {
    scrollTop.current = scrollTop.current.map((v, i) =>
      i === index ? value : v
    );
  };

  const handleSearchChange = useCallback<
    React.ChangeEventHandler<HTMLInputElement>
  >(
    (event) => {
      const { value } = event.currentTarget;

      setSearchValue(value.trim());
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

  useEffect(() => {
    setOpenedOptions(openedModel ? [openedModel] : []);
    scrollTop.current = [0, 0, 0];
    setSearchValue('');
  }, [resetStyleState, openedModel]);

  const onTabClick = useCallback(
    (id: string | null) => {
      scrollTop.current = [0, 0, 0];
      setOpenedOptions([]);

      if (tabs && tabs.onClick) {
        tabs.onClick(id);
      }
    },
    [tabs]
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
              left: x
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
            top: y
          }),
          ...(typeof contentWidth === 'undefined' && {
            width
          }),
          ...(typeof contentWidth === 'number' && {
            width:
              contentWidth > width
                ? `calc(var(--bothub-scale, 1) * ${contentWidth}px)`
                : width
          })
        }}
      >
        <S.SelectModalPositionWrapper
          $blur={blur}
          $placement={placement}
          $width={modalWidth}
          $compactWidth={compactWidth}
          style={{
            height: contentHeight
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
              {before && (
                <SelectFieldGroup
                  scrollTop={scrollTop.current[0]}
                  onScrollTopChange={(val) => handleScrollTopChange(val, 0)}
                  $size={size}
                  $disableScrollbar={disableScrollbar}
                  $followContentHeight={!!contentHeight}
                >
                  <SelectFieldOptions
                    value={value}
                    data={filterData(before, searchValue)}
                    size={size}
                    disableSelect={disableSelect}
                    onOptionClick={handleOptionClick}
                    selectedColor={selectedColor}
                  />
                </SelectFieldGroup>
              )}
              <SelectFieldGroup
                scrollTop={scrollTop.current[1]}
                onScrollTopChange={(val) => handleScrollTopChange(val, 1)}
                $size={size}
                $disableScrollbar={disableScrollbar}
                $followContentHeight={!!contentHeight}
              >
                <SelectFieldOptions
                  value={value}
                  data={filterData(data, searchValue)}
                  size={size}
                  disableSelect={disableSelect}
                  onOptionClick={handleOptionClick}
                  selectedColor={selectedColor}
                />
              </SelectFieldGroup>
              {after && (
                <SelectFieldGroup
                  scrollTop={scrollTop.current[2]}
                  onScrollTopChange={(val) => handleScrollTopChange(val, 2)}
                  $size={size}
                  $disableScrollbar={disableScrollbar}
                  $followContentHeight={!!contentHeight}
                >
                  <SelectFieldOptions
                    value={value}
                    data={filterData(after, searchValue)}
                    size={size}
                    disableSelect={disableSelect}
                    onOptionClick={handleOptionClick}
                    selectedColor={selectedColor}
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
