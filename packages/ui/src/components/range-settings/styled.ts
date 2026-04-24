import { css, styled } from 'styled-components';
import React from 'react';
import Slider, { SliderProps } from 'rc-slider';

export const RangeSettingsRoot = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  box-sizing: border-box;
`;

export const RangeSettingsTrack = styled.div`
  flex: 1;
  min-width: 0;
  box-sizing: border-box;
`;

export interface RangeSettingsSliderProps {
  $disabled: boolean;
}

export const RangeSettingsSlider: React.FC<
  SliderProps<number> & RangeSettingsSliderProps
> = styled(Slider)`
  position: relative;
  width: 100%;
  height: 16px;
  padding: 8px 0;
  box-sizing: border-box;
  touch-action: none;

  &,
  & * {
    box-sizing: border-box;
  }

  .rc-slider-rail {
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 100%;
    height: 16px;
    border-radius: 8px;
    background: ${({ theme }) => theme.colors.grayScale.gray3};
  }

  .rc-slider-track {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    height: 16px;
    border-radius: 16px 0 0 16px;
    opacity: 0.7;
    background: ${({ theme, $disabled }) => {
      if (!$disabled) {
        return theme.colors.gradient.elite;
      }
      return theme.colors.grayScale.gray1;
    }};
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

  .rc-slider-handle {
    position: absolute;
    top: 50%;
    z-index: 1;
    border: none;
    border-radius: 50%;
    width: 32px;
    height: 32px;
    margin-top: -16px;
    background: ${({ theme, $disabled }) => {
      if (!$disabled) {
        return theme.default.colors.base.white;
      }
      return theme.colors.grayScale.gray1;
    }};
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
    ${({ theme }) =>
      theme.mode === 'light' &&
      css`
        box-shadow: 0px 0px 0px 1px ${theme.default.colors.grayScale.gray6};
      `}
    &::before {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      content: attr(aria-valuetext);
      font-size: 10px;
      line-height: 1;
      font-weight: 600;
      background-image: ${({ theme, $disabled }) =>
        $disabled
          ? theme.default.colors.gradient.enterprise
          : theme.default.colors.gradient.enterprise};
      color: transparent;
      background-clip: text;
      -webkit-background-clip: text;

      pointer-events: none;
    }
  }
`;
