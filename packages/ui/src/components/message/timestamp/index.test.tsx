import { describe, test, expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import { customRender } from '@/ui/tests';
import { MessageTimestamp } from '.';

const TIME = new Date(2026, 0, 1, 9, 5).getTime();

describe('MessageTimestamp', () => {
  afterEach(() => {
    cleanup();
  });

  test('shows the edited label next to the time', () => {
    const { container } = customRender(
      <MessageTimestamp
        time={TIME}
        edited
        editedText="edited"
        position="right"
        color="#000"
      />,
    );

    expect(container.textContent).toBe('edited09:05');
  });

  test('does not print undefined without the edited label', () => {
    const { container } = customRender(
      <MessageTimestamp
        time={TIME}
        edited
        position="right"
        color="#000"
      />,
    );

    expect(container.textContent).toBe('09:05');
  });
});
