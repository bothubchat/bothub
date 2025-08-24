import React, { useCallback } from 'react';
import {
  SelectFieldData,
  SelectFieldDataItem,
  SelectFieldSize,
} from '@/ui/components/select-field/types';
import {
  SelectFieldCheckBox,
  SelectFieldCheckBoxLeftSide,
  SelectFieldCheckBoxMail,
  SelectFieldCheckBoxName,
  SelectFieldCheckBoxWrapper,
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
  SelectFieldRadioTitleAndRadio,
} from './styled';
import { Tooltip, TooltipConsumer } from '@/ui/components/tooltip';
import { IconProvider } from '@/ui/components/icon';
import { useTheme } from '@/ui/theme';
import { SelectFieldCollapseOption } from '../collapse';
import { SearchDataIcon } from '@/ui/icons/search-data';
import { Radio } from '@/ui/components/radio';
import {
  SelectFieldOptionStyled,
  SelectFieldOptionText,
} from '../select-field-option/styled';
import { SelectFieldOption } from '../select-field-option';
import { StarsIcon } from '@/ui/icons';
import { Checkbox } from '@/ui/components/checkbox';
import { SelectFieldCheckboxGroupOption } from '../checkbox-group';

export type SelectFieldOptionClickEventHandler = (
  item: SelectFieldDataItem,
) => unknown;

export type SelectFieldGroupCheckboxClickEventHandler = (
  item: SelectFieldDataItem,
) => unknown;

export interface SelectFieldOptionsProps extends React.ComponentProps<'div'> {
  value: SelectFieldDataItem | SelectFieldDataItem[] | null;
  data: SelectFieldData;
  size: SelectFieldSize;
  disableSelect?: boolean;
  selectedColor?: string;
  onGroupCheckboxClick?: SelectFieldGroupCheckboxClickEventHandler;
  onOptionClick?: SelectFieldOptionClickEventHandler;
}

export const SelectFieldOptions: React.FC<SelectFieldOptionsProps> = ({
  value,
  data,
  size,
  disableSelect = false,
  selectedColor,
  onGroupCheckboxClick,
  onOptionClick,
  ...props
}) => {
  const theme = useTheme();
  const handleOptionClick = useCallback(
    (item: SelectFieldDataItem) => {
      onOptionClick?.(item);
    },
    [onOptionClick],
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
              $selectedColor={selectedColor}
              key={index}
              data-test={item}
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

          const key = item.id ?? item.value ?? `radio-${index}`;
          const props = {
            $selected: item.selected,
            $disabled: item.disabled,
            onClick,
            children: (
              <>
                <SelectFieldRadioTitleAndRadio>
                  {item.label && (
                    <SelectFieldRadioLabel $size={size}>
                      {item.label}
                    </SelectFieldRadioLabel>
                  )}
                  <Radio
                    type="radio"
                    checked={item.selected ?? false}
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
              </>
            ),
          };

          return item.tooltip || (item.label && item.label.length > 64) ? (
            <Tooltip
              key={key}
              {...item.tooltip}
              {...(item.label &&
                item.label.length > 64 && {
                  placement: 'top-left',
                  label: item.label,
                  disabled: false,
                })}
            >
              <TooltipConsumer>
                {({ handleTooltipMouseEnter, handleTooltipMouseLeave }) => (
                  <SelectFieldRadio
                    {...props}
                    onPointerDown={handleTooltipMouseEnter}
                    onPointerLeave={handleTooltipMouseLeave}
                    onMouseEnter={handleTooltipMouseEnter}
                    onMouseLeave={handleTooltipMouseLeave}
                    onClick={onClick}
                    data-test={item.label}
                  >
                    <SelectFieldRadioTitleAndRadio>
                      {item.icon && (
                        <IconProvider size={size === 'large' ? 24 : 16}>
                          {item.icon}
                        </IconProvider>
                      )}
                      {item.label && (
                        <SelectFieldRadioLabelWrapper>
                          <SelectFieldRadioLabel $size={size}>
                            {item.label}
                          </SelectFieldRadioLabel>
                          {item.best_model && <StarsIcon size={18} />}
                        </SelectFieldRadioLabelWrapper>
                      )}
                      <Radio
                        type="radio"
                        checked={!!item.selected}
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
          ) : (
            <SelectFieldRadio
              key={key}
              data-test={item.label}
              {...props}
            />
          );
        }

        if (item.type === 'checkbox') {
          const onClick = (e: React.MouseEvent) => {
            e.preventDefault();
            handleOptionClick(item);
          };
          const key = item.id ?? item.value ?? `checkbox-${index}`;
          const includeLabel = Boolean(item.label);
          return (
            <SelectFieldCheckBox
              onClick={onClick}
              key={key}
            >
              <SelectFieldCheckBoxWrapper>
                <SelectFieldCheckBoxLeftSide>
                  {item.icon && (
                    <IconProvider
                      size={16}
                      fill={theme.colors.base.white}
                    >
                      {item.icon}
                    </IconProvider>
                  )}
                  <SelectFieldCheckBoxName>
                    {includeLabel ? item.label : item.email}
                  </SelectFieldCheckBoxName>
                </SelectFieldCheckBoxLeftSide>

                <Checkbox
                  displayFlex
                  checked={item.selected}
                  size={16}
                />
              </SelectFieldCheckBoxWrapper>
              {includeLabel && (
                <SelectFieldCheckBoxMail>{item.email}</SelectFieldCheckBoxMail>
              )}
            </SelectFieldCheckBox>
          );
        }
        if (item.type === 'collapse' && item.data) {
          const props = {
            size,
            item,
            onClick: item.onClick,
            icon: item.disabled ? item.end : undefined,
            children: (
              <SelectFieldOptions
                value={value}
                data={item.data ?? []}
                size={size}
                disableSelect={disableSelect}
                onOptionClick={onOptionClick}
                selectedColor={selectedColor}
              />
            ),
          };
          const key = item.id ?? item.value ?? `collapse-${index}`;

          return item.tooltip || (item.label && item.label.length > 64) ? (
            <Tooltip
              key={key}
              {...item.tooltip}
              {...(item.label &&
                item.label.length > 64 && {
                  placement: 'top-left',
                  label: item.label,
                  disabled: false,
                })}
            >
              <TooltipConsumer>
                {({ handleTooltipMouseEnter, handleTooltipMouseLeave }) => (
                  <SelectFieldCollapseOption
                    {...props}
                    onPointerDown={handleTooltipMouseEnter}
                    onPointerLeave={handleTooltipMouseLeave}
                    onMouseEnter={handleTooltipMouseEnter}
                    onMouseLeave={handleTooltipMouseLeave}
                  />
                )}
              </TooltipConsumer>
            </Tooltip>
          ) : (
            <SelectFieldCollapseOption
              key={key}
              {...props}
            />
          );
        }

        if (item.type === 'checkbox-group' && item.data) {
          const key = item.id ?? item.value ?? `checkbox-group-${index}`;
          return (
            <SelectFieldCheckboxGroupOption
              data={item.data ?? []}
              size={size}
              value={value}
              icon={item.disabled ? item.end : undefined}
              onGroupCheckboxClick={onGroupCheckboxClick}
              onOptionClick={onOptionClick}
              key={key}
              item={item}
            />
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
          selectedColor,
          onClick: handleOptionClick.bind(null, item),
        };

        return item.tooltip || (item.label && item.label.length > 64) ? (
          <Tooltip
            key={key}
            {...item.tooltip}
            {...(item.label &&
              item.label.length > 64 && {
                placement: 'top-left',
                label: item.label,
                disabled: false,
              })}
          >
            <TooltipConsumer>
              {({ handleTooltipMouseEnter, handleTooltipMouseLeave }) => (
                <SelectFieldOption
                  {...props}
                  onMouseEnter={handleTooltipMouseEnter}
                  onMouseLeave={handleTooltipMouseLeave}
                  data-test={item.label}
                />
              )}
            </TooltipConsumer>
          </Tooltip>
        ) : (
          <SelectFieldOption
            key={key}
            data-test={item.label}
            {...props}
          />
        );
      })}
    </SelectFieldOptionsStyled>
  );
};
