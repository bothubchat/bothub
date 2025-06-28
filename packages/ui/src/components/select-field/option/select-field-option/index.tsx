import { ComponentProps } from 'react';
import { IconProvider } from '@/ui/components/icon';
import { SelectFieldOptionSide } from '../list/styled';
import * as S from './styled';
import { SelectFieldDataItemComplex, SelectFieldSize } from '../../types';
import { useTheme } from '@/ui/theme';

export type SelectFieldOptionProps = {
  item: SelectFieldDataItemComplex;
  selected: boolean;
  disabled: boolean;
  size: SelectFieldSize;
  selectedColor?: string;
} & ComponentProps<'div'>;

export const SelectFieldOption = ({
  item,
  selected,
  disabled,
  size,
  selectedColor,
  ...rest
}: SelectFieldOptionProps) => {
  const theme = useTheme();

  return (
    <S.SelectFieldOptionStyled
      $selected={selected}
      $disabled={disabled}
      $size={size}
      $backgroundHoverColor={item.backgroundHoverColor}
      $selectedColor={selectedColor}
      {...rest}
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
          <S.SelectFieldOptionText
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
          </S.SelectFieldOptionText>
        )}
        {item.color && (
          <S.SelectFieldOptionColor
            $color={
              item.color === theme.colors.accent.primary && selected
                ? theme.colors.accent.primaryLight
                : item.color
            }
          />
        )}
        {item.color && (
          <S.SelectFieldColorOptionText $selected={selected}>
            {item.label && (
              <>
                {item.label.slice(0, 64)}
                {item.label.length > 64 && '...'}
              </>
            )}

            {!item.label && item.value}
          </S.SelectFieldColorOptionText>
        )}
      </SelectFieldOptionSide>
      {item.end && (
        <SelectFieldOptionSide>
          <IconProvider size={16}>{item.end}</IconProvider>
        </SelectFieldOptionSide>
      )}
    </S.SelectFieldOptionStyled>
  );
};
