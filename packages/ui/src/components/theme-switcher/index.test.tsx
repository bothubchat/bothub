import { describe, test, expect, afterEach, vi } from 'vitest';
import { cleanup, fireEvent } from '@testing-library/react';
import { customRender, TestProvider } from '@/ui/tests';
import { ThemeSwitcher, ThemeSwitcherProps } from './index';

const getItem = (mode: string) =>
  document.querySelector(`[data-test="theme-${mode}"]`)!;

// Icon parts are drawn with currentColor, the color is set on the svg
const getIconFill = (mode: string) =>
  getItem(mode).querySelector('svg')!.style.color;

describe('ThemeSwitcher', () => {
  afterEach(() => {
    cleanup();
  });

  test('follows the mode prop', () => {
    const { rerender } = customRender(<ThemeSwitcher mode="dark" />);
    const activeFill = getIconFill('dark');

    expect(getIconFill('light')).not.toBe(activeFill);

    rerender(
      <TestProvider>
        <ThemeSwitcher mode="light" />
      </TestProvider>,
    );

    expect(getIconFill('light')).toBe(activeFill);
    expect(getIconFill('dark')).not.toBe(activeFill);
  });

  test('calls the latest handlers', () => {
    const first = vi.fn();
    const second = vi.fn();
    const props: ThemeSwitcherProps = { mode: 'dark' };

    const { rerender } = customRender(
      <ThemeSwitcher
        {...props}
        onChange={first}
      />,
    );
    rerender(
      <TestProvider>
        <ThemeSwitcher
          {...props}
          onChange={second}
        />
      </TestProvider>,
    );

    fireEvent.click(getItem('light'));

    expect(first).not.toHaveBeenCalled();
    expect(second).toHaveBeenCalledWith('light');
  });
});
