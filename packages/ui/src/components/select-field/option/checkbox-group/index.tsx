import React, { useLayoutEffect, useState } from 'react';
import {
  SelectFieldDataItem,
  SelectFieldGroupCheckboxClickEventHandler,
  SelectFieldSize
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
  SelectFieldCheckboxGroupOptionHeadTextWrapper
} from './styled';

export interface SelectFieldCheckboxGroupOptionProps
  extends React.PropsWithChildren,
    Pick<
      React.ComponentProps<'div'>,
      | 'onMouseEnter'
      | 'onMouseLeave'
      | 'onPointerDown'
      | 'onPointerUp'
      | 'onPointerLeave'
    > {
  size: SelectFieldSize;
  item: SelectFieldDataItem;
  onGroupCheckboxClick?: SelectFieldGroupCheckboxClickEventHandler;
  icon?: React.ReactNode;
}

const MAX_VISIBLE_CHILDREN = 5;

export const SelectFieldCheckboxGroupOption = ({
  item,
  onGroupCheckboxClick,
  children,
  icon,
  ...props
}: SelectFieldCheckboxGroupOptionProps) => {
  const theme = useTheme();

  const [isOpen, setIsOpen] = useState(
    typeof item === 'string' ? false : (item.open ?? false)
  );
  const [showAll, setShowAll] = useState(false);

  const onCollapseClick = () => {
    setIsOpen((isOpen) => !isOpen);
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();

    if (onGroupCheckboxClick) {
      onGroupCheckboxClick(item);
    }
  };

  let isDisabled: boolean;
  if (typeof item === 'string') {
    isDisabled = false;
  } else {
    isDisabled = !!item.disabled;
  }

  useLayoutEffect(() => {
    if (typeof item !== 'string') {
      setIsOpen(Boolean(item.open));
    }
  }, [item]);

  const label = typeof item === 'string' ? item : (item.label ?? item.value);

  const checkedLength =
    typeof item === 'string'
      ? null
      : (() => {
          const selectedItems =
            item.data?.filter((el) => {
              if (typeof el === 'string') {
                return false;
              }
              return 'selected' in el && el.selected === true;
            }) ?? [];

          const totalItems =
            item.data?.filter((el) => typeof el !== 'string').length ?? 0;
          const selectedCount = selectedItems.length;

          if (selectedCount === 0) {
            return null;
          }

          if (selectedCount === totalItems && totalItems > 0) {
            return 'все';
          }

          return selectedCount;
        })();

  const childrenArray = React.Children.toArray(children);
  console.log(childrenArray);

  const totalChildren = childrenArray.length;
  const visibleChildren = showAll
    ? childrenArray
    : childrenArray.slice(0, MAX_VISIBLE_CHILDREN);
  const shouldShowMoreButton = totalChildren > MAX_VISIBLE_CHILDREN;
  const onShowMoreClick = () => {
    setShowAll((prev) => !prev);
  };

  return (
    <SelectFieldCheckboxGroupOptionStyled {...props}>
      <SelectFieldCheckboxGroupOptionHead
        $disabled={isDisabled}
        {...(!isDisabled && {
          onClick: onCollapseClick
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
              {`(${checkedLength})`}
            </SelectFieldCheckboxGroupOptionHeadCounter>
          </SelectFieldCheckboxGroupOptionHeadTextWrapper>
        </SelectFieldCheckboxGroupOptionHeadLeftSide>
        <SelectFieldCheckboxGroupOptionHeadRightSide>
          {icon || (
            <SelectFieldCheckboxGroupOptionArrow
              style={{
                transform: isOpen ? 'rotateZ(180deg)' : 'rotateZ(0deg)'
              }}
            />
          )}
          <Checkbox
            onChange={handleCheckboxChange}
            size={16}
          />
        </SelectFieldCheckboxGroupOptionHeadRightSide>
      </SelectFieldCheckboxGroupOptionHead>
      {isOpen && (
        <SelectFieldCheckboxGroupOptionContent>
          {visibleChildren}
          {shouldShowMoreButton}
          <ShowMoreButton onClick={onShowMoreClick}>
            {showAll ? 'hidden...' : 'showmore...'}
          </ShowMoreButton>
        </SelectFieldCheckboxGroupOptionContent>
      )}
    </SelectFieldCheckboxGroupOptionStyled>
  );
};
