import { describe, test, expect, afterEach, vi } from 'vitest';
import { cleanup, fireEvent, screen } from '@testing-library/react';
import { customRender, TestProvider } from '@/ui/tests';
import { Switch } from './index';

describe('Switch', () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  test('toggles by itself when no value is passed', () => {
    const onChange = vi.fn();
    customRender(
      <Switch
        label="Notifications"
        onChange={onChange}
      />,
    );
    const input = screen.getByLabelText('Notifications') as HTMLInputElement;

    expect(input.checked).toBe(false);
    fireEvent.click(input);
    expect(input.checked).toBe(true);
    expect(onChange).toHaveBeenLastCalledWith(true);
  });

  test('does not warn when the parent starts controlling it', () => {
    const consoleError = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    const { rerender } = customRender(<Switch label="Notifications" />);

    rerender(
      <TestProvider>
        <Switch
          label="Notifications"
          value
        />
      </TestProvider>,
    );

    const input = screen.getByLabelText('Notifications') as HTMLInputElement;
    expect(input.checked).toBe(true);
    expect(consoleError).not.toHaveBeenCalled();
  });

  test('keeps the input focusable', () => {
    customRender(<Switch label="Notifications" />);
    const input = screen.getByLabelText('Notifications');

    input.focus();
    expect(document.activeElement).toBe(input);
  });
});
