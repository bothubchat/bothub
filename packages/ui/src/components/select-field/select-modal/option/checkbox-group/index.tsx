import React, { memo, useState } from 'react';
import {
  SelectFieldDataItem,
  SelectFieldGroupCheckboxClickEventHandler,
  SelectFieldSize,
} from '@/ui/components/select-field';
import { IconProvider } from '@/ui/components/icon';
import { useTheme } from '@/ui/theme';
import { Checkbox } from '@/ui/components/checkbox';
import {
  SelectFieldCheckboxGroupOptionHead,
  SelectFieldCheckboxGroupOptionHeadLeftSide,
  SelectFieldCheckboxGroupOptionHeadText,
  SelectFieldCheckboxGroupOptionHeadCounter,
  SelectFieldCheckboxGroupOptionHeadRightSide,
  SelectFieldCheckboxGroupOptionArrow,
  SelectFieldCheckboxGroupOptionContent,
  SelectFieldCheckboxGroupOptionStyled,
  ShowMoreButton,
  SelectFieldCheckboxGroupOptionHeadTextWrapper,
} from './styled';
import {
  SelectFieldOptionClickEventHandler,
  SelectFieldOptionsProps,
} from '../types';

const MAX_SHOW_ONCE = 5;

export type SelectFieldCheckboxGroupOptionProps = {
  value: SelectFieldDataItem | SelectFieldDataItem[] | null;
  size: SelectFieldSize;
  item: SelectFieldDataItem;
  data: SelectFieldDataItem[];
  onGroupCheckboxClick?: SelectFieldGroupCheckboxClickEventHandler;
  onOptionClick: SelectFieldOptionClickEventHandler | undefined;
  icon?: React.ReactNode;
  disableSelect?: boolean;
  selectedColor?: string;
  SelectFieldOptions: React.ComponentType<SelectFieldOptionsProps>;
};

const SelectFieldCheckboxGroupOptionComponent = ({
  item,
  value,
  size,
  data,
  onOptionClick,
  onGroupCheckboxClick,
  icon,
  disableSelect,
  selectedColor,
  SelectFieldOptions,
}: SelectFieldCheckboxGroupOptionProps) => {
  const theme = useTheme();

  const itemOpen = typeof item !== 'string' ? item.open : undefined;

  const [showAll, setShowAll] = useState(false);
  const [isOpen, setIsOpen] = useState(itemOpen ?? false);
  // Follow `item.open` when it changes, without an extra effect commit.
  const [prevItemOpen, setPrevItemOpen] = useState(itemOpen);
  if (prevItemOpen !== itemOpen) {
    setPrevItemOpen(itemOpen);
    setIsOpen(Boolean(itemOpen));
  }

  const handleShowAll = () => {
    setShowAll((prev) => !prev);
  };

  const onCollapseClick = () => {
    setIsOpen((isOpen) => !isOpen);
  };

  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onGroupCheckboxClick?.(item);
  };

  let isDisabled: boolean;
  if (typeof item === 'string') {
    isDisabled = false;
  } else {
    isDisabled = !!item.disabled;
  }

  const label = typeof item === 'string' ? item : (item.label ?? item.value);

  const shouldShow = data.length > MAX_SHOW_ONCE;
  const visibleData = showAll ? data : data.slice(0, MAX_SHOW_ONCE);

  const getSelectedText = () => {
    if (!data || data.length === 0) {
      return null;
    }

    const selectableItems = data.filter((item) => typeof item !== 'string');
    const selectedItems = selectableItems.filter(
      (item) => 'selected' in item && item.selected === true,
    );

    const selectedCount = selectedItems.length;
    const totalCount = selectableItems.length;

    if (selectedCount === 0) {
      return null;
    }

    if (selectedCount === totalCount && totalCount > 0) {
      return 'все';
    }

    return selectedCount;
  };
  const isChecked =
    typeof item !== 'string' && 'selected' in item ? item.selected : false;

  const checkedIcon =
    typeof item !== 'string' && 'checkedIcon' in item
      ? item.checkedIcon
      : false;

  return (
    <SelectFieldCheckboxGroupOptionStyled>
      <SelectFieldCheckboxGroupOptionHead
        $disabled={isDisabled}
        {...(!isDisabled && {
          onClick: onCollapseClick,
        })}
      >
        <SelectFieldCheckboxGroupOptionHeadLeftSide>
          {typeof item === 'object' && item.icon && (
            <IconProvider
              size={16}
              fill={theme.colors.base.white}
            >
              {item.icon}
            </IconProvider>
          )}
          <SelectFieldCheckboxGroupOptionHeadTextWrapper>
            <SelectFieldCheckboxGroupOptionHeadText>
              {label}
            </SelectFieldCheckboxGroupOptionHeadText>
            <SelectFieldCheckboxGroupOptionHeadCounter>
              {getSelectedText() !== null && `(${getSelectedText()})`}
            </SelectFieldCheckboxGroupOptionHeadCounter>
          </SelectFieldCheckboxGroupOptionHeadTextWrapper>
        </SelectFieldCheckboxGroupOptionHeadLeftSide>
        <SelectFieldCheckboxGroupOptionHeadRightSide>
          {icon || (
            <SelectFieldCheckboxGroupOptionArrow
              style={{
                transform: isOpen ? 'rotateZ(180deg)' : 'rotateZ(0deg)',
              }}
            />
          )}
          <div onClick={handleCheckboxClick}>
            <Checkbox
              preventScrollOnFocus
              displayFlex
              checkedIcon={checkedIcon}
              checked={isChecked}
              size={16}
            />
          </div>
        </SelectFieldCheckboxGroupOptionHeadRightSide>
      </SelectFieldCheckboxGroupOptionHead>
      {isOpen && (
        <SelectFieldCheckboxGroupOptionContent>
          <SelectFieldOptions
            value={value}
            data={visibleData}
            size={size}
            disableSelect={disableSelect}
            selectedColor={selectedColor}
            onGroupCheckboxClick={onGroupCheckboxClick}
            onOptionClick={onOptionClick}
          />
          {shouldShow && (
            <ShowMoreButton onClick={handleShowAll}>
              {showAll ? `Скрыть ` : `Показать `}
            </ShowMoreButton>
          )}
        </SelectFieldCheckboxGroupOptionContent>
      )}
    </SelectFieldCheckboxGroupOptionStyled>
  );
};

export const SelectFieldCheckboxGroupOption = memo(
  SelectFieldCheckboxGroupOptionComponent,
);
