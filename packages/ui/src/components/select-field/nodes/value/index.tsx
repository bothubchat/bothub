import React from 'react';

import * as S from '../../styled';
import { IconProvider } from '@/ui/components/icon';
import { Tooltip, TooltipConsumer } from '@/ui/components/tooltip';
import { useTheme } from '@/ui/theme';

import { SelectFieldDataItem, ValueType } from '../../types';

export interface SelectFieldInputValueProps {
  value: ValueType;
  handleValueDelete: (
    item: SelectFieldDataItem,
    event: React.MouseEvent,
  ) => unknown;
}

export const SelectFieldInputValue: React.FC<SelectFieldInputValueProps> = ({
  value,
  handleValueDelete,
}) => {
  const theme = useTheme();

  if (!value || !['string', 'object'].includes(typeof value)) return null;

  if (typeof value === 'string') {
    return (
      <S.SelectFieldValue>
        <S.SelectFieldValueText>{value}</S.SelectFieldValueText>
      </S.SelectFieldValue>
    );
  }

  if (Array.isArray(value)) {
    return (
      <S.SelectFieldValues>
        <S.SelectFieldValueList>
          {value.map((item, index) => {
            if (typeof item === 'string') {
              return (
                <S.SelectFieldValueListItem
                  key={item}
                  onDelete={handleValueDelete.bind(null, item)}
                >
                  {item}
                </S.SelectFieldValueListItem>
              );
            }

            return (
              <S.SelectFieldValueListItem
                key={item.id ?? item.value ?? index}
                onDelete={handleValueDelete.bind(null, item)}
              >
                {item.label ?? item.value}
              </S.SelectFieldValueListItem>
            );
          })}
        </S.SelectFieldValueList>
      </S.SelectFieldValues>
    );
  }

  return (
    <S.SelectFieldValue>
      {value.icon && (
        <IconProvider
          fill={theme.colors.base.white}
          size={18}
        >
          {value.icon}
        </IconProvider>
      )}
      {value.color && <S.SelectFieldValueColor $color={value.color} />}
      {value.label && (
        <Tooltip
          label={value.label}
          placement="top-left"
          disabled={value.label.length <= 128}
        >
          <TooltipConsumer>
            {({ handleTooltipMouseEnter, handleTooltipMouseLeave }) => (
              <S.SelectFieldColorValueText
                onMouseEnter={handleTooltipMouseEnter}
                onMouseLeave={handleTooltipMouseLeave}
              >
                {value.label}
              </S.SelectFieldColorValueText>
            )}
          </TooltipConsumer>
        </Tooltip>
      )}
      {!value.label && value.value && (
        <S.SelectFieldColorValueText>{value.value}</S.SelectFieldColorValueText>
      )}
    </S.SelectFieldValue>
  );
};
