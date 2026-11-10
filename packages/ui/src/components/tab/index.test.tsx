import { describe, test, expect, afterEach, vi } from 'vitest';
import { cleanup, fireEvent, screen } from '@testing-library/react';
import { customRender } from '@/ui/tests';
import { Tab } from './index';

describe('Tab', () => {
  afterEach(() => {
    cleanup();
  });

  test('does not submit a surrounding form and exposes its state', () => {
    const onSubmit = vi.fn((event: React.FormEvent) => event.preventDefault());
    customRender(
      <form onSubmit={onSubmit}>
        <Tab active>Active</Tab>
      </form>,
    );
    const tab = screen.getByRole('button');

    expect(tab.getAttribute('type')).toBe('button');
    expect(tab.getAttribute('aria-pressed')).toBe('true');

    fireEvent.click(tab);
    expect(onSubmit).not.toHaveBeenCalled();
  });
});
