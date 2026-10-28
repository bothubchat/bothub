import { describe, test, expect, afterEach, vi } from 'vitest';
import { cleanup, fireEvent, screen } from '@testing-library/react';
import { customRender } from '@/ui/tests';
import { Paginator } from './index';

describe('Paginator', () => {
  afterEach(() => {
    cleanup();
  });

  test('marks the current page and labels the controls', () => {
    const onChange = vi.fn();
    customRender(
      <Paginator
        current={3}
        lastPage={10}
        onChange={onChange}
        aria-label="Pages"
        prevPageAriaLabel="Previous page"
        nextPageAriaLabel="Next page"
      />,
    );

    expect(screen.getByRole('navigation', { name: 'Pages' })).not.toBeNull();
    expect(screen.getByText('3').getAttribute('aria-current')).toBe('page');
    expect(screen.getByText('4').getAttribute('aria-current')).toBeNull();

    fireEvent.click(screen.getByLabelText('Next page'));
    expect(onChange).toHaveBeenLastCalledWith(4);

    fireEvent.click(screen.getByLabelText('Previous page'));
    expect(onChange).toHaveBeenLastCalledWith(2);
  });

  test('hides the ellipsis from assistive technology', () => {
    customRender(
      <Paginator
        current={1}
        lastPage={10}
        onChange={() => {}}
      />,
    );

    const ellipsis = screen.getByText('...');
    expect(ellipsis.getAttribute('aria-hidden')).toBe('true');
    expect(ellipsis.getAttribute('tabindex')).toBe('-1');
  });
});
