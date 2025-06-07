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
  contentHeight?: number;
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
  search?: boolean;
  searchPlaceholder?: string;
  resetStyleState?: ResetStyleStateType;
  blur?: boolean;
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
  onOptionClick,
  handleClose,
  setValue
}: SelectModalProps) => {
  const [searchValue, setSearchValue] = useState('');

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
    setSearchValue('');
  }, [resetStyleState]);

  const onTabClick = useCallback(
    (id: string | null) => {
      if (tabs && tabs.onTabClick) {
        tabs.onTabClick(id);
      }
    },
    [tabs]
  );

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
          style={{
            ...(contentHeight && {
              maxHeight: `calc(var(--bothub-scale, 1) * ${contentHeight}px)`
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
                  />
                </SelectFieldGroup>
              )}
              <SelectFieldGroup
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
                />
              </SelectFieldGroup>
              {after && (
                <SelectFieldGroup
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
