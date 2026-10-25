import { describe, test, expect, afterEach, vi } from 'vitest';
import { cleanup, fireEvent, screen } from '@testing-library/react';
import { customRender } from '@/ui/tests';
import { Bookmark } from './index';

describe('Bookmark', () => {
  afterEach(() => {
    cleanup();
  });

  test('closing does not activate the bookmark', () => {
    const onClick = vi.fn();
    const onClose = vi.fn();

    customRender(
      <Bookmark
        closeAriaLabel="close"
        onClick={onClick}
        onClose={onClose}
      >
        Tab
      </Bookmark>,
    );

    fireEvent.click(screen.getByLabelText('close'));
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(onClick).not.toHaveBeenCalled();

    fireEvent.click(screen.getByText('Tab'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
