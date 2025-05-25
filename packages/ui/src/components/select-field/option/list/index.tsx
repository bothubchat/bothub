import React, { useCallback } from 'react';
import {
  SelectFieldData,
  SelectFieldDataItem,
  SelectFieldSize
} from '@/ui/components/select-field/types';
import {
  SelectFieldDivider,
  SelectFieldEmpty,
  SelectFieldEmptyText,
  SelectFieldOptionLabel,
  SelectFieldOptionSide,
  SelectFieldOptionsStyled,
  SelectFieldRadio,
  SelectFieldRadioDescription,
  SelectFieldRadioLabel,
  SelectFieldRadioLabelWrapper,
  SelectFieldRadioTitleAndRadio
} from './styled';
import { Tooltip, TooltipConsumer } from '@/ui/components/tooltip';
import { IconProvider } from '@/ui/components/icon';
import { useTheme } from '@/ui/theme';
import { SelectFieldCollapseOption } from '../collapse';
import { SearchDataIcon } from '@/ui/icons/search-data';
import { Radio } from '@/ui/components/radio';
import {
  SelectFieldOptionStyled,
  SelectFieldOptionText
} from '../select-field-option/styled';
import { SelectFieldOption } from '../select-field-option';
import { StarsIcon } from '@/ui/icons';

export type SelectFieldOptionClickEventHandler = (
  item: SelectFieldDataItem
) => unknown;

export interface SelectFieldOptionsProps extends React.ComponentProps<'div'> {
  value: SelectFieldDataItem | SelectFieldDataItem[] | null;
  best_model?: boolean;
  data: SelectFieldData;
  size: SelectFieldSize;
  disableSelect?: boolean;
  onOptionClick?: SelectFieldOptionClickEventHandler;
}

export const SelectFieldOptions: React.FC<SelectFieldOptionsProps> = ({
  value,
  best_model,
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
            <SelectFieldOptionStyled
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
            </SelectFieldOptionStyled>
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
                      {item.icon && (
                        <IconProvider size={18}>{item.icon}</IconProvider>
                      )}
                      {item.label && (
                        <SelectFieldRadioLabelWrapper>
                          <SelectFieldRadioLabel>
                            {item.label}
                          </SelectFieldRadioLabel>
                          {best_model && <StarsIcon size={18} />}
                        </SelectFieldRadioLabelWrapper>
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

        const key = item.id ?? item.value ?? index;
        const props = {
          item,
          selected,
          disabled,
          size,
          onClick: handleOptionClick.bind(null, item)
        };

        return item.tooltip || (item.label && item.label.length > 64) ? (
          <Tooltip
            key={key}
            {...item.tooltip}
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
                  {...props}
                  onMouseEnter={handleTooltipMouseEnter}
                  onMouseLeave={handleTooltipMouseLeave}
                />
              )}
            </TooltipConsumer>
          </Tooltip>
        ) : (
          <SelectFieldOption
            key={key}
            {...props}
          />
        );
      })}
    </SelectFieldOptionsStyled>
  );
};
