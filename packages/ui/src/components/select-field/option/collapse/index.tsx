import React, { useLayoutEffect, useState } from 'react';
import { SelectFieldDataItem, SelectFieldSize } from '@/ui/components/select-field';
import {
  SelectFieldCollapseOptionArrow,
  SelectFieldCollapseOptionBody, 
  SelectFieldCollapseOptionHead, 
  SelectFieldCollapseOptionHeadSide, 
  SelectFieldCollapseOptionStyled, 
  SelectFieldCollapseOptionText
} from './styled';
import { IconProvider } from '@/ui/components/icon';
import { useTheme } from '@/ui/theme';

export interface SelectFieldCollapseOptionProps extends React.PropsWithChildren {
  size: SelectFieldSize;
  item: SelectFieldDataItem;
}

export const SelectFieldCollapseOption: React.FC<SelectFieldCollapseOptionProps> = ({
  size, item, children
}) => {
  const theme = useTheme();

  const [isOpen, setIsOpen] = useState(
    typeof item === 'string' ? false : (item.open ?? false)
  );

  let isDisabled: boolean;
  if (typeof item === 'string') {
    isDisabled = false;
  } else {
    isDisabled = !!item.disabled;
  }

  if (typeof window !== 'undefined') {
    useLayoutEffect(() => {
      setIsOpen(typeof item === 'string' ? false : (item.open ?? false));
    }, [item]);
  }

  return (
    <SelectFieldCollapseOptionStyled
      $size={size}
    >
      <SelectFieldCollapseOptionHead
        $disabled={isDisabled}
        $size={size}
        {...(!isDisabled && {
          onClick: setIsOpen.bind(null, (isOpen) => !isOpen)
        })}
      >
        <SelectFieldCollapseOptionHeadSide
          $size={size}
        >
          {(typeof item === 'object' && item.icon) && (
            <IconProvider
              size={16}
              fill={theme.colors.base.white}
            >
              {item.icon}
            </IconProvider>
          )}
          <SelectFieldCollapseOptionText>
            {typeof item === 'string' && item}
            {typeof item !== 'string' && (
              item.label ?? item.value
            )}
          </SelectFieldCollapseOptionText>
        </SelectFieldCollapseOptionHeadSide>
        <SelectFieldCollapseOptionHeadSide
          $size={size}
        >
          <SelectFieldCollapseOptionArrow 
            style={{
              transform: isOpen ? 'rotateZ(180deg)' : 'rotateZ(0deg)'
            }}
          />
        </SelectFieldCollapseOptionHeadSide>
      </SelectFieldCollapseOptionHead>
      {isOpen && (
        <SelectFieldCollapseOptionBody>
          {children}
        </SelectFieldCollapseOptionBody>
      )}
    </SelectFieldCollapseOptionStyled>
  );
};
