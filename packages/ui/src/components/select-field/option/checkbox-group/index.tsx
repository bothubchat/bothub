import React, { useLayoutEffect, useState } from 'react';
import {
  SelectFieldDataItem,
  SelectFieldSize
} from '@/ui/components/select-field';
import { IconProvider } from '@/ui/components/icon';
import { useTheme } from '@/ui/theme';
import { Checkbox } from '@/ui/components/checkbox';
import { SelectFieldOptionClickEventHandler } from '../list';
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
  onClick?: SelectFieldOptionClickEventHandler;
  icon?: React.ReactNode;
}

export const SelectFieldCheckboxGroupOption = ({
  item,
  children,
  onClick,
  icon,
  ...props
}: SelectFieldCheckboxGroupOptionProps) => {
  const theme = useTheme();

  const [isOpen, setIsOpen] = useState(
    typeof item === 'string' ? false : (item.open ?? false)
  );
  // const [showAll, setShowAll] = useState(false);

  const onCollapseClick = () => {
    setIsOpen((isOpen) => !isOpen);

    if (onClick) {
      onClick(item);
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
              (19)
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
          <Checkbox size={16} />
        </SelectFieldCheckboxGroupOptionHeadRightSide>
      </SelectFieldCheckboxGroupOptionHead>
      {isOpen && (
        <SelectFieldCheckboxGroupOptionContent>
          {children}
          <ShowMoreButton>showmore...</ShowMoreButton>
        </SelectFieldCheckboxGroupOptionContent>
      )}
    </SelectFieldCheckboxGroupOptionStyled>
  );
};
