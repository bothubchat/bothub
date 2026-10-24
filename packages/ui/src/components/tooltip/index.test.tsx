import { describe, test, expect, afterEach, vi } from 'vitest';
import { screen, fireEvent, waitFor, cleanup } from '@testing-library/react';
import { customRender, trackGlobalListeners } from '@/ui/tests';
import { Tooltip, TooltipAnimationDuration } from './index';
import { Button } from '../button';

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
        timeout: TooltipAnimationDuration.exit + 25,
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
      { timeout: TooltipAnimationDuration.enter + 25 },
    );

    fireEvent.mouseLeave(button);
    await waitFor(() => expect(screen.queryByText('Tooltip text')).toBeNull(), {
      timeout: TooltipAnimationDuration.exit + 25,
    });
  });

  test('should listen to the window only while it is visible', () => {
    const countListeners = trackGlobalListeners(['mouseleave', 'scroll']);
    customRender(
      <Tooltip label="Tooltip text">
        <Button>Hover me</Button>
      </Tooltip>,
    );

    const button = screen.getByRole('button');
    expect(countListeners()).toEqual({});

    fireEvent.mouseEnter(button);
    expect(countListeners()).toEqual({
      'window mouseleave': 1,
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
      timeout: TooltipAnimationDuration.exit + 25,
    });
  });

  test('should listen only to scroll of the page without hideOnScroll', async () => {
    const countListeners = trackGlobalListeners(['mouseleave', 'scroll']);
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
      'window mouseleave': 1,
      'window scroll': 1,
    });

    fireEvent.scroll(window);
    await waitFor(() => expect(screen.queryByText('Tooltip text')).toBeNull(), {
      timeout: TooltipAnimationDuration.exit + 25,
    });
  });
});
