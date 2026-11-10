import { describe, test, expect, afterEach } from 'vitest';
import { cleanup, fireEvent } from '@testing-library/react';
import { customRender } from '@/ui/tests';
import { Avatar } from './index';

describe('Avatar', () => {
  afterEach(() => {
    cleanup();
  });

  test('renders the image as an <img> with alt', () => {
    const { container } = customRender(
      <Avatar
        src="https://example.com/avatar.png"
        alt="User"
        size={32}
      />,
    );

    expect(container.querySelector('object')).toBeNull();

    const img = container.querySelector('img')!;
    expect(img.getAttribute('src')).toBe('https://example.com/avatar.png');
    expect(img.getAttribute('alt')).toBe('User');
    expect(img.getAttribute('width')).toBe('32');
  });

  test('falls back to the placeholder when the image fails', () => {
    const { container } = customRender(
      <Avatar src="https://example.com/broken.png" />,
    );

    fireEvent.error(container.querySelector('img')!);

    expect(container.querySelector('img')).toBeNull();
    expect(container.querySelector('svg')).not.toBeNull();
  });
});
