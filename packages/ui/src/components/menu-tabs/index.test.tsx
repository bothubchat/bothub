import { describe, test, expect, afterEach, beforeEach, vi } from 'vitest';
import { cleanup, fireEvent, screen } from '@testing-library/react';
import { customRender } from '@/ui/tests';
import { MenuTabs } from './index';

const tabs = [
  { value: 'one', label: 'One' },
  { value: 'two', label: 'Two' },
];

describe('MenuTabs', () => {
  beforeEach(() => {
    // jsdom has no ResizeObserver, the scrollbar needs it
    vi.stubGlobal(
      'ResizeObserver',
      class {
        observe() {}

        unobserve() {}

        disconnect() {}
      },
    );
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
  });

  test('renders without tabs', () => {
    expect(() => customRender(<MenuTabs tabs={[]} />)).not.toThrow();
  });

  test('selects tabs with the mouse and the keyboard', () => {
    const onChangeValue = vi.fn();
    customRender(
      <MenuTabs
        tabs={tabs}
        onChangeValue={onChangeValue}
      />,
    );
    const [one, two] = screen.getAllByRole('tab');

    expect(one.getAttribute('aria-selected')).toBe('true');

    fireEvent.click(two);
    expect(onChangeValue).toHaveBeenLastCalledWith('two');
    expect(two.getAttribute('aria-selected')).toBe('true');

    fireEvent.keyDown(one, { key: 'Enter' });
    expect(onChangeValue).toHaveBeenLastCalledWith('one');
    expect(one.getAttribute('aria-selected')).toBe('true');
  });
});
