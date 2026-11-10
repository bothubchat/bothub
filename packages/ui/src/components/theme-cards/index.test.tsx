import { describe, test, expect, afterEach, vi } from 'vitest';
import { cleanup, fireEvent, screen } from '@testing-library/react';
import { customRender, TestProvider } from '@/ui/tests';
import { ThemeCards } from './index';

const isChecked = (title: string) =>
  screen.getByText(title).closest('button')!.querySelector('input')!.checked;

describe('ThemeCards', () => {
  afterEach(() => {
    cleanup();
  });

  test('follows initialChecked and calls the latest onChange', () => {
    const first = vi.fn();
    const second = vi.fn();

    const { rerender } = customRender(
      <ThemeCards
        titleDark="Dark"
        titleLight="Light"
        titleSystem="System"
        initialChecked="dark"
        onChange={first}
      />,
    );

    expect(isChecked('Dark')).toBe(true);

    rerender(
      <TestProvider>
        <ThemeCards
          titleDark="Dark"
          titleLight="Light"
          titleSystem="System"
          initialChecked="light"
          onChange={second}
        />
      </TestProvider>,
    );

    expect(isChecked('Light')).toBe(true);
    expect(isChecked('Dark')).toBe(false);

    fireEvent.click(screen.getByText('System'));

    expect(first).not.toHaveBeenCalled();
    expect(second).toHaveBeenCalledWith('system');
    expect(isChecked('System')).toBe(true);
  });
});
