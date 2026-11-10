import { describe, test, expect, afterEach, vi } from 'vitest';
import { act, cleanup, fireEvent, screen } from '@testing-library/react';
import { customRender } from '@/ui/tests';
import { CopyButton } from '.';

describe('CopyButton', () => {
  afterEach(() => {
    cleanup();
    vi.useRealTimers();
  });

  test('shows the check mark for a second after a copy', () => {
    vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });
    const onCopy = vi.fn();
    customRender(
      <CopyButton
        tooltipLabel="Copy"
        onCopy={onCopy}
      />,
    );
    const button = screen.getByLabelText('Copy');

    fireEvent.click(button);
    const checkMark = button.innerHTML;

    expect(onCopy).toHaveBeenCalledTimes(1);

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(button.innerHTML).not.toBe(checkMark);
  });

  test('clears the timer on unmount', () => {
    vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });
    const { unmount } = customRender(<CopyButton tooltipLabel="Copy" />);

    fireEvent.click(screen.getByLabelText('Copy'));
    fireEvent.click(screen.getByLabelText('Copy'));
    unmount();

    expect(vi.getTimerCount()).toBe(0);
  });
});
