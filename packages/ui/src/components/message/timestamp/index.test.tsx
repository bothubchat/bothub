import { describe, test, expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import { customRender } from '@/ui/tests';
import { MessageTimestamp } from '.';

const TIME = new Date(2026, 0, 1, 9, 5).getTime();

describe('MessageTimestamp', () => {
  afterEach(() => {
    cleanup();
  });

  test('shows the edited label after the time, at the edge', () => {
    const { container } = customRender(
      <MessageTimestamp
        time={TIME}
        edited
        editedText="edited"
      />,
    );

    expect(container.textContent).toBe('09:05edited');
  });

  test('does not print undefined without the edited label', () => {
    const { container } = customRender(
      <MessageTimestamp
        time={TIME}
        edited
      />,
    );

    expect(container.textContent).toBe('09:05');
  });

  // A message that is still being sent has a label before it has a time.
  test('shows the label of a message without a time', () => {
    const { container } = customRender(
      <MessageTimestamp
        edited
        editedText="sending"
      />,
    );

    expect(container.textContent).toBe('sending');
  });

  test('renders nothing without a time and a label', () => {
    const { container } = customRender(<MessageTimestamp />);

    expect(container.textContent).toBe('');
  });
});
