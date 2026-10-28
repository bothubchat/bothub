import { describe, test, expect, afterEach, vi } from 'vitest';
import { cleanup, fireEvent, screen } from '@testing-library/react';
import { customRender } from '@/ui/tests';
import { ReferralCardLink } from './index';

describe('ReferralCardLink', () => {
  afterEach(() => {
    cleanup();
  });

  test('shows the copied icon after a click, not on focus', () => {
    const onCopy = vi.fn();

    customRender(
      <ReferralCardLink onCopy={onCopy}>
        https://example.com/ref
      </ReferralCardLink>,
    );

    const link = screen.getByText('https://example.com/ref').parentElement!;
    const copyIcon = link.querySelector('svg')!.innerHTML;

    fireEvent.focus(link);
    expect(link.querySelector('svg')!.innerHTML).toBe(copyIcon);

    fireEvent.click(link);
    expect(onCopy).toHaveBeenCalledWith('https://example.com/ref');
    expect(link.querySelector('svg')!.innerHTML).not.toBe(copyIcon);

    fireEvent.blur(link);
    expect(link.querySelector('svg')!.innerHTML).toBe(copyIcon);
  });
});
