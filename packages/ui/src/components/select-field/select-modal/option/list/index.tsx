import React, { memo, useCallback, useMemo } from 'react';
import {
  SelectFieldDataItem,
  SelectFieldDataItemComplex,
  SelectFieldSize,
  ValueType,
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
import { useEventCallback } from '@/ui/utils';
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
import {
  SelectFieldGroupCheckboxClickEventHandler,
  SelectFieldOptionClickEventHandler,
  SelectFieldOptionsProps,
} from '../types';
import {
  getSelectFieldItemKey,
  getSelectFieldSelectedKeys,
} from '../../../helpers';

const MAX_LABEL_LENGTH = 64;

const getLongLabel = (item: SelectFieldDataItemComplex): string | null =>
  typeof item.label === 'string' && item.label.length > MAX_LABEL_LENGTH
    ? item.label
    : null;

const hasOptionTooltip = (item: SelectFieldDataItemComplex): boolean =>
  !!item.tooltip || getLongLabel(item) !== null;

const getOptionTooltipProps = (item: SelectFieldDataItemComplex) => {
  const longLabel = getLongLabel(item);

  return {
    ...item.tooltip,
    ...(longLabel !== null && {
      placement: 'top-left' as const,
      label: longLabel,
      disabled: false,
    }),
  };
};

/*
 * Every option is a memoized component that gets the same click handler: the
 * clicked item is found by `data-index`. So rerendering the list (new value,
 * search, parent render) only rerenders the options whose props changed.
 */

interface SelectFieldStringOptionProps {
  item: string;
  index: number;
  selected: boolean;
  size: SelectFieldSize;
  selectedColor?: string;
  onClick: React.MouseEventHandler<HTMLElement>;
}

const SelectFieldStringOption = memo(
  ({
    item,
    index,
    selected,
    size,
    selectedColor,
    onClick,
  }: SelectFieldStringOptionProps) => (
    <SelectFieldOptionStyled
      $selected={selected}
      $disabled={false}
      $size={size}
      $selectedColor={selectedColor}
      data-test={item}
      data-index={index}
      onClick={onClick}
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
  ),
);

interface SelectFieldItemOptionProps {
  item: SelectFieldDataItemComplex;
  index: number;
  size: SelectFieldSize;
  onClick: React.MouseEventHandler<HTMLElement>;
}

const SelectFieldRadioOption = memo(
  ({ item, index, size, onClick }: SelectFieldItemOptionProps) => {
    if (hasOptionTooltip(item)) {
      return (
        <Tooltip {...getOptionTooltipProps(item)}>
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
                data-test={item.label}
                data-index={index}
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
      );
    }

    return (
      <SelectFieldRadio
        data-test={item.label}
        data-index={index}
        $selected={item.selected}
        $disabled={item.disabled}
        onClick={onClick}
      >
        <SelectFieldRadioTitleAndRadio>
          {typeof item.label === 'string' && item.label.length && (
            <SelectFieldRadioLabel $size={size}>
              {item.label}
            </SelectFieldRadioLabel>
          )}
          {typeof item.label !== 'string' && item.label}
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
      </SelectFieldRadio>
    );
  },
);

const SelectFieldCheckboxOption = memo(
  ({ item, index, onClick }: Omit<SelectFieldItemOptionProps, 'size'>) => {
    const theme = useTheme();
    const includeLabel = Boolean(item.label);

    return (
      <SelectFieldCheckBox
        data-index={index}
        onClick={onClick}
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
        {includeLabel && item.email && (
          <SelectFieldCheckBoxMail>{item.email}</SelectFieldCheckBoxMail>
        )}
      </SelectFieldCheckBox>
    );
  },
);

interface SelectFieldDefaultOptionProps extends SelectFieldItemOptionProps {
  selected: boolean;
  selectedColor?: string;
}

const SelectFieldDefaultOption = memo(
  ({
    item,
    index,
    selected,
    size,
    selectedColor,
    onClick,
  }: SelectFieldDefaultOptionProps) => {
    const disabled = !!item.disabled;

    if (hasOptionTooltip(item)) {
      return (
        <Tooltip {...getOptionTooltipProps(item)}>
          <TooltipConsumer>
            {({ handleTooltipMouseEnter, handleTooltipMouseLeave }) => (
              <SelectFieldOption
                item={item}
                selected={selected}
                disabled={disabled}
                size={size}
                selectedColor={selectedColor}
                onClick={onClick}
                onMouseEnter={handleTooltipMouseEnter}
                onMouseLeave={handleTooltipMouseLeave}
                data-test={item.label}
                data-index={index}
              />
            )}
          </TooltipConsumer>
        </Tooltip>
      );
    }

    return (
      <SelectFieldOption
        data-test={item.label}
        data-index={index}
        item={item}
        selected={selected}
        disabled={disabled}
        size={size}
        selectedColor={selectedColor}
        onClick={onClick}
      />
    );
  },
);

interface SelectFieldCollapseItemProps {
  item: SelectFieldDataItemComplex;
  value: ValueType;
  size: SelectFieldSize;
  disableSelect: boolean;
  selectedColor?: string;
  onGroupCheckboxClick?: SelectFieldGroupCheckboxClickEventHandler;
  onOptionClick?: SelectFieldOptionClickEventHandler;
}

const SelectFieldCollapseItem = memo(
  ({
    item,
    value,
    size,
    disableSelect,
    selectedColor,
    onGroupCheckboxClick,
    onOptionClick,
  }: SelectFieldCollapseItemProps) => {
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
          selectedColor={selectedColor}
          onGroupCheckboxClick={onGroupCheckboxClick}
          onOptionClick={onOptionClick}
        />
      ),
    };

    if (hasOptionTooltip(item)) {
      return (
        <Tooltip {...getOptionTooltipProps(item)}>
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
      );
    }

    return <SelectFieldCollapseOption {...props} />;
  },
);

const SelectFieldOptionsComponent = ({
  value,
  data,
  size,
  disableSelect = false,
  selectedColor,
  onGroupCheckboxClick,
  onOptionClick,
  ...props
}: SelectFieldOptionsProps) => {
  const theme = useTheme();

  const selectedKeys = useMemo(
    () => getSelectFieldSelectedKeys(value),
    [value],
  );

  const handleItemClick = useEventCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      const item: SelectFieldDataItem | undefined =
        data[Number(event.currentTarget.dataset.index)];

      if (item !== undefined) {
        onOptionClick?.(item);
      }
    },
  );

  const handleControlItemClick = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      handleItemClick(event);
    },
    [handleItemClick],
  );

  return (
    <SelectFieldOptionsStyled
      $size={size}
      {...props}
    >
      {data.map((item, index) => {
        if (typeof item === 'string') {
          return (
            <SelectFieldStringOption
              key={index}
              item={item}
              index={index}
              selected={selectedKeys.has(item)}
              size={size}
              selectedColor={selectedColor}
              onClick={handleItemClick}
            />
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
          return (
            <SelectFieldRadioOption
              key={item.id ?? item.value ?? `radio-${index}`}
              item={item}
              index={index}
              size={size}
              onClick={handleControlItemClick}
            />
          );
        }

        if (item.type === 'checkbox') {
          return (
            <SelectFieldCheckboxOption
              key={item.id ?? item.value ?? `checkbox-${index}`}
              item={item}
              index={index}
              onClick={handleControlItemClick}
            />
          );
        }

        if (item.type === 'collapse' && item.data) {
          return (
            <SelectFieldCollapseItem
              key={item.id ?? item.value ?? `collapse-${index}`}
              item={item}
              value={value}
              size={size}
              disableSelect={disableSelect}
              selectedColor={selectedColor}
              onGroupCheckboxClick={onGroupCheckboxClick}
              onOptionClick={onOptionClick}
            />
          );
        }

        if (item.type === 'checkbox-group' && item.data) {
          return (
            <SelectFieldCheckboxGroupOption
              key={item.id ?? item.value ?? `checkbox-group-${index}`}
              SelectFieldOptions={SelectFieldOptions}
              data={item.data}
              size={size}
              value={value}
              icon={item.disabled ? item.end : undefined}
              disableSelect={disableSelect}
              selectedColor={selectedColor}
              onGroupCheckboxClick={onGroupCheckboxClick}
              onOptionClick={onOptionClick}
              item={item}
            />
          );
        }

        return (
          <SelectFieldDefaultOption
            key={item.id ?? item.value ?? index}
            item={item}
            index={index}
            selected={
              selectedKeys.has(getSelectFieldItemKey(item)) && !disableSelect
            }
            size={size}
            selectedColor={selectedColor}
            onClick={handleItemClick}
          />
        );
      })}
    </SelectFieldOptionsStyled>
  );
};

export const SelectFieldOptions = memo(SelectFieldOptionsComponent);
