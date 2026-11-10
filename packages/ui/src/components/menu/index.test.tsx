import { describe, test, expect, afterEach, beforeEach, vi } from 'vitest';
import { cleanup, fireEvent, screen, waitFor } from '@testing-library/react';
import { customRender } from '@/ui/tests';
import { Menu } from './index';

describe('Menu', () => {
  const observe = vi.fn();

  beforeEach(() => {
    // jsdom has no ResizeObserver
    vi.stubGlobal(
      'ResizeObserver',
      class {
        observe = observe;

        unobserve() {}

        disconnect() {}
      },
    );
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
    observe.mockClear();
  });

  test('follows the trigger when rendered in a portal', async () => {
    customRender(<Menu buttonLabel="Actions">Menu content</Menu>);

    fireEvent.click(screen.getByText('Actions'));
    const content = await screen.findByText('Menu content');

    // The content mounts a render after the menu opens, the observer must
    // still be attached to it
    await waitFor(() => {
      expect(observe.mock.calls.some(([target]) => target === content)).toBe(
        true,
      );
    });
  });

  test('closes on Escape', async () => {
    const onOpenChange = vi.fn();
    customRender(
      <Menu
        defaultOpen
        buttonLabel="Actions"
        onOpenChange={onOpenChange}
      >
        Menu content
      </Menu>,
    );
    await screen.findByText('Menu content');

    fireEvent.keyUp(document.body, { key: 'Escape' });
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });
});
