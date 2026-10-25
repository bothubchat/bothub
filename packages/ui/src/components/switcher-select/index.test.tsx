import { describe, test, expect, afterEach, vi } from 'vitest';
import { cleanup, fireEvent, screen } from '@testing-library/react';
import { customRender } from '@/ui/tests';
import { SwitcherSelect } from './index';

describe('SwitcherSelect', () => {
  afterEach(() => {
    cleanup();
  });

  test('selects the clicked option and ignores clicks on the active one', () => {
    const onChange = vi.fn();
    customRender(
      <SwitcherSelect
        options={['api', 'dashboard']}
        onChange={onChange}
      />,
    );
    const [api, dashboard] = screen.getAllByRole('button');

    expect(api.getAttribute('aria-pressed')).toBe('true');
    expect(dashboard.getAttribute('aria-pressed')).toBe('false');

    fireEvent.click(api);
    expect(onChange).not.toHaveBeenCalled();
    expect(api.getAttribute('aria-pressed')).toBe('true');

    fireEvent.click(dashboard);
    expect(onChange).toHaveBeenLastCalledWith(1);
    expect(dashboard.getAttribute('aria-pressed')).toBe('true');

    fireEvent.click(dashboard);
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  test('does not submit a surrounding form', () => {
    const onSubmit = vi.fn((event: React.FormEvent) => event.preventDefault());
    customRender(
      <form onSubmit={onSubmit}>
        <SwitcherSelect options={['api', 'dashboard']} />
      </form>,
    );

    screen.getAllByRole('button').forEach((button) => {
      expect(button.getAttribute('type')).toBe('button');
      fireEvent.click(button);
    });
    expect(onSubmit).not.toHaveBeenCalled();
  });
});
