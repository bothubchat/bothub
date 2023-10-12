import { css, styled } from 'styled-components';
import ReactSlider, { ReactSliderProps } from 'react-slider';
import React from 'react';
import { Typography } from '@/ui/components/typography';
import { RangeFieldValue } from './types';

export interface RangeFieldStyledProps {
  $fullWidth: boolean;
}

export const RangeFieldStyled = styled.div<RangeFieldStyledProps>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  ${({ $fullWidth }) => !$fullWidth && css`
    max-width: 240px;
  `}
`;

export const RangeFieldLabel = styled(Typography).attrs({ variant: 'input-sm' })`
  margin-bottom: 10px;
  cursor: default;
`;

export const RangeFieldRange: React.FC<ReactSliderProps<RangeFieldValue>> = styled(ReactSlider)`
  display: flex;
  align-items: center;
  width: 100%;
  height: 16px;
`;

export interface RangeFieldRangeTrackProps {
  $index: number;
}

export const RangeFieldRangeTrack = styled.div<RangeFieldRangeTrackProps>`
  display: flex;
  height: 8px;
  cursor: pointer;
  background: ${({ theme, $index }) => {
    switch ($index) {
      case 1:
        return theme.colors.grayScale.gray3;
      default:
        return theme.colors.accent.primary;
    }
  }};
  border-radius: 4px;
`;

export const RangeFieldRangeThumb = styled.span`
  display: inline-flex;
  position: relative;
  cursor: pointer;
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.base.white};
  outline: none;
`;

export const RangeFieldErrorText = styled(Typography).attrs({ variant: 'input-sm' })`
  display: inline-flex;
  margin-top: 8px;
  color: ${({ theme }) => theme.colors.critic};
`;
