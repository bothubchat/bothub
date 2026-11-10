import React, { useState } from 'react';
import {
  SelectFieldDataItem,
  SelectFieldSize,
} from '@/ui/components/select-field';
import {
  SelectFieldCollapseIconSide,
  SelectFieldCollapseOptionArrow,
  SelectFieldCollapseOptionBody,
  SelectFieldCollapseOptionHead,
  SelectFieldCollapseOptionHeadSide,
  SelectFieldCollapseOptionStyled,
  SelectFieldCollapseOptionText,
} from './styled';
import { IconProvider } from '@/ui/components/icon';
import { useTheme } from '@/ui/theme';
import { SelectFieldOptionClickEventHandler } from '../types';

export interface SelectFieldCollapseOptionProps
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

export const SelectFieldCollapseOption = ({
  size,
  item,
  children,
  onClick,
  icon,
  ...props
}: SelectFieldCollapseOptionProps) => {
  const theme = useTheme();

  const itemOpen = typeof item === 'string' ? undefined : item.open;

  const [isOpen, setIsOpen] = useState(itemOpen ?? false);
  // Follow `item.open` when it changes, without an extra effect commit.
  const [prevItemOpen, setPrevItemOpen] = useState(itemOpen);
  if (prevItemOpen !== itemOpen) {
    setPrevItemOpen(itemOpen);
    setIsOpen(Boolean(itemOpen));
  }

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

  const label = typeof item === 'string' ? item : (item.label ?? item.value);

  return (
    <SelectFieldCollapseOptionStyled
      {...props}
      $size={size}
      data-test={label}
    >
      <SelectFieldCollapseOptionHead
        $disabled={isDisabled}
        $size={size}
        {...(!isDisabled && {
          onClick: onCollapseClick,
        })}
      >
        <SelectFieldCollapseOptionHeadSide $size={size}>
          {typeof item === 'object' && item.icon && (
            <IconProvider
              size={size === 'large' ? 24 : 16}
              fill={theme.colors.base.white}
            >
              {item.icon}
            </IconProvider>
          )}
          {typeof label === 'string' && label && label.length && (
            <SelectFieldCollapseOptionText
              $size={size}
              $bold={typeof item === 'object' && item.bold}
            >
              {label}
            </SelectFieldCollapseOptionText>
          )}
          {typeof label !== 'string' && label && label}
        </SelectFieldCollapseOptionHeadSide>
        <SelectFieldCollapseIconSide $size={size}>
          {icon || (
            <SelectFieldCollapseOptionArrow
              style={{
                transform: isOpen ? 'rotateZ(180deg)' : 'rotateZ(0deg)',
              }}
            />
          )}
        </SelectFieldCollapseIconSide>
      </SelectFieldCollapseOptionHead>
      {isOpen && (
        <SelectFieldCollapseOptionBody>
          {children}
        </SelectFieldCollapseOptionBody>
      )}
    </SelectFieldCollapseOptionStyled>
  );
};
