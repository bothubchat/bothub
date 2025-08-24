import { css, styled } from 'styled-components';
import React from 'react';
import Slider, { SliderProps } from 'rc-slider';
import { Typography } from '@/ui/components/typography';
import { RangeFieldValue } from './types';
import { Skeleton } from '@/ui/components/skeleton';
import { adaptive } from '@/ui/adaptive';

export interface RangeFieldStyledProps {
  $fullWidth: boolean;
  $disabled: boolean;
}

export const RangeFieldStyled = styled.div<RangeFieldStyledProps>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  z-index: 1;
  ${({ $fullWidth }) =>
    !$fullWidth &&
    css`
      max-width: 240px;
    `}
  ${({ $disabled }) =>
    $disabled &&
    css`
      cursor: not-allowed;
    `}
  ${({ $disabled }) =>
    !$disabled &&
    css`
      cursor: default;
    `}
`;

export const RangeFieldLabel = styled(Typography).attrs({
  variant: 'input-sm',
})`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
  cursor: inherit;
  width: 100%;
`;

export const RangeFieldFormattedValue = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 14px 16px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.grayScale.gray2};
  background: ${({ theme }) => theme.colors.grayScale.gray4};
  font-size: 14px;
  line-height: 18px;
  font-weight: 400;
  width: 100%;
  color: ${({ theme }) => theme.colors.base.white};
  margin-bottom: 4px;
`;

export const RangeFieldRange: React.FC<
  SliderProps<RangeFieldValue> & RangeFieldRangeTrackProps
> = styled(Slider)`
  display: flex;
  align-items: center;
  width: 100%;
  height: 16px;
  position: relative;
  &:before {
    content: '';
    z-index: -1;
    position: absolute;
    top: 0;
    margin: auto;
    border-radius: 4px;
    background: ${({ theme }) => theme.colors.grayScale.gray3};
    height: 8px;
    width: 100%;
    left: 0;
    right: 0;
    bottom: 0;
  }
  border-radius: 4px;
  .custom-track {
    display: flex;
    border-radius: 4px 0 0 4px;
    height: 8px;
    background: ${({ theme, $disabled }) => {
      if (!$disabled) {
        return theme.colors.accent.primary;
      }
      return theme.colors.grayScale.gray1;
    }}};
    ${({ $disabled }) =>
      $disabled &&
      css`
        cursor: not-allowed;
      `}
    ${({ $disabled }) =>
      !$disabled &&
      css`
        cursor: pointer;
      `}
  }
`;

export const RangeFieldSkeleton = styled(Skeleton)`
  width: 100%;
  height: 16px;
`;

export interface RangeFieldRangeTrackProps {
  $disabled: boolean;
}

export interface RangeFieldRangeThumbProps {
  $disabled: boolean;
}

export const RangeFieldRangeThumb = styled.span<RangeFieldRangeThumbProps>`
  display: inline-flex;
  position: relative;
  flex-shrink: 0;
  border-radius: 50%;
  background: ${({ theme }) => theme.default.colors.base.white};
  outline: none;
  ${({ $disabled }) =>
    $disabled &&
    css`
      cursor: not-allowed;
    `}
  ${({ $disabled }) =>
    !$disabled &&
    css`
      cursor: pointer;
    `}
  ${adaptive({
    merge: true,
    desktop: css`
      width: 16px;
      height: 16px;
    `,
    tablet: css`
      width: 20px;
      height: 20px;
    `,
  })}
  ${({ theme }) =>
    theme.mode === 'light' &&
    css`
      box-shadow: 0px 0px 0px 1px ${theme.default.colors.grayScale.gray6};
    `}
`;

export const RangeFieldErrorText = styled(Typography).attrs({
  variant: 'input-sm',
})`
  display: inline-flex;
  margin-top: 8px;
  color: ${({ theme }) => theme.colors.critic};
`;
