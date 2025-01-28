import React, { useCallback } from 'react';
import { SelectFieldData, SelectFieldDataItem, SelectFieldSize } from '@/ui/components/select-field/types';
import {
  SelectFieldColorOptionText,
  SelectFieldDivider,
  SelectFieldEmpty,
  SelectFieldEmptyText,
  SelectFieldOption,
  SelectFieldOptionColor,
  SelectFieldOptionSide,
  SelectFieldOptionText,
  SelectFieldOptionsStyled
} from './styled';
import { Tooltip, TooltipConsumer } from '@/ui/components/tooltip';
import { IconProvider } from '@/ui/components/icon';
import { useTheme } from '@/ui/theme';
import { SelectFieldCollapseOption } from '../collapse';
import { SearchDataIcon } from '@/ui/icons/search-data';

export type SelectFieldOptionClickEventHandler = (item: SelectFieldDataItem) => unknown;

export interface SelectFieldOptionsProps extends React.ComponentProps<'div'> {
  value: SelectFieldDataItem | SelectFieldDataItem[] | null;
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
          let selected: boolean;

          if (!value || Array.isArray(value)) {
            selected = false;
          } else {
            selected = typeof value === 'string' ? item === value : item === value.value;
          }

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
              key={item.id ?? item.value ?? `divider-${index}`}
            />
          );
        }

        if (item.type === 'empty' && item.label) {
          return (
            <SelectFieldEmpty
              $size={size}
              key={item.id ?? item.value ?? `empty-${index}`}
            >
              <IconProvider
                size={34}
                fill={theme.colors.grayScale.gray1}
              >
                {item.icon ?? <SearchDataIcon />}
              </IconProvider>
              <SelectFieldEmptyText>
                {item.label}
              </SelectFieldEmptyText>
            </SelectFieldEmpty>
          );
        }

        if (item.type === 'collapse' && item.data) {
          return (
            <SelectFieldCollapseOption
              key={item.id ?? item.value ?? `collapse-${index}`}
              size={size}
              item={item}
            >
              <SelectFieldOptions
                value={value}
                data={item.data}
                size={size}
                disableSelect={disableSelect}
                onOptionClick={onOptionClick}
              />
            </SelectFieldCollapseOption>
          );
        }

        const disabled: boolean = !!item.disabled;
        let selected: boolean;

        if (!value || Array.isArray(value)) {
          selected = false;
        } else {
          selected = (typeof value === 'string' ? item.value === value : item.value === value.value) && !disableSelect;
        }

        return (
          <Tooltip
            key={item.id ?? item.value ?? index}
            {...(typeof item.tooltip === 'object' && item.tooltip)}
            {...(typeof item.tooltip !== 'object' && {
              disabled: true
            })}
            {...((item.label && item.label.length > 64) && {
              placement: 'top-left',
              label: item.label,
              disabled: false
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
                  $backgroundHoverColor={item.backgroundPlanColor}
                  onMouseEnter={handleTooltipMouseEnter}
                  onMouseLeave={handleTooltipMouseLeave}
                  onClick={handleOptionClick.bind(null, item)}
                >
                  <SelectFieldOptionSide>
                    {item.icon && (
                      <IconProvider size={18}>
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
                        $bold={item.bold}
                      >
                        {item.label && (
                          <>
                            {item.label.slice(0, 64)}
                            {item.label.length > 64 && '...'}
                          </>
                        )}
                        {!item.label && item.value}
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
                        {item.label && (
                          <>
                            {item.label.slice(0, 64)}
                            {item.label.length > 64 && '...'}
                          </>
                        )}

                        {!item.label && item.value}
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
