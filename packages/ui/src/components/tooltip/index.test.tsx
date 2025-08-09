import { describe, test, expect, afterEach } from 'vitest';
import { screen, fireEvent, waitFor, cleanup } from '@testing-library/react';
import { customRender } from '@/ui/tests';
import { Tooltip, TooltipAnimationDuration } from './index';
import { Button } from '../button';

describe('tooltip', () => {
  afterEach(() => {
    cleanup();
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
});
