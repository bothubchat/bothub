import { describe, test, expect, afterEach, beforeEach, vi } from 'vitest';
import { cleanup, fireEvent, screen } from '@testing-library/react';
import { customRender } from '@/ui/tests';
import { ScrollableTabs } from './index';

const tabs = [
  { id: 'one', label: 'One', href: '#one' },
  { id: 'two', label: 'Two', href: '#two' },
];

describe('ScrollableTabs', () => {
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

  test('renders buttons that do not submit forms', () => {
    const onSubmit = vi.fn((event: React.FormEvent) => event.preventDefault());
    customRender(
      <form onSubmit={onSubmit}>
        <ScrollableTabs
          tabs={tabs}
          component="button"
          defaultTabId="one"
          fullWidth
        />
      </form>,
    );
    const one = screen.getByText('One').closest('button')!;

    expect(one.getAttribute('type')).toBe('button');
    expect(one.getAttribute('aria-pressed')).toBe('true');

    fireEvent.click(screen.getByText('Two'));
    expect(onSubmit).not.toHaveBeenCalled();
  });

  test('marks the selected link as current', () => {
    customRender(
      <ScrollableTabs
        tabs={tabs}
        defaultTabId="two"
        fullWidth
      />,
    );

    expect(
      screen.getByText('Two').closest('a')!.getAttribute('aria-current'),
    ).toBe('page');
    expect(
      screen.getByText('One').closest('a')!.getAttribute('aria-current'),
    ).toBeNull();
  });
});
