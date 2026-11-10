import { memo, useState } from 'react';
import { describe, test, expect, afterEach, vi } from 'vitest';
import {
  act,
  screen,
  fireEvent,
  waitFor,
  cleanup,
} from '@testing-library/react';
import { customRender, trackGlobalListeners } from '@/ui/tests';
import { Tooltip, TooltipAnimationDuration, useTooltip } from './index';
import { Button } from '../button';
import { portalId } from '../portal';

// waitFor resolves as soon as the tooltip is shown or removed: the long
// timeout only matters when a loaded test run delays animation frames.
const ANIMATION_TIMEOUT = 1000;

describe('tooltip', () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  test('should become visible on button hover', async () => {
    customRender(
      <Tooltip label="Tooltip text">
        <Button>Hover me</Button>
      </Tooltip>,
    );

    const button = screen.getByRole('button');

    // Initially tooltip should not be visible
    expect(screen.queryByText('Tooltip text')).toBeNull();

    // Hover over button
    fireEvent.mouseEnter(button);

    // Tooltip should now be visible
    expect(screen.getByText('Tooltip text')).not.toBeNull();

    // Mouse leave should hide tooltip
    fireEvent.mouseLeave(button);

    await waitFor(
      () => {
        // Tooltip should be removed
        expect(screen.queryByText('Tooltip text')).toBeNull();
      },
      {
        timeout: ANIMATION_TIMEOUT,
      },
    );
  });

  test('should not show tooltip when disabled', () => {
    customRender(
      <Tooltip
        label="Tooltip text"
        disabled
      >
        <Button>Hover me</Button>
      </Tooltip>,
    );

    const button = screen.getByRole('button');
    fireEvent.mouseEnter(button);

    expect(screen.queryByText('Tooltip text')).toBeNull();
  });

  test('should not show tooltip when label is empty', () => {
    customRender(
      <Tooltip label="">
        <Button>Hover me</Button>
      </Tooltip>,
    );

    const button = screen.getByRole('button');

    fireEvent.mouseEnter(button);
    expect(screen.queryByText('Tooltip text')).toBeNull();
  });

  test('should show tooltip on mouseenter and hide on mouseleave', async () => {
    customRender(
      <Tooltip label="Tooltip text">
        <Button>Click me</Button>
      </Tooltip>,
    );

    const button = screen.getByRole('button');

    fireEvent.mouseEnter(button);
    await waitFor(
      () => expect(screen.getByText('Tooltip text')).not.toBeNull(),
      { timeout: ANIMATION_TIMEOUT },
    );

    fireEvent.mouseLeave(button);
    await waitFor(() => expect(screen.queryByText('Tooltip text')).toBeNull(), {
      timeout: ANIMATION_TIMEOUT,
    });
  });

  test('should listen to the window only while it is visible', () => {
    const countListeners = trackGlobalListeners(['mouseout', 'scroll']);
    customRender(
      <Tooltip label="Tooltip text">
        <Button>Hover me</Button>
      </Tooltip>,
    );

    const button = screen.getByRole('button');
    expect(countListeners()).toEqual({});

    fireEvent.mouseEnter(button);
    expect(countListeners()).toEqual({
      'document mouseout': 1,
      'window scroll capture': 1,
    });

    fireEvent.mouseLeave(button);
    expect(countListeners()).toEqual({});
  });

  test('should hide on scroll of any element', async () => {
    customRender(
      <>
        <Tooltip label="Tooltip text">
          <Button>Hover me</Button>
        </Tooltip>
        <div data-testid="feed" />
      </>,
    );

    fireEvent.mouseEnter(screen.getByRole('button'));
    expect(screen.getByText('Tooltip text')).not.toBeNull();

    fireEvent.scroll(screen.getByTestId('feed'));
    await waitFor(() => expect(screen.queryByText('Tooltip text')).toBeNull(), {
      timeout: ANIMATION_TIMEOUT,
    });
  });

  test('should listen only to scroll of the page without hideOnScroll', async () => {
    const countListeners = trackGlobalListeners(['mouseout', 'scroll']);
    customRender(
      <Tooltip
        label="Tooltip text"
        hideOnScroll={false}
      >
        <Button>Hover me</Button>
      </Tooltip>,
    );

    fireEvent.mouseEnter(screen.getByRole('button'));
    expect(countListeners()).toEqual({
      'document mouseout': 1,
      'window scroll': 1,
    });

    fireEvent.scroll(window);
    await waitFor(() => expect(screen.queryByText('Tooltip text')).toBeNull(), {
      timeout: ANIMATION_TIMEOUT,
    });
  });
});

describe('tooltip performance', () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  const tooltipEvents = ['scroll', 'mouseout', 'mouseleave'];

  const spyOnGlobalListeners = () => {
    const spies = {
      add: [
        vi.spyOn(window, 'addEventListener'),
        vi.spyOn(document, 'addEventListener'),
      ],
      remove: [
        vi.spyOn(window, 'removeEventListener'),
        vi.spyOn(document, 'removeEventListener'),
      ],
    };
    const count = (list: typeof spies.add) =>
      list
        .flatMap((spy) => spy.mock.calls)
        .filter(([type]) => tooltipEvents.includes(type)).length;

    return {
      added: () => count(spies.add),
      removed: () => count(spies.remove),
    };
  };

  test('idle tooltips add no global listeners and render no popup', () => {
    const listeners = spyOnGlobalListeners();

    customRender(
      <>
        {Array.from({ length: 20 }, (_, index) => (
          <Tooltip
            key={index}
            label={`Tooltip ${index}`}
          >
            <span>Trigger {index}</span>
          </Tooltip>
        ))}
      </>,
    );

    expect(listeners.added()).toBe(0);
    expect(document.getElementById(portalId)?.childElementCount).toBe(0);
  });

  test('subscribes to global events only while shown', async () => {
    customRender(
      <Tooltip label="Tooltip text">
        <Button>Hover me</Button>
      </Tooltip>,
    );
    const button = screen.getByRole('button');
    const listeners = spyOnGlobalListeners();

    fireEvent.mouseEnter(button);
    expect(listeners.added()).toBe(2);
    expect(window.addEventListener).toHaveBeenCalledWith(
      'scroll',
      expect.any(Function),
      { capture: true, passive: true },
    );

    fireEvent.mouseLeave(button);
    expect(listeners.removed()).toBe(2);

    await waitFor(() => expect(screen.queryByRole('tooltip')).toBeNull(), {
      timeout: ANIMATION_TIMEOUT,
    });
    expect(document.getElementById(portalId)?.childElementCount).toBe(0);
  });

  test('hides on scroll of any element only with hideOnScroll', async () => {
    customRender(
      <>
        <Tooltip label="Hides">
          <Button>First</Button>
        </Tooltip>
        <Tooltip
          label="Stays"
          hideOnScroll={false}
        >
          <Button>Second</Button>
        </Tooltip>
        <div data-testid="scroller" />
      </>,
    );

    fireEvent.mouseEnter(screen.getByText('First'));
    fireEvent.mouseEnter(screen.getByText('Second'));
    fireEvent.scroll(screen.getByTestId('scroller'));

    await waitFor(() => expect(screen.queryByText('Hides')).toBeNull(), {
      timeout: ANIMATION_TIMEOUT,
    });
    expect(screen.getByText('Stays')).not.toBeNull();
  });

  test('hides when the pointer leaves the window', async () => {
    customRender(
      <Tooltip label="Tooltip text">
        <Button>Hover me</Button>
      </Tooltip>,
    );

    fireEvent.mouseEnter(screen.getByRole('button'));
    expect(screen.getByText('Tooltip text')).not.toBeNull();

    fireEvent.mouseOut(document.body, { relatedTarget: null });

    await waitFor(() => expect(screen.queryByText('Tooltip text')).toBeNull(), {
      timeout: ANIMATION_TIMEOUT,
    });
  });

  test('disableHiddenAnimation skips the leave animation', async () => {
    customRender(
      <Tooltip
        label="Tooltip text"
        disableHiddenAnimation
      >
        <Button>Hover me</Button>
      </Tooltip>,
    );
    const button = screen.getByRole('button');

    fireEvent.mouseEnter(button);
    fireEvent.mouseLeave(button);

    // Without the leave animation the tooltip is removed within a couple of
    // frames, well before the animation would end.
    await waitFor(() => expect(screen.queryByText('Tooltip text')).toBeNull(), {
      timeout: TooltipAnimationDuration.exit,
    });
  });

  test('keeps the context value stable across rerenders', () => {
    let consumerRenders = 0;
    const Consumer = memo(() => {
      const { handleTooltipMouseEnter } = useTooltip();
      consumerRenders++;

      return <span onMouseEnter={handleTooltipMouseEnter}>consumer</span>;
    });
    const consumer = <Consumer />;
    let setLabel: (label: string) => void = () => {};
    const Host = () => {
      const [label, setLabelState] = useState('First');
      setLabel = setLabelState;

      return <Tooltip label={label}>{consumer}</Tooltip>;
    };

    customRender(<Host />);
    fireEvent.mouseEnter(screen.getByText('consumer'));
    expect(screen.getByText('First')).not.toBeNull();
    act(() => setLabel('Second'));
    expect(screen.getByText('Second')).not.toBeNull();

    expect(consumerRenders).toBe(1);
  });

  test('describes the hovered element while shown', () => {
    customRender(
      <Tooltip label="Tooltip text">
        <Button aria-describedby="hint">Hover me</Button>
      </Tooltip>,
    );
    const button = screen.getByRole('button');

    fireEvent.mouseEnter(button);
    const tooltip = screen.getByRole('tooltip');
    expect(button.getAttribute('aria-describedby')).toBe(`hint ${tooltip.id}`);

    fireEvent.mouseLeave(button);
    expect(button.getAttribute('aria-describedby')).toBe('hint');
  });
});
