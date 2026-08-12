import React from 'react';
import { css, styled } from 'styled-components';
import Slider, { SliderProps } from 'rc-slider';
import { Button } from '@/ui/components/button';
import { Typography } from '@/ui/components/typography';
import { Skeleton } from '@/ui/components/skeleton';
import { adaptive } from '@/ui/adaptive';
import { isBright } from '@/ui/utils';
import { MessageVariant } from '../types';

export interface MessageMusicStyledProps {
  $hasCover: boolean;
}

export const MessageMusicStyled = styled.div<MessageMusicStyledProps>`
  display: flex;
  align-items: ${({ $hasCover }) => ($hasCover ? 'stretch' : 'center')};
  gap: 12px;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid ${({ theme }) => theme.colors.grayScale.gray3};
  padding: 12px;
  border-radius: 12px;
  max-width: ${({ $hasCover }) => ($hasCover ? '480px' : '720px')};

  ${({ $hasCover }) =>
    adaptive({
      tablet: css`
        max-width: ${$hasCover ? '420px' : '100%'};
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
  flex-shrink: 0;
  width: 96px;
  height: 96px;
  border-radius: 10px;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.grayScale.gray3};
  display: flex;
  align-items: center;
  justify-content: center;

  ${adaptive({
    mobile: css`
      width: 72px;
      height: 72px;
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

export const MessageMusicIconBadge = styled.div`
  position: relative;
  flex-shrink: 0;
  width: 96px;
  height: 96px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.grayScale.gray3};

  ${adaptive({
    mobile: css`
      width: 72px;
      height: 72px;
      border-radius: 8px;
    `,
  })}
`;

export const MessageMusicContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
  min-width: 0;
  flex: 1;
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
  line-height: 1.3;
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

export const MessageMusicMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
  width: 100%;
`;

export const MessageMusicPlayerRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
`;

export const MessageMusicSliderWrap = styled.div`
  position: relative;
  flex: 1 1 auto;
  min-width: 48px;
  width: 100%;
  display: flex;
  align-items: center;
`;

export const MessageMusicControlButton = styled(Button).attrs({
  disableHoverColor: true,
})`
  max-width: 38px;
  max-height: 38px;
  border-radius: 50%;
  flex-shrink: 0;
  transition:
    transform 160ms ease-out,
    opacity 160ms ease-out;

  @media (hover: hover) and (pointer: fine) {
    &:hover:not(:disabled) {
      transform: scale(1.06);
    }
  }

  &:active:not(:disabled) {
    transform: scale(0.94);
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;

    &:hover:not(:disabled),
    &:active:not(:disabled) {
      transform: none;
    }
  }
`;

export const MessageMusicTime = styled(Typography).attrs({
  variant: 'body-s-medium',
})<{ $variant: MessageVariant }>`
  ${textColor}
  opacity: 0.7;
  user-select: none;
  flex-shrink: 0;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
`;

export interface MessageMusicSliderProps {
  $disabled: boolean;
}

export const MessageMusicSlider: React.FC<
  SliderProps<number> & MessageMusicSliderProps
> = styled(Slider)`
  position: relative;
  width: 100%;
  height: 24px;
  padding: 4px 0;
  box-sizing: border-box;
  touch-action: none;

  &,
  & * {
    box-sizing: border-box;
  }

  .rc-slider-rail {
    position: absolute !important;
    left: 0;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 100%;
    height: 12px !important;
    border-radius: 6px;
    background: ${({ theme }) => theme.colors.grayScale.gray3} !important;
  }

  .rc-slider-track {
    position: absolute !important;
    top: 50%;
    transform: translateY(-50%);
    height: 12px !important;
    border-radius: 6px;
    opacity: 0.7;
    background: ${({ theme, $disabled }) => {
      if (!$disabled) {
        return theme.colors.gradient.elite;
      }
      return theme.colors.grayScale.gray1;
    }} !important;
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
    position: absolute !important;
    top: 50%;
    z-index: 1;
    opacity: 1 !important;
    border: none !important;
    border-radius: 50%;
    width: 14px !important;
    height: 14px !important;
    margin-top: -7px !important;
    background: ${({ theme, $disabled }) => {
      if (!$disabled) {
        return theme.default.colors.base.white;
      }
      return theme.colors.grayScale.gray1;
    }} !important;
    box-shadow: none;
    outline: none;
    cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};

    &:hover,
    &:focus,
    &:active {
      opacity: 1 !important;
      box-shadow: none;
      border: none !important;
    }
  }

  .rc-slider-handle-dragging {
    box-shadow: none !important;
    border: none !important;
  }
`;

export interface MessageMusicSkeletonProps {
  $hasCover: boolean;
}

export const MessageMusicSkeleton = styled(Skeleton).attrs({
  variant: 'rounded',
})<MessageMusicSkeletonProps>`
  width: 100%;
  max-width: ${({ $hasCover }) => ($hasCover ? '480px' : '720px')};
  height: ${({ $hasCover }) => ($hasCover ? '120px' : '64px')};

  ${({ $hasCover }) =>
    adaptive({
      tablet: css`
        max-width: ${$hasCover ? '420px' : '100%'};
      `,
      mobile: css`
        max-width: 100%;
        height: ${$hasCover ? '96px' : '72px'};
      `,
    })}
`;
