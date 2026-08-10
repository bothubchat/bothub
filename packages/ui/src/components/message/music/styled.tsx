import React from 'react';
import { css, styled } from 'styled-components';
import Slider, { SliderProps } from 'rc-slider';
import { Button } from '@/ui/components/button';
import { Typography } from '@/ui/components/typography';
import { Skeleton } from '@/ui/components/skeleton';
import { adaptive } from '@/ui/adaptive';
import { isBright } from '@/ui/utils';
import { MessageVariant } from '../types';

export const MessageMusicStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  max-width: 560px;
  box-sizing: border-box;
  border: 1px solid ${({ theme }) => theme.colors.grayScale.gray3};
  padding: 12px;
  border-radius: 12px;

  ${adaptive({
    tablet: css`
      max-width: 420px;
    `,
    mobile: css`
      max-width: 100%;
      padding: 10px;
      gap: 10px;
    `,
  })}
`;

export const MessageMusicAudio = styled.audio`
  display: none;
`;

export const MessageMusicCover = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 10px;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.grayScale.gray3};
  display: flex;
  align-items: center;
  justify-content: center;

  ${adaptive({
    tablet: css`
      border-radius: 8px;
    `,
    mobile: css`
      border-radius: 8px;
    `,
  })}
`;

export const MessageMusicCoverImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

export const MessageMusicContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 0;
  width: 100%;
`;

const textColor = css<{ $variant: MessageVariant }>`
  color: ${({ theme, $variant }) => {
    if ($variant === 'assistant') {
      return theme.colors.base.white;
    }

    return theme.bright ||
      (theme.scheme === 'standard' && theme.mode === 'light') ||
      (theme.scheme === 'custom' &&
        isBright(theme.colors.custom.message.user.background))
      ? theme.default.colors.base.black
      : theme.default.colors.base.white;
  }};
`;

export const MessageMusicTitle = styled(Typography).attrs({
  variant: 'body-m-medium',
})<{ $variant: MessageVariant }>`
  ${textColor}
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
`;

export const MessageMusicArtist = styled(Typography).attrs({
  variant: 'body-s-regular',
})<{ $variant: MessageVariant }>`
  ${textColor}
  opacity: 0.7;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
`;

export const MessageMusicPlayerRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
`;

export const MessageMusicSliderWrap = styled.div`
  flex: 1;
  min-width: 0;
`;

export const MessageMusicControlButton = styled(Button).attrs({
  disableHoverColor: true,
})`
  max-width: 38px;
  max-height: 38px;
  border-radius: 50%;
`;

export const MessageMusicTime = styled(Typography).attrs({
  variant: 'body-s-medium',
})<{ $variant: MessageVariant }>`
  ${textColor}
  opacity: 0.7;
  user-select: none;
`;

export interface MessageMusicSliderProps {
  $disabled: boolean;
}

export const MessageMusicSlider: React.FC<
  SliderProps<number> & MessageMusicSliderProps
> = styled(Slider)`
  position: relative;
  width: 100%;
  height: 40px;
  padding: 4px 0;
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
    height: 24px;
    border-radius: 12px;
    background: ${({ theme }) => theme.colors.grayScale.gray3};
  }

  .rc-slider-track {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    height: 24px;
    border-radius: 12px;
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
    opacity: 0;
    border: none;
    border-radius: 50%;
    width: 32px;
    height: 32px;
    margin-top: -16px;
    background: transparent;
    box-shadow: none;
    outline: none;
    cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  }
`;

export const MessageMusicSkeleton = styled(Skeleton).attrs({
  variant: 'rounded',
})`
  width: 100%;
  max-width: 560px;
  aspect-ratio: 1 / 1;
  height: auto;

  ${adaptive({
    tablet: css`
      max-width: 420px;
    `,
    mobile: css`
      max-width: 100%;
    `,
  })}
`;
