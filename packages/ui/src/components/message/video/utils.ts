export const VIDEO_PLAYBACK_RATES = [0.5, 1, 1.25, 1.5, 2] as const;
/** Arrow keys seek by this many seconds. */
export const VIDEO_SEEK_STEP = 5;
/** The touch buttons around play seek by this many seconds. */
export const VIDEO_TOUCH_SEEK_STEP = 10;
export const VIDEO_VOLUME_STEP = 0.1;
/** The controls hide this long after the last pointer move while playing. */
export const VIDEO_CONTROLS_HIDE_DELAY = 2500;
/** Proportions until the metadata says otherwise. */
export const VIDEO_DEFAULT_ASPECT = 16 / 9;
/** Durations from an hour show hours in both times. */
const HOUR = 3600;

export const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export const hasVideoHours = (duration: number) => duration >= HOUR;

/** 0:45, 10:00 and 1:02:15: minutes without a leading zero. */
export const formatVideoTime = (time: number, withHours = false) => {
  const total = Number.isFinite(time) && time > 0 ? Math.floor(time) : 0;
  const hours = Math.floor(total / HOUR);
  const minutes = Math.floor((total % HOUR) / 60);
  const seconds = String(total % 60).padStart(2, '0');

  if (withHours || hours > 0) {
    return `${hours}:${String(minutes).padStart(2, '0')}:${seconds}`;
  }

  return `${minutes}:${seconds}`;
};

export const formatPlaybackRate = (rate: number) => `${rate.toLocaleString()}×`;

/** End of the buffered range around the playback position, 0..1. */
export const getBufferedProgress = (video: HTMLVideoElement) => {
  const { buffered, currentTime, duration } = video;

  if (!buffered || !Number.isFinite(duration) || duration <= 0) {
    return 0;
  }

  for (let index = 0; index < buffered.length; index += 1) {
    // Half a second of slack: right after a seek the range starts a bit later.
    if (
      buffered.start(index) <= currentTime + 0.5 &&
      currentTime <= buffered.end(index)
    ) {
      return clamp(buffered.end(index) / duration, 0, 1);
    }
  }

  return 0;
};

type FullscreenElement = HTMLElement & {
  webkitRequestFullscreen?: () => Promise<void> | void;
  webkitRequestFullScreen?: () => Promise<void> | void;
};

type FullscreenDocument = Document & {
  webkitExitFullscreen?: () => Promise<void> | void;
  webkitFullscreenElement?: Element | null;
  webkitFullscreenEnabled?: boolean;
};

type FullscreenVideo = HTMLVideoElement & {
  webkitEnterFullscreen?: () => void;
};

export const getFullscreenElement = () => {
  const doc = document as FullscreenDocument;
  return doc.fullscreenElement ?? doc.webkitFullscreenElement ?? null;
};

/** iPhone Safari has no element fullscreen, only the video's own one. */
export const canRequestElementFullscreen = () => {
  const doc = document as FullscreenDocument;
  return Boolean(doc.fullscreenEnabled || doc.webkitFullscreenEnabled);
};

export const requestElementFullscreen = async (element: HTMLElement) => {
  const el = element as FullscreenElement;

  if (el.requestFullscreen) {
    await el.requestFullscreen();
    return;
  }

  if (el.webkitRequestFullscreen) {
    await el.webkitRequestFullscreen();
    return;
  }

  if (el.webkitRequestFullScreen) {
    await el.webkitRequestFullScreen();
  }
};

export const exitDocumentFullscreen = async () => {
  const doc = document as FullscreenDocument;

  if (doc.exitFullscreen && doc.fullscreenElement) {
    await doc.exitFullscreen();
    return;
  }

  if (doc.webkitExitFullscreen && doc.webkitFullscreenElement) {
    await doc.webkitExitFullscreen();
  }
};

/** The native iOS player: our controls are not shown there. */
export const enterVideoFullscreen = (video: HTMLVideoElement) => {
  (video as FullscreenVideo).webkitEnterFullscreen?.();
};
