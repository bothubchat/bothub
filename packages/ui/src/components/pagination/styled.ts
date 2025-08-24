import { css, styled } from 'styled-components';
import { getTypographyStyles } from '@/ui/components/typography/styled';
import { ArrowNarrowLeftIcon } from '@/ui/icons/arrow-narrow-left';
import { ArrowDownIcon } from '@/ui/icons';

export const Container = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 4px;
`;

export const PaginatorItem = styled.button.attrs<{
  $active?: boolean;
  $disabled?: boolean;
}>({
  type: 'button',
})`
  background: none;
  outline: none;
  border: none;
  ${getTypographyStyles('body-m-medium')};
  border-radius: 8px;
  padding: 6px 14px;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.base.white};
  ${({ $active }) =>
    $active &&
    css`
      background-color: ${({ theme }) => theme.colors.accent.primary};
    `}
  ${({ $disabled }) =>
    $disabled &&
    css`
      pointer-events: none;
    `}
`;

export const ControlButton = styled.button.attrs<{
  $disabled?: boolean;
}>({ type: 'button' })`
  background: none;
  outline: none;
  border: none;
  cursor: pointer;
  padding: 6px 10px;
  ${({ $disabled }) =>
    $disabled &&
    css`
      pointer-events: none;
    `}
`;

export const ArrowIcon = styled(ArrowNarrowLeftIcon)`
  position: relative;
  top: 2px;
`;

export const ArrowNextIcon = styled(ArrowIcon)`
  transform: rotate(180deg);
`;

export const ArrowCaretIcon = styled(ArrowDownIcon)`
  top: 2px;
  position: relative;
  transform: rotate(90deg);
`;

export const ArrowCaretNextIcon = styled(ArrowCaretIcon)`
  transform: rotate(-90deg);
`;
