import { describe, test, expect, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import { customRender, TestProvider } from '@/ui/tests';
import { DateBadge } from './index';

describe('DateBadge', () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  test('switches between an empty and a set date', () => {
    // React reports a changed hook order through console.error.
    const consoleError = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    const { container, rerender } = customRender(
      <DateBadge
        date={null}
        locale="en"
      />,
    );

    expect(container.textContent).toBe('');

    rerender(
      <TestProvider>
        <DateBadge
          date="2024-03-05T12:00:00Z"
          locale="en"
        />
      </TestProvider>,
    );
    expect(container.textContent).toContain('2024');

    rerender(
      <TestProvider>
        <DateBadge
          date={null}
          locale="en"
        />
      </TestProvider>,
    );
    expect(container.textContent).toBe('');
    expect(consoleError).not.toHaveBeenCalled();
  });
});
