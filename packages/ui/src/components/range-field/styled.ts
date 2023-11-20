import { css, styled } from 'styled-components';
import ReactSlider, { ReactSliderProps } from 'react-slider';
import React from 'react';
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
  ${({ $fullWidth }) => !$fullWidth && css`
    max-width: 240px;
  `}
  ${({ $disabled }) => $disabled && css`
    cursor: not-allowed;
  `}
  ${({ $disabled }) => !$disabled && css`
    cursor: default;
  `}
`;

export const RangeFieldLabel = styled(Typography).attrs({ variant: 'input-sm' })`
  margin-bottom: 10px;
  cursor: inherit;
`;

export const RangeFieldRange: React.FC<ReactSliderProps<RangeFieldValue>> = styled(ReactSlider)`
  display: flex;
  align-items: center;
  width: 100%;
  height: 16px;
`;

export const RangeFieldSkeleton = styled(Skeleton)`
  width: 100%;
  height: 16px;
`;

export interface RangeFieldRangeTrackProps {
  $index: number;
  $disabled: boolean;
}

export const RangeFieldRangeTrack = styled.div<RangeFieldRangeTrackProps>`
  display: flex;
  height: 8px;
  background: ${({ theme, $index, $disabled }) => {
    switch ($index) {
      case 1:
        return theme.colors.grayScale.gray3;
      default:
        if (!$disabled) {
          return theme.colors.accent.primary;
        } 
        return theme.colors.grayScale.gray1;
    }
  }};
  border-radius: 4px;
  ${({ $disabled }) => $disabled && css`
    cursor: not-allowed;
  `}
  ${({ $disabled }) => !$disabled && css`
    cursor: pointer;
  `}
`;

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
  ${({ $disabled }) => $disabled && css`
    cursor: not-allowed;
  `}
  ${({ $disabled }) => !$disabled && css`
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
    `
  })}
  ${({ theme }) => theme.mode === 'light' && css`
    box-shadow: 0px 0px 0px 1px ${theme.default.colors.grayScale.gray6};
  `}
`;

export const RangeFieldErrorText = styled(Typography).attrs({ variant: 'input-sm' })`
  display: inline-flex;
  margin-top: 8px;
  color: ${({ theme }) => theme.colors.critic};
`;
