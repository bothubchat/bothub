import { forwardRef, useCallback, useEffect, useRef } from 'react';
import {
  MessageVideoTimeLineInput,
  MessageVideoTimeLinePreview,
  MessageVideoTimeLineRail,
  MessageVideoTimeLineStyled,
  MessageVideoTimeLineThumb,
} from '../styled';
import { clamp, formatVideoTime, hasVideoHours } from '../utils';

export interface MessageVideoTimeLineProps {
  duration: number;
  label: string;
  /** Read out instead of the bare seconds: "0:12 / 0:45". */
  valueText: string;
  isFullScreen: boolean;
  onSeek: (time: number) => void;
  onScrubChange: (isScrubbing: boolean) => void;
}

/**
 * The input's value is set by the player on timeupdate, not by props, so the
 * playback doesn't re-render it.
 */
export const MessageVideoTimeLine = forwardRef<
  HTMLInputElement,
  MessageVideoTimeLineProps
>(
  (
    { duration, label, valueText, isFullScreen, onSeek, onScrubChange },
    ref,
  ) => {
    const timeLineRef = useRef<HTMLDivElement>(null);
    const previewRef = useRef<HTMLSpanElement>(null);
    const stopScrubRef = useRef<(() => void) | null>(null);
    const isDisabled = duration <= 0;

    const showPreviewAt = useCallback(
      (ratio: number) => {
        timeLineRef.current?.style.setProperty('--video-hover', String(ratio));

        if (previewRef.current) {
          previewRef.current.textContent = formatVideoTime(
            ratio * duration,
            hasVideoHours(duration),
          );
        }
      },
      [duration],
    );

    const showPreviewAtPointer = useCallback(
      (clientX: number) => {
        const timeLine = timeLineRef.current;

        if (!timeLine || isDisabled) return;

        const { left, width } = timeLine.getBoundingClientRect();
        if (width <= 0) return;

        showPreviewAt(clamp((clientX - left) / width, 0, 1));
      },
      [isDisabled, showPreviewAt],
    );

    const stopScrub = useCallback(() => {
      stopScrubRef.current?.();
    }, []);

    useEffect(() => stopScrub, [stopScrub]);

    // The press ends anywhere on the page: the drag may leave the timeline.
    const handlePointerDown = useCallback(
      (event: React.PointerEvent<HTMLDivElement>) => {
        if (isDisabled) return;

        stopScrub();
        showPreviewAtPointer(event.clientX);
        timeLineRef.current?.setAttribute('data-scrubbing', 'true');
        onScrubChange(true);

        const end = () => {
          window.removeEventListener('pointerup', end);
          window.removeEventListener('pointercancel', end);
          stopScrubRef.current = null;
          timeLineRef.current?.removeAttribute('data-scrubbing');
          onScrubChange(false);
        };

        stopScrubRef.current = end;
        window.addEventListener('pointerup', end);
        window.addEventListener('pointercancel', end);
      },
      [isDisabled, onScrubChange, showPreviewAtPointer, stopScrub],
    );

    const handlePointerMove = useCallback(
      (event: React.PointerEvent<HTMLDivElement>) => {
        showPreviewAtPointer(event.clientX);
      },
      [showPreviewAtPointer],
    );

    const handleChange = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        const time = Number(event.currentTarget.value);

        if (duration > 0) {
          showPreviewAt(clamp(time / duration, 0, 1));
        }

        onSeek(time);
      },
      [duration, onSeek, showPreviewAt],
    );

    return (
      <MessageVideoTimeLineStyled
        ref={timeLineRef}
        $isFullScreen={isFullScreen}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
      >
        <MessageVideoTimeLineRail />
        <MessageVideoTimeLineThumb />
        <MessageVideoTimeLinePreview
          ref={previewRef}
          aria-hidden
        />
        <MessageVideoTimeLineInput
          ref={ref}
          type="range"
          min={0}
          max={isDisabled ? 0 : duration}
          step="any"
          defaultValue={0}
          disabled={isDisabled}
          aria-label={label}
          aria-valuetext={valueText}
          onChange={handleChange}
        />
      </MessageVideoTimeLineStyled>
    );
  },
);

MessageVideoTimeLine.displayName = 'MessageVideoTimeLine';
