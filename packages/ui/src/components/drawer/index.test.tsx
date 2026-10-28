import { describe, test, expect, afterEach, beforeEach, vi } from 'vitest';
import { act, cleanup, fireEvent, screen } from '@testing-library/react';
import { customRender, TestProvider } from '@/ui/tests';
import { Drawer } from './index';

describe('Drawer', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    cleanup();
    vi.useRealTimers();
  });

  test('does not call onClose without a user action', () => {
    const { rerender } = customRender(
      <Drawer
        open={false}
        onClose={() => {}}
      />,
    );

    const onClose = vi.fn();
    rerender(
      <TestProvider>
        <Drawer
          open={false}
          onClose={onClose}
        />
      </TestProvider>,
    );
    rerender(
      <TestProvider>
        <Drawer
          open={false}
          onClose={() => onClose()}
        />
      </TestProvider>,
    );
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(onClose).not.toHaveBeenCalled();
  });

  test('closes from the close button and Escape after the transition', () => {
    const onClose = vi.fn();
    customRender(
      <Drawer
        open
        title="Settings"
        onClose={onClose}
      >
        Content
      </Drawer>,
    );

    const dialog = screen.getByRole('dialog');
    expect(dialog.getAttribute('aria-modal')).toBe('true');
    expect(screen.getByLabelText('Settings')).toBe(dialog);
    expect(dialog.classList.contains('_opened')).toBe(true);

    fireEvent.keyUp(document.body, { key: 'Escape' });
    expect(dialog.classList.contains('_opened')).toBe(false);
    expect(onClose).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(200);
    });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test('ignores Escape while closed', () => {
    const onClose = vi.fn();
    customRender(
      <Drawer
        open={false}
        onClose={onClose}
      />,
    );

    fireEvent.keyUp(document.body, { key: 'Escape' });
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(onClose).not.toHaveBeenCalled();
  });

  test('unlocks the page scroll on unmount', () => {
    const { unmount } = customRender(<Drawer open>Content</Drawer>);
    expect(document.body.classList.contains('lock-scroll')).toBe(true);

    unmount();
    expect(document.body.classList.contains('lock-scroll')).toBe(false);
  });
});
