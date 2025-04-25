import React, { useCallback } from 'react';
import {
  SelectFieldData,
  SelectFieldDataItem,
  SelectFieldSize
} from '@/ui/components/select-field/types';
import {
  SelectFieldColorOptionText,
  SelectFieldDivider,
  SelectFieldEmpty,
  SelectFieldEmptyText,
  SelectFieldOption,
  SelectFieldOptionColor,
  SelectFieldOptionLabel,
  SelectFieldOptionSide,
  SelectFieldOptionText,
  SelectFieldOptionsStyled,
  SelectFieldRadio,
  SelectFieldRadioDescription,
  SelectFieldRadioLabel,
  SelectFieldRadioTitleAndRadio
} from './styled';
import { Tooltip, TooltipConsumer } from '@/ui/components/tooltip';
import { IconProvider } from '@/ui/components/icon';
import { useTheme } from '@/ui/theme';
import { SelectFieldCollapseOption } from '../collapse';
import { SearchDataIcon } from '@/ui/icons/search-data';
import { Radio } from '@/ui/components/radio';

export type SelectFieldOptionClickEventHandler = (
  item: SelectFieldDataItem
) => unknown;

export interface SelectFieldOptionsProps extends React.ComponentProps<'div'> {
  value: SelectFieldDataItem | SelectFieldDataItem[] | null;
  data: SelectFieldData;
  size: SelectFieldSize;
  disableSelect?: boolean;
  onOptionClick?: SelectFieldOptionClickEventHandler;
}

export const SelectFieldOptions: React.FC<SelectFieldOptionsProps> = ({
  value,
  data,
  size,
  disableSelect = false,
  onOptionClick,
  ...props
}) => {
  const theme = useTheme();

  const handleOptionClick = useCallback(
    (item: SelectFieldDataItem) => {
      onOptionClick?.(item);
    },
    [onOptionClick]
  );

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
            selected =
              typeof value === 'string' ? item === value : item === value.value;
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
                  $size={size}
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

        if (item.type === 'label') {
          return (
            <SelectFieldOptionLabel
              key={item.id ?? item.value ?? `label-${index}`}
            >
              {item.label}
            </SelectFieldOptionLabel>
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
              <SelectFieldEmptyText>{item.label}</SelectFieldEmptyText>
            </SelectFieldEmpty>
          );
        }

        if (item.type === 'radio') {
          const onClick = (e: React.MouseEvent) => {
            e.preventDefault();

            handleOptionClick(item);
          };

          return (
            <Tooltip
              key={item.id ?? item.value ?? `radio-${index}`}
              {...(typeof item.tooltip === 'object' && item.tooltip)}
              {...(typeof item.tooltip !== 'object' && {
                disabled: true
              })}
              {...(item.label &&
                item.label.length > 64 && {
                  placement: 'top-left',
                  label: item.label,
                  disabled: false
                })}
            >
              <TooltipConsumer>
                {({ handleTooltipMouseEnter, handleTooltipMouseLeave }) => (
                  <SelectFieldRadio
                    $selected={item.selected}
                    $disabled={item.disabled}
                    onPointerDown={handleTooltipMouseEnter}
                    onPointerLeave={handleTooltipMouseLeave}
                    onMouseEnter={handleTooltipMouseEnter}
                    onMouseLeave={handleTooltipMouseLeave}
                    onClick={onClick}
                  >
                    <SelectFieldRadioTitleAndRadio>
                      {item.label && (
                        <SelectFieldRadioLabel>
                          {item.label}
                        </SelectFieldRadioLabel>
                      )}
                      <Radio
                        type="radio"
                        checked={item.selected}
                        name={item.radioName}
                        disabled={item.disabled}
                        icon={item.disabled ? item.end : undefined}
                      />
                    </SelectFieldRadioTitleAndRadio>

                    {item.description && (
                      <SelectFieldRadioDescription>
                        {item.description}
                      </SelectFieldRadioDescription>
                    )}
                  </SelectFieldRadio>
                )}
              </TooltipConsumer>
            </Tooltip>
          );
        }

        if (item.type === 'collapse' && item.data) {
          return (
            <Tooltip
              key={item.id ?? item.value ?? `collapse-${index}`}
              {...(typeof item.tooltip === 'object' && item.tooltip)}
              {...(typeof item.tooltip !== 'object' && {
                disabled: true
              })}
              {...(item.label &&
                item.label.length > 64 && {
                  placement: 'top-left',
                  label: item.label,
                  disabled: false
                })}
            >
              <TooltipConsumer>
                {({ handleTooltipMouseEnter, handleTooltipMouseLeave }) => (
                  <SelectFieldCollapseOption
                    size={size}
                    item={item}
                    onPointerDown={handleTooltipMouseEnter}
                    onPointerLeave={handleTooltipMouseLeave}
                    onMouseEnter={handleTooltipMouseEnter}
                    onMouseLeave={handleTooltipMouseLeave}
                    onClick={item.onClick}
                    icon={item.disabled ? item.end : undefined}
                  >
                    <SelectFieldOptions
                      value={value}
                      data={item.data ?? []}
                      size={size}
                      disableSelect={disableSelect}
                      onOptionClick={onOptionClick}
                    />
                  </SelectFieldCollapseOption>
                )}
              </TooltipConsumer>
            </Tooltip>
          );
        }

        const disabled: boolean = !!item.disabled;
        let selected: boolean;

        if (!value || Array.isArray(value)) {
          selected = false;
        } else {
          selected =
            (typeof value === 'string'
              ? item.value === value
              : item.value === value.value) && !disableSelect;
        }

        return (
          <Tooltip
            key={item.id ?? item.value ?? index}
            {...(typeof item.tooltip === 'object' && item.tooltip)}
            {...(typeof item.tooltip !== 'object' && {
              disabled: true
            })}
            {...(item.label &&
              item.label.length > 64 && {
                placement: 'top-left',
                label: item.label,
                disabled: false
              })}
          >
            <TooltipConsumer>
              {({ handleTooltipMouseEnter, handleTooltipMouseLeave }) => (
                <SelectFieldOption
                  $selected={selected}
                  $disabled={disabled}
                  $size={size}
                  $backgroundHoverColor={item.backgroundHoverColor}
                  onPointerDown={handleTooltipMouseEnter}
                  onPointerLeave={handleTooltipMouseLeave}
                  onMouseEnter={handleTooltipMouseEnter}
                  onMouseLeave={handleTooltipMouseLeave}
                  onClick={handleOptionClick.bind(null, item)}
                >
                  <SelectFieldOptionSide>
                    {item.icon && (
                      <IconProvider
                        fill={theme.colors.base.white}
                        size={size === 'large' ? 24 : 18}
                      >
                        {item.icon}
                      </IconProvider>
                    )}
                    {!item.color && (
                      <SelectFieldOptionText
                        $selected={selected}
                        $size={size}
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
                          item.color === theme.colors.accent.primary && selected
                            ? theme.colors.accent.primaryLight
                            : item.color
                        }
                      />
                    )}
                    {item.color && (
                      <SelectFieldColorOptionText $selected={selected}>
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
                      <IconProvider size={16}>{item.end}</IconProvider>
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
