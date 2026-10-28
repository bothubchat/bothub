import { afterEach, describe, expect, test, vi } from 'vitest';
import {
  animateSidebarResize,
  getSidebarResizeKeyframes,
  getSidebarWidth,
  SIDEBAR_COLLAPSED_WIDTH,
  SIDEBAR_RESIZE_DURATION,
  SIDEBAR_WIDTH,
} from './resize-animation';

const mockMatchMedia = (matchingQueries: string[]) =>
  vi.stubGlobal(
    'matchMedia',
    vi.fn((query: string) => ({ matches: matchingQueries.includes(query) })),
  );

const createElement = (width: number) => {
  const element = document.createElement('div');
  const animate = vi.fn(() => ({ cancel: vi.fn() }) as unknown as Animation);
  Object.assign(element, { animate });
  vi.spyOn(element, 'getBoundingClientRect').mockReturnValue({
    width,
  } as DOMRect);

  return { element, animate };
};

describe('getSidebarWidth', () => {
  test('is the open, collapsed or hidden width', () => {
    expect(getSidebarWidth(true, false)).toBe(SIDEBAR_WIDTH);
    expect(getSidebarWidth(false, false)).toBe(SIDEBAR_COLLAPSED_WIDTH);
    expect(getSidebarWidth(true, true)).toBe(0);
  });
});

describe('getSidebarResizeKeyframes', () => {
  test('opens the window over a sidebar that has grown', () => {
    expect(getSidebarResizeKeyframes(74, 360)).toEqual({
      root: [
        { transform: 'translateX(-286px)' },
        { transform: 'translateX(0px)' },
      ],
      panel: [
        { transform: 'translateX(286px)' },
        { transform: 'translateX(0px)' },
      ],
      rootHold: null,
      panelHold: null,
    });
  });

  test('keeps a shrinking sidebar wide until the end and lays it out at the new width', () => {
    const keyframes = getSidebarResizeKeyframes(360, 74);

    expect(keyframes.root).toEqual([
      { transform: 'translateX(0px)' },
      { transform: 'translateX(-286px)' },
    ]);
    expect(keyframes.panel).toEqual([
      { transform: 'translateX(0px)' },
      { transform: 'translateX(286px)' },
    ]);
    const rootHold = { width: '360px' };
    expect(keyframes.rootHold).toEqual([rootHold, rootHold]);
    const panelHold = { paddingRight: '286px' };
    expect(keyframes.panelHold).toEqual([panelHold, panelHold]);
  });

  test('keeps the content of a sidebar that hides as it was', () => {
    expect(getSidebarResizeKeyframes(360, 0).panelHold).toBeNull();
  });
});

describe('animateSidebarResize', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  test('animates the scaled edge with transforms', () => {
    mockMatchMedia([]);
    // Laid out at a dashboard scale of 0.75
    const root = createElement(74 * 0.75);
    const panel = createElement(74 * 0.75);

    const animations = animateSidebarResize({
      root: root.element,
      panel: panel.element,
      from: SIDEBAR_WIDTH,
      to: SIDEBAR_COLLAPSED_WIDTH,
      tabletMaxWidth: '1060px',
    });

    expect(animations).toHaveLength(4);
    const timing = { duration: SIDEBAR_RESIZE_DURATION, easing: 'ease-in-out' };
    const delta = (360 - 74) * 0.75;
    expect(root.animate).toHaveBeenCalledWith(
      [
        { transform: 'translateX(0px)' },
        { transform: `translateX(${-delta}px)` },
      ],
      timing,
    );
    expect(panel.animate).toHaveBeenCalledWith(
      [
        { transform: 'translateX(0px)' },
        { transform: `translateX(${delta}px)` },
      ],
      timing,
    );
    // The holds can't run on the compositor, so they don't share an effect
    // with the transforms
    expect(root.animate).toHaveBeenCalledTimes(2);
    expect(panel.animate).toHaveBeenCalledTimes(2);
  });

  test.each([
    ['on a tablet', ['(max-width: 1060px)']],
    ['with reduced motion', ['(prefers-reduced-motion: reduce)']],
  ])('does nothing %s', (_, matchingQueries) => {
    mockMatchMedia(matchingQueries);
    const root = createElement(SIDEBAR_WIDTH);
    const panel = createElement(SIDEBAR_WIDTH);

    const animations = animateSidebarResize({
      root: root.element,
      panel: panel.element,
      from: SIDEBAR_COLLAPSED_WIDTH,
      to: SIDEBAR_WIDTH,
      tabletMaxWidth: '1060px',
    });

    expect(animations).toEqual([]);
    expect(root.animate).not.toHaveBeenCalled();
  });

  test('does nothing without the Web Animations API', () => {
    mockMatchMedia([]);

    expect(
      animateSidebarResize({
        root: document.createElement('div'),
        panel: document.createElement('div'),
        from: SIDEBAR_COLLAPSED_WIDTH,
        to: SIDEBAR_WIDTH,
        tabletMaxWidth: '1060px',
      }),
    ).toEqual([]);
  });
});
