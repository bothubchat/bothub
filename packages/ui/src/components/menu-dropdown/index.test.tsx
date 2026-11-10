import { describe, test, expect, afterEach, beforeEach, vi } from 'vitest';
import { cleanup, fireEvent, screen, waitFor } from '@testing-library/react';
import { customRender } from '@/ui/tests';
import { MenuDropdown } from './index';

describe('MenuDropdown', () => {
  beforeEach(() => {
    // jsdom has no ResizeObserver, the scrollbar needs it
    vi.stubGlobal(
      'ResizeObserver',
      class {
        observe() {}

        unobserve() {}

        disconnect() {}
      },
    );
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  test('listens for outside clicks only while open', async () => {
    const addEventListener = vi.spyOn(document, 'addEventListener');
    customRender(
      <>
        <MenuDropdown>Menu content</MenuDropdown>
        <span>Outside</span>
      </>,
    );

    const outsideListeners = () =>
      addEventListener.mock.calls.filter(
        ([type]) => type === 'mousedown' || type === 'click',
      ).length;
    expect(outsideListeners()).toBe(0);

    const toggle = screen.getByRole('button');
    fireEvent.click(toggle);
    expect(screen.queryByText('Menu content')).not.toBeNull();
    expect(toggle.getAttribute('aria-expanded')).toBe('true');
    expect(outsideListeners()).toBeGreaterThan(0);

    fireEvent.mouseDown(screen.getByText('Outside'));
    await waitFor(() => expect(screen.queryByText('Menu content')).toBeNull());
  });
});
