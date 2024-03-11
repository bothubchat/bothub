import React, { useCallback } from 'react';
import { SelectFieldData, SelectFieldDataItem, SelectFieldSize } from '@/ui/components/select-field/types';
import {
  SelectFieldColorOptionText, 
  SelectFieldDivider, 
  SelectFieldOption, 
  SelectFieldOptionColor, 
  SelectFieldOptionSide, 
  SelectFieldOptionText, 
  SelectFieldOptionsStyled 
} from './styled';
import { Tooltip, TooltipConsumer } from '@/ui/components/tooltip';
import { IconProvider } from '@/ui/components/icon';
import { useTheme } from '@/ui/theme';

export type SelectFieldOptionClickEventHandler = (item: SelectFieldDataItem) => unknown;

export interface SelectFieldOptionsProps extends React.ComponentProps<'div'> {
  value: SelectFieldDataItem;
  data: SelectFieldData;
  size: SelectFieldSize;
  disableSelect?: boolean;
  onOptionClick?: SelectFieldOptionClickEventHandler;
}

export const SelectFieldOptions: React.FC<SelectFieldOptionsProps> = ({
  value, data, size, disableSelect = false, onOptionClick, ...props
}) => {
  const theme = useTheme();

  const handleOptionClick = useCallback((item: SelectFieldDataItem) => {
    onOptionClick?.(item);
  }, [onOptionClick]);

  return (
    <SelectFieldOptionsStyled
      $size={size}
      {...props}
    >
      {data.map((item, index) => {
        if (typeof item === 'string') {
          const selected: boolean = typeof value === 'string' ? item === value : item === value.value;
  
          return (
            <SelectFieldOption
              $selected={selected}
              $disabled={false}
              $size={size}
              key={index}
              onClick={handleOptionClick.bind(null, item)}
            >
              <SelectFieldOptionSide>
                <SelectFieldOptionText
                  $selected={selected}
                  {...(size === 'small' && {
                    variant: 'input-sm'
                  })}
                  {...(size === 'md' && {
                    variant: 'button-sm'
                  })}
                >
                  {item}
                </SelectFieldOptionText>
              </SelectFieldOptionSide>
            </SelectFieldOption>
          );
        }
  
        if (item.type === 'divider') {
          return (
            <SelectFieldDivider
              key={`divider-${index}`}
            />
          );
        }
  
        const selected: boolean = (typeof value === 'string' ? item.value === value : item.value === value.value) && !disableSelect;
        const disabled: boolean = !!item.disabled;
  
        return (
          <Tooltip
            key={item.id ?? index}
            {...(typeof item.tooltip === 'object' && item.tooltip)}
            {...(typeof item.tooltip !== 'object' && {
              disabled: true
            })}
          >
            <TooltipConsumer>
              {({
                handleTooltipMouseEnter,
                handleTooltipMouseLeave
              }) => (
                <SelectFieldOption
                  $selected={selected}
                  $disabled={disabled}
                  $size={size}
                  onMouseEnter={handleTooltipMouseEnter}
                  onMouseLeave={handleTooltipMouseLeave}
                  onClick={handleOptionClick.bind(null, item)}
                >
                  <SelectFieldOptionSide>
                    {item.icon && (
                      <IconProvider
                        fill={theme.colors.base.white}
                        size={18}
                      >
                        {item.icon}
                      </IconProvider>
                    )}
                    {!item.color && (
                      <SelectFieldOptionText
                        $selected={selected}
                        {...(size === 'small' && {
                          variant: 'input-sm'
                        })}
                        {...(size === 'md' && {
                          variant: 'button-sm'
                        })}
                      >
                        {item.label ?? item.value}
                      </SelectFieldOptionText>
                    )}
                    {item.color && (
                      <SelectFieldOptionColor 
                        $color={
                          item.color === theme.colors.accent.primary && selected ? (
                            theme.colors.accent.primaryLight
                          ) : item.color
                        } 
                      />
                    )}
                    {item.color && (
                      <SelectFieldColorOptionText
                        $selected={selected}
                      >
                        {item.label ?? item.value}
                      </SelectFieldColorOptionText>
                    )}
                  </SelectFieldOptionSide>
                  {item.end && (
                    <SelectFieldOptionSide>
                      <IconProvider
                        size={16}
                      >
                        {item.end}
                      </IconProvider>
                    </SelectFieldOptionSide>
                  )}
                </SelectFieldOption>
              )}
            </TooltipConsumer>
          </Tooltip>
        );
      })}
    </SelectFieldOptionsStyled>
  );
};
