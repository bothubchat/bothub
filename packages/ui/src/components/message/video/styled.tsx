import { css, keyframes, styled, type DefaultTheme } from 'styled-components';
import { Typography } from '@/ui/components/typography';
import { Skeleton } from '@/ui/components/skeleton';
import { adaptive } from '@/ui/adaptive';
import { themeVar } from '@/ui/theme';
import { VIDEO_DEFAULT_ASPECT } from './utils';

type Themed = { theme: DefaultTheme };

// Over the video the colors stay the same in the light mode: `default.*`.
const white = ({ theme }: Themed) =>
  themeVar(theme, 'default.colors.base.white');
const black = ({ theme }: Themed) =>
  themeVar(theme, 'default.colors.base.black');
const accent = ({ theme }: Themed) => themeVar(theme, 'colors.accent.primary');
const focusRing = ({ theme }: Themed) =>
  themeVar(theme, 'colors.accent.primaryLight');
const mix = (color: string, percent: number) =>
  `color-mix(in srgb, ${color} ${percent}%, transparent)`;
const whiteAlpha = (percent: number) => (props: Themed) =>
  mix(white(props), percent);
const blackAlpha = (percent: number) => (props: Themed) =>
  mix(black(props), percent);

const fade = css<{ $isVisible: boolean }>`
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  pointer-events: ${({ $isVisible }) => ($isVisible ? 'auto' : 'none')};
  transition: opacity 200ms ease-out;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

const focusOutline = css`
  &:focus-visible {
    outline: 2px solid ${focusRing};
    outline-offset: 2px;
  }
`;

export type MessageVideoButtonOnly = 'desktop' | 'touch';

export const MessageVideoButton = styled.button<{
  $only?: MessageVideoButtonOnly;
}>`
  position: relative;
  flex-shrink: 0;
  display: ${({ $only }) => ($only === 'touch' ? 'none' : 'grid')};
  place-items: center;
  box-sizing: border-box;
  width: 40px;
  height: 40px;
  padding: 0;
  border: none;
  border-radius: 999px;
  background: transparent;
  color: ${white};
  cursor: pointer;
  transition: background-color 150ms ease-out;
  -webkit-tap-highlight-color: transparent;

  @media (hover: hover) and (pointer: fine) {
    &:hover:not(:disabled) {
      background: ${whiteAlpha(14)};
    }
  }

  ${focusOutline}

  &:disabled {
    opacity: 0.5;
    cursor: default;
  }

  ${adaptive<{ $only?: MessageVideoButtonOnly }>(({ $only }) => ({
    touch: css`
      width: 44px;
      height: 44px;
      ${$only === 'desktop' && 'display: none;'}
      ${$only === 'touch' && 'display: grid;'}
    `,
  }))}

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

export const MessageVideoSpeedButton = styled(MessageVideoButton)`
  width: auto;
  min-width: 40px;
  padding: 0 10px;

  ${adaptive({
    touch: css`
      width: auto;
      min-width: 44px;
    `,
  })}
`;

export const MessageVideoSpeedText = styled(Typography).attrs<{
  $isFullScreen?: boolean;
}>(({ $isFullScreen }) => ({
  variant: $isFullScreen ? ('body-m-semibold' as const) : 'body-s-semibold',
}))<{ $isFullScreen?: boolean }>`
  color: ${white};
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
`;

export const MessageVideoBar = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  min-width: 0;
`;

export const MessageVideoSpacer = styled.div`
  flex: 1;
`;

export const MessageVideoTime = styled(Typography).attrs<{
  $isFullScreen?: boolean;
}>(({ $isFullScreen }) => ({
  variant: $isFullScreen ? ('body-m-medium' as const) : 'body-s-medium',
}))<{ $isFullScreen?: boolean }>`
  flex-shrink: 0;
  padding: 0 6px;
  color: ${white};
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
  user-select: none;
`;

// The timeline: a native range input on top of the drawn rail, so dragging,
// touch, keys and screen readers work without code of our own. Progress
// comes from the --video-progress and --video-buffered variables (0..1) of
// the player: timeupdate doesn't re-render anything.
export const MessageVideoTimeLineStyled = styled.div<{
  $isFullScreen: boolean;
}>`
  --video-hover: 0;
  position: relative;
  display: flex;
  align-items: center;
  height: ${({ $isFullScreen }) => ($isFullScreen ? 28 : 20)}px;
  margin: 0 ${({ $isFullScreen }) => ($isFullScreen ? 8 : 4)}px;
  touch-action: none;
`;

export const MessageVideoTimeLineRail = styled.div`
  position: relative;
  width: 100%;
  height: 4px;
  overflow: hidden;
  border-radius: 999px;
  background: ${whiteAlpha(24)};
  transition: transform 150ms ease-out;

  &::before,
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    transform-origin: left;
  }

  &::before {
    transform: scaleX(var(--video-buffered, 0));
    background: ${whiteAlpha(40)};
  }

  &::after {
    transform: scaleX(var(--video-progress, 0));
    background: ${accent};
  }

  ${MessageVideoTimeLineStyled}:hover &,
  ${MessageVideoTimeLineStyled}:focus-within &,
  ${MessageVideoTimeLineStyled}[data-scrubbing='true'] & {
    transform: scaleY(1.5);
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

export const MessageVideoTimeLineThumb = styled.span`
  position: absolute;
  top: 50%;
  left: calc(var(--video-progress, 0) * 100%);
  width: 14px;
  height: 14px;
  margin: -7px 0 0 -7px;
  border-radius: 50%;
  background: ${white};
  box-shadow: 0 1px 4px ${blackAlpha(45)};
  opacity: 0;
  transform: scale(0.6);
  transition:
    opacity 150ms ease-out,
    transform 150ms ease-out;
  pointer-events: none;

  ${MessageVideoTimeLineStyled}:hover &,
  ${MessageVideoTimeLineStyled}:focus-within &,
  ${MessageVideoTimeLineStyled}[data-scrubbing='true'] & {
    opacity: 1;
    transform: scale(1);
  }

  ${MessageVideoTimeLineStyled}:has(:focus-visible) & {
    box-shadow: 0 0 0 3px ${focusRing};
  }

  ${adaptive({
    touch: css`
      opacity: 1;
      transform: scale(1);
    `,
  })}

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

// The text is written straight to the element on pointer moves.
export const MessageVideoTimeLinePreview = styled(Typography).attrs({
  variant: 'body-xs-medium',
})`
  position: absolute;
  bottom: calc(100% + 4px);
  left: clamp(20px, calc(var(--video-hover) * 100%), calc(100% - 20px));
  transform: translateX(-50%);
  padding: 4px 8px;
  border-radius: 6px;
  background: ${blackAlpha(92)};
  color: ${white};
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
  opacity: 0;
  transition: opacity 100ms ease-out;
  pointer-events: none;

  &:empty {
    display: none;
  }

  ${MessageVideoTimeLineStyled}[data-scrubbing='true'] & {
    opacity: 1;
  }

  @media (hover: hover) and (pointer: fine) {
    ${MessageVideoTimeLineStyled}:hover & {
      opacity: 1;
    }
  }
`;

export const MessageVideoTimeLineInput = styled.input`
  position: absolute;
  inset: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  margin: 0;
  opacity: 0;
  cursor: pointer;
  -webkit-appearance: none;
  appearance: none;
  background: transparent;

  /* A thin thumb: the click position maps to the time along the whole rail. */
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 1px;
    height: 100%;
  }

  &::-moz-range-thumb {
    width: 1px;
    height: 100%;
    border: none;
  }

  &:disabled {
    cursor: default;
  }
`;

export const MessageVideoVolumeStyled = styled.div`
  display: flex;
  align-items: center;
`;

// Opens on hover and focus; touch devices have their own volume keys.
export const MessageVideoVolumeSlider = styled.div`
  display: flex;
  align-items: center;
  width: 0;
  overflow: hidden;
  opacity: 0;
  transition:
    width 200ms ease-out,
    opacity 200ms ease-out;

  ${MessageVideoVolumeStyled}:hover &,
  ${MessageVideoVolumeStyled}:focus-within & {
    width: 80px;
    opacity: 1;
  }

  ${adaptive({
    touch: css`
      display: none;
    `,
  })}

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

// The fill comes from the --video-volume variable (a percentage).
export const MessageVideoVolumeInput = styled.input`
  width: 64px;
  height: 20px;
  margin: 0 8px;
  padding: 0;
  background: transparent;
  cursor: pointer;
  -webkit-appearance: none;
  appearance: none;

  &::-webkit-slider-runnable-track {
    height: 4px;
    border-radius: 999px;
    background: linear-gradient(
      to right,
      ${white} var(--video-volume, 100%),
      ${whiteAlpha(30)} var(--video-volume, 100%)
    );
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 12px;
    height: 12px;
    margin-top: -4px;
    border: none;
    border-radius: 50%;
    background: ${white};
  }

  &::-moz-range-track {
    height: 4px;
    border-radius: 999px;
    background: ${whiteAlpha(30)};
  }

  &::-moz-range-progress {
    height: 4px;
    border-radius: 999px;
    background: ${white};
  }

  &::-moz-range-thumb {
    width: 12px;
    height: 12px;
    border: none;
    border-radius: 50%;
    background: ${white};
  }

  &:focus-visible {
    outline: none;
  }

  &:focus-visible::-webkit-slider-thumb {
    box-shadow: 0 0 0 3px ${focusRing};
  }

  &:focus-visible::-moz-range-thumb {
    box-shadow: 0 0 0 3px ${focusRing};
  }
`;

export const MessageVideoControls = styled.div<{
  $isVisible: boolean;
  $isFullScreen: boolean;
}>`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 3;
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 40px 12px 8px;
  background: linear-gradient(to top, ${blackAlpha(85)}, transparent);
  ${fade}

  ${({ $isFullScreen }) =>
    $isFullScreen &&
    css`
      gap: 6px;
      padding: 80px 24px 16px;

      ${MessageVideoBar} {
        gap: 8px;
      }

      ${MessageVideoButton} {
        width: 48px;
        height: 48px;
      }

      ${MessageVideoSpeedButton} {
        width: auto;
        min-width: 48px;
        padding: 0 12px;
      }
    `}

  /* On touch the time row goes above the timeline. */
  ${adaptive({
    touch: css`
      flex-direction: column-reverse;
      gap: 0;
      padding: 32px 4px 0;
    `,
  })}
`;

// Play and ±10 s in the middle: only on touch devices.
export const MessageVideoCenter = styled.div<{ $isVisible: boolean }>`
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  z-index: 3;
  display: none;
  align-items: center;
  justify-content: center;
  gap: 32px;
  transform: translateY(calc(-50% - 16px));
  ${fade}

  ${adaptive({
    touch: css`
      display: flex;
    `,
  })}
`;

export const MessageVideoCenterPlay = styled(MessageVideoButton)`
  width: 56px;
  height: 56px;
  border: 1px solid ${whiteAlpha(20)};
  background: ${blackAlpha(55)};

  ${adaptive({
    touch: css`
      width: 56px;
      height: 56px;
    `,
  })}
`;

export const MessageVideoBigPlay = styled.button`
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: 3;
  display: grid;
  place-items: center;
  width: 64px;
  height: 64px;
  margin: -32px 0 0 -32px;
  padding: 0;
  border: none;
  border-radius: 50%;
  background: ${accent};
  color: ${({ theme }) => themeVar(theme, 'tokens.accentIcon')};
  box-shadow: 0 8px 28px ${blackAlpha(45)};
  cursor: pointer;
  transition: transform 150ms ease-out;
  -webkit-tap-highlight-color: transparent;

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      transform: scale(1.06);
    }
  }

  &:active {
    transform: scale(0.94);
  }

  &:focus-visible {
    outline: 2px solid ${focusRing};
    outline-offset: 3px;
  }

  ${adaptive({
    mobile: css`
      width: 56px;
      height: 56px;
      margin: -28px 0 0 -28px;
    `,
  })}

  @media (prefers-reduced-motion: reduce) {
    transition: none;

    &:hover,
    &:active {
      transform: none;
    }
  }
`;

export const MessageVideoBadge = styled(Typography).attrs({
  variant: 'body-xs-medium',
})`
  position: absolute;
  right: 12px;
  bottom: 12px;
  z-index: 3;
  padding: 3px 8px;
  border-radius: 6px;
  background: ${blackAlpha(72)};
  color: ${white};
  font-variant-numeric: tabular-nums;
  pointer-events: none;
`;

// Darkens the frame at the end and, on touch, under the shown controls.
export const MessageVideoShade = styled.div<{
  $isEnded: boolean;
  $areControlsVisible: boolean;
}>`
  position: absolute;
  inset: 0;
  z-index: 2;
  background: ${blackAlpha(45)};
  opacity: ${({ $isEnded }) => ($isEnded ? 1 : 0)};
  transition: opacity 200ms ease-out;
  pointer-events: none;

  ${adaptive<{ $isEnded: boolean; $areControlsVisible: boolean }>(
    ({ $isEnded, $areControlsVisible }) => ({
      touch: css`
        opacity: ${$isEnded || $areControlsVisible ? 1 : 0};
      `,
    }),
  )}

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

export const MessageVideoReplay = styled.button`
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: 4;
  display: flex;
  align-items: center;
  gap: 8px;
  height: 44px;
  padding: 0 18px 0 14px;
  transform: translate(-50%, calc(-50% - 16px));
  border: 1px solid ${whiteAlpha(24)};
  border-radius: 999px;
  background: ${blackAlpha(60)};
  color: ${white};
  white-space: nowrap;
  cursor: pointer;
  transition: background-color 150ms ease-out;

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      background: ${blackAlpha(78)};
    }
  }

  ${focusOutline}

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

export const MessageVideoReplayText = styled(Typography).attrs({
  variant: 'body-m-semibold',
})`
  color: ${white};
`;

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

export const MessageVideoSpinner = styled.span`
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: 2;
  box-sizing: border-box;
  width: 44px;
  height: 44px;
  margin: -22px 0 0 -22px;
  border: 4px solid ${whiteAlpha(25)};
  border-top-color: ${white};
  border-radius: 50%;
  animation: ${spin} 900ms linear infinite;
  pointer-events: none;

  @media (prefers-reduced-motion: reduce) {
    animation-duration: 2400ms;
  }
`;

// A thin progress line while the controls are hidden.
export const MessageVideoMiniProgress = styled.div<{ $isVisible: boolean }>`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 3;
  height: 2px;
  background: ${whiteAlpha(24)};
  ${fade}
  pointer-events: none;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    transform: scaleX(var(--video-progress, 0));
    transform-origin: left;
    background: ${accent};
  }
`;

export const MessageVideoError = styled.div`
  position: absolute;
  inset: 0;
  z-index: 5;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 16px;
  border: 1px solid ${({ theme }) => themeVar(theme, 'tokens.divider')};
  border-radius: inherit;
  background: ${({ theme }) => themeVar(theme, 'tokens.surfaceElevated')};
  text-align: center;
`;

export const MessageVideoErrorIcon = styled.span`
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${({ theme }) => mix(themeVar(theme, 'colors.critic'), 14)};
`;

export const MessageVideoErrorText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const MessageVideoErrorTitle = styled(Typography).attrs({
  variant: 'body-m-semibold',
})`
  color: ${({ theme }) => themeVar(theme, 'tokens.textDefault')};
  text-align: center;
`;

export const MessageVideoErrorDescription = styled(Typography).attrs({
  variant: 'body-s-regular',
})`
  color: ${({ theme }) => themeVar(theme, 'tokens.textSecondary')};
  text-align: center;
`;

// Positioned in the player, not at the button: the player clips what
// overflows it, so the menu keeps within its height and scrolls.
export const MessageVideoSpeedMenuStyled = styled.div<{
  $isFullScreen: boolean;
}>`
  position: absolute;
  right: 12px;
  bottom: 56px;
  z-index: 6;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  min-width: 136px;
  max-height: calc(100% - 64px);
  padding: 6px;
  overflow-y: auto;
  border: 1px solid
    ${({ theme }) => themeVar(theme, 'default.colors.grayScale.gray3')};
  border-radius: 10px;
  background: ${({ theme }) =>
    themeVar(theme, 'default.colors.grayScale.gray7')};
  box-shadow: 0 12px 32px ${blackAlpha(40)};

  ${({ $isFullScreen }) =>
    $isFullScreen &&
    css`
      right: 24px;
      bottom: 80px;
      max-height: calc(100% - 96px);
    `}

  ${adaptive({
    touch: css`
      right: 8px;
      bottom: 72px;
      max-height: calc(100% - 80px);
    `,
  })}
`;

export const MessageVideoSpeedOption = styled.button<{ $isSelected: boolean }>`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  height: 36px;
  padding: 0 12px;
  border: none;
  border-radius: 6px;
  background: ${({ theme, $isSelected }) =>
    $isSelected
      ? themeVar(theme, 'default.colors.grayScale.gray3')
      : 'transparent'};
  color: ${white};
  cursor: pointer;

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      background: ${({ theme }) =>
        themeVar(theme, 'default.colors.grayScale.gray3')};
    }
  }

  &:focus-visible {
    outline: 2px solid ${focusRing};
    outline-offset: -2px;
  }
`;

export const MessageVideoSpeedOptionText = styled(Typography).attrs({
  variant: 'body-m-medium',
})`
  color: ${white};
  font-variant-numeric: tabular-nums;
`;

export const MessageVideoSpeedCheck = styled.span`
  display: grid;
  place-items: center;
  color: ${focusRing};
`;

export const MessageVideoSkeleton = styled(Skeleton)`
  position: absolute;
  inset: 0;
  z-index: 5;
`;

export const MessageVideoStyled = styled.video`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
  background: ${black};
`;

// Fits the video into 640 × 480 by its proportions from --video-aspect. The
// limit is a max-width without percentages: it also caps the width a
// shrink-to-fit message bubble takes from the player.
export const MessageVideoContainer = styled.div<{
  $isFullScreen: boolean;
  $hideCursor: boolean;
}>`
  position: relative;
  box-sizing: border-box;
  width: 100%;
  max-width: min(
    640px,
    calc(480px * var(--video-aspect, ${VIDEO_DEFAULT_ASPECT}))
  );
  aspect-ratio: var(--video-aspect, ${VIDEO_DEFAULT_ASPECT});
  overflow: hidden;
  isolation: isolate;
  border-radius: 12px;
  background: ${black};
  color: ${white};
  cursor: ${({ $hideCursor }) => ($hideCursor ? 'none' : 'default')};
  user-select: none;
  -webkit-tap-highlight-color: transparent;

  &:focus {
    outline: none;
  }

  &:focus-visible {
    outline: 2px solid ${focusRing};
    outline-offset: 2px;
  }

  /* Keyboard focus inside keeps the controls on screen. */
  &:focus-visible
    ${MessageVideoControls},
    &:focus-visible
    ${MessageVideoCenter} {
    opacity: 1;
    pointer-events: auto;
  }

  &:focus-visible
    ${MessageVideoMiniProgress},
    &:focus-visible
    ${MessageVideoBadge} {
    opacity: 0;
  }

  /* Apart from the rules above: a browser without :has() drops only these. */
  &:has(:focus-visible)
    ${MessageVideoControls},
    &:has(:focus-visible)
    ${MessageVideoCenter} {
    opacity: 1;
    pointer-events: auto;
  }

  &:has(:focus-visible)
    ${MessageVideoMiniProgress},
    &:has(:focus-visible)
    ${MessageVideoBadge} {
    opacity: 0;
  }

  ${adaptive({
    mobile: css`
      max-width: calc(70vh * var(--video-aspect, ${VIDEO_DEFAULT_ASPECT}));
    `,
  })}

  ${({ $isFullScreen }) =>
    $isFullScreen &&
    css`
      width: 100%;
      max-width: none;
      height: 100%;
      aspect-ratio: auto;
      border-radius: 0;
    `}
`;
