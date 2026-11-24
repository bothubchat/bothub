import { describe, test, expect, afterEach, vi } from 'vitest';
import { cleanup, fireEvent } from '@testing-library/react';
import { customRender } from '@/ui/tests';
import { MessageVersions } from '.';

const renderVersions = (version: number, totalVersions = 3) => {
  const onNextVersion = vi.fn();
  const onPrevVersion = vi.fn();
  const { container } = customRender(
    <MessageVersions
      id="message-1"
      version={version}
      totalVersions={totalVersions}
      onNextVersion={onNextVersion}
      onPrevVersion={onPrevVersion}
    />,
  );
  const [prev, next] = Array.from(container.querySelectorAll('button'));

  return { container, prev, next, onNextVersion, onPrevVersion };
};

describe('MessageVersions', () => {
  afterEach(() => {
    cleanup();
  });

  test('shows which version of how many is on screen', () => {
    const { container } = renderVersions(2);

    expect(container.textContent).toBe('2/3');
  });

  test('switches to the neighbouring versions', () => {
    const { prev, next, onNextVersion, onPrevVersion } = renderVersions(2);

    fireEvent.click(next);
    fireEvent.click(prev);

    expect(onNextVersion).toHaveBeenCalledWith('message-1');
    expect(onPrevVersion).toHaveBeenCalledWith('message-1');
  });

  // У крайней версии стрелка в её сторону не нажимается
  test('disables the arrow that has nowhere to go', () => {
    const first = renderVersions(1);

    expect(first.prev.disabled).toBe(true);
    expect(first.next.disabled).toBe(false);
    cleanup();

    const last = renderVersions(3);

    expect(last.prev.disabled).toBe(false);
    expect(last.next.disabled).toBe(true);
  });

  test('renders nothing for a message without versions', () => {
    const { container } = customRender(<MessageVersions id="message-1" />);

    expect(container.textContent).toBe('');
  });
});
