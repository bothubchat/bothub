import { describe, test, expect, afterEach, vi } from 'vitest';
import { cleanup, fireEvent, screen } from '@testing-library/react';
import { customRender } from '@/ui/tests';
import { Chip } from './index';

describe('Chip', () => {
  afterEach(() => {
    cleanup();
  });

  test('opens the image with the keyboard', () => {
    const handleImageClick = vi.fn();
    customRender(
      <Chip
        isImage
        handleImageClick={handleImageClick}
      >
        photo.png
      </Chip>,
    );
    const trigger = screen.getByRole('button');

    expect(trigger.getAttribute('tabindex')).toBe('0');
    fireEvent.keyDown(trigger, { key: 'Enter' });
    fireEvent.keyDown(trigger, { key: ' ' });
    expect(handleImageClick).toHaveBeenCalledTimes(2);
  });

  test('is not focusable without an image handler', () => {
    customRender(<Chip>label</Chip>);

    expect(screen.queryByRole('button')).toBeNull();
  });
});
