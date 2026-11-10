/** Desktop widths of the sidebar, before the dashboard scale */
export const SIDEBAR_WIDTH = 360;
export const SIDEBAR_COLLAPSED_WIDTH = 74;
export const SIDEBAR_RESIZE_DURATION = 300;

export const getSidebarWidth = (isOpen: boolean, isHide: boolean): number => {
  if (isHide) {
    return 0;
  }

  return isOpen ? SIDEBAR_WIDTH : SIDEBAR_COLLAPSED_WIDTH;
};

export interface SidebarResizeKeyframes {
  /** The sidebar box: it clips the panel like a window */
  root: Keyframe[];
  /** The panel inside it: moves against the box, so it stays in place */
  panel: Keyframe[];
  /** Constant styles that keep a shrinking sidebar wide until the end */
  rootHold: Keyframe[] | null;
  panelHold: Keyframe[] | null;
}

const translateX = (px: number): Keyframe => ({
  transform: `translateX(${px}px)`,
});

const hold = (keyframe: Keyframe): Keyframe[] => [keyframe, keyframe];

/**
 * The width of the sidebar changes in a single step, so the content next to
 * it is laid out once. The moving edge is two opposite translations: the
 * sidebar box (`overflow: hidden`) moves by the width difference and the
 * panel inside it moves back by the same amount, so only the right edge of
 * the panel appears to move. Transforms run on the compositor and lay
 * nothing out while the edge moves.
 *
 * Widths are in pixels as laid out, after the dashboard scale.
 */
export function getSidebarResizeKeyframes(
  from: number,
  to: number,
): SidebarResizeKeyframes {
  const delta = Math.abs(to - from);

  if (to >= from) {
    // The sidebar takes its new width at the start, the content next to it
    // moves aside and the panel opens into the gap
    return {
      root: [translateX(-delta), translateX(0)],
      panel: [translateX(delta), translateX(0)],
      rootHold: null,
      panelHold: null,
    };
  }

  // The reverse: the sidebar keeps its old width until the panel has closed,
  // then the content next to it moves in. Sliding over the content instead
  // would hide the edge, the panels next to the sidebar have its color. The
  // panel padding lays the sidebar content out at the new width right away;
  // a hidden sidebar (to = 0) keeps it as it was while the panel closes.
  return {
    root: [translateX(0), translateX(-delta)],
    panel: [translateX(0), translateX(delta)],
    rootHold: hold({ width: `${from}px` }),
    panelHold: to > 0 ? hold({ paddingRight: `${delta}px` }) : null,
  };
}

/**
 * Laid out pixels per sidebar pixel: the dashboard scale multiplies every
 * size in the styles by `--bothub-scale`.
 */
export function getSidebarScale(root: HTMLElement, width: number): number {
  if (width > 0) {
    const scale = root.getBoundingClientRect().width / width;
    if (scale > 0) {
      return scale;
    }
  }

  const scale = parseFloat(
    getComputedStyle(root).getPropertyValue('--bothub-scale'),
  );

  return scale > 0 ? scale : 1;
}

export interface AnimateSidebarResizeOptions {
  root: HTMLElement;
  panel: HTMLElement;
  /** Widths before the scale, see `getSidebarWidth` */
  from: number;
  to: number;
  /** Below this width the sidebar is a drawer and doesn't change its width */
  tabletMaxWidth: string;
}

/**
 * Animates the edge of the sidebar after its width has changed. Returns the
 * running animations, so a quick second toggle can cancel them. Does nothing
 * where the width doesn't change (tablet and phone), with reduced motion and
 * without the Web Animations API.
 */
export function animateSidebarResize({
  root,
  panel,
  from,
  to,
  tabletMaxWidth,
}: AnimateSidebarResizeOptions): Animation[] {
  if (
    from === to ||
    typeof root.animate !== 'function' ||
    typeof window.matchMedia !== 'function' ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    window.matchMedia(`(max-width: ${tabletMaxWidth})`).matches
  ) {
    return [];
  }

  const scale = getSidebarScale(root, to);
  const keyframes = getSidebarResizeKeyframes(from * scale, to * scale);
  const timing: KeyframeAnimationOptions = {
    duration: SIDEBAR_RESIZE_DURATION,
    easing: 'ease-in-out',
  };
  // Holds go in their own animations: a width or a padding in the same
  // effect would keep the transform off the compositor
  const animations = [
    root.animate(keyframes.root, timing),
    panel.animate(keyframes.panel, timing),
  ];
  if (keyframes.rootHold) {
    animations.push(
      root.animate(keyframes.rootHold, { duration: timing.duration }),
    );
  }
  if (keyframes.panelHold) {
    animations.push(
      panel.animate(keyframes.panelHold, { duration: timing.duration }),
    );
  }

  return animations;
}
