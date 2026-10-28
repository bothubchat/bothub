import { describe, test, expect, afterEach, vi } from 'vitest';
import { act, cleanup, fireEvent, screen } from '@testing-library/react';
import { useState } from 'react';
import { customRender, TestProvider } from '@/ui/tests';
import { Datepicker, DatepickerCalendar, getCalendarDays } from './index';

const waitForListeners = () =>
  act(async () => {
    await new Promise((resolve) => {
      setTimeout(resolve);
    });
  });

const SingleDatepicker = () => {
  const [value, setValue] = useState<Date | null>(null);

  return (
    <Datepicker
      range={false}
      value={value}
      onChange={setValue}
    >
      {(setRef, setOpen) => (
        <button
          ref={setRef}
          type="button"
          onClick={() => setOpen((prev) => !prev)}
        >
          Pick a date
        </button>
      )}
    </Datepicker>
  );
};

describe('Datepicker', () => {
  afterEach(() => {
    cleanup();
  });

  test('opens from the trigger without stopping the click', async () => {
    const documentClick = vi.fn();
    document.addEventListener('click', documentClick);

    customRender(<SingleDatepicker />);
    fireEvent.click(screen.getByText('Pick a date'));
    await waitForListeners();

    expect(screen.queryByText('Save')).not.toBeNull();
    // Other components can still see the click to close themselves
    expect(documentClick).toHaveBeenCalledTimes(1);
    document.removeEventListener('click', documentClick);

    fireEvent.click(document.body);
    expect(screen.queryByText('Save')).toBeNull();
  });

  test('keeps the shown month when the parent passes an equal value', () => {
    const onChange = vi.fn();
    const { rerender } = customRender(
      <DatepickerCalendar
        range
        value={[new Date(2026, 0, 10), null]}
        onChange={onChange}
        locale="en-US"
      />,
    );
    expect(screen.queryByText('January 2026')).not.toBeNull();

    fireEvent.click(screen.getAllByRole('button')[1]);
    expect(screen.queryByText('February 2026')).not.toBeNull();

    rerender(
      <TestProvider>
        <DatepickerCalendar
          range
          value={[new Date(2026, 0, 10), null]}
          onChange={onChange}
          locale="en-US"
        />
      </TestProvider>,
    );
    expect(screen.queryByText('February 2026')).not.toBeNull();
  });

  test('day buttons do not submit a surrounding form', () => {
    const onSubmit = vi.fn((event: React.FormEvent) => event.preventDefault());
    customRender(
      <form onSubmit={onSubmit}>
        <DatepickerCalendar
          range={false}
          value={new Date(2026, 0, 10)}
          onChange={() => {}}
          locale="en-US"
        />
      </form>,
    );

    fireEvent.click(screen.getAllByText('15')[0]);
    expect(onSubmit).not.toHaveBeenCalled();
  });
});

describe('getCalendarDays', () => {
  test('returns six weeks starting on the Sunday before the 1st', () => {
    const days = getCalendarDays(1, 2026); // February 2026 starts on Sunday

    expect(days).toHaveLength(42);
    expect(days[0].getDay()).toBe(0);
    expect(days[0].getDate()).toBe(1);
    expect(days[0].getMonth()).toBe(1);

    const march = getCalendarDays(2, 2026); // March 1, 2026 is a Sunday too
    expect(march[0].getMonth()).toBe(2);

    const april = getCalendarDays(3, 2026); // April 1, 2026 is a Wednesday
    expect(april[0].getDay()).toBe(0);
    expect(april[0].getDate()).toBe(29);
  });
});
