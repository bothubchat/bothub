import { describe, test, expect, afterEach, vi } from 'vitest';
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

  test('passes the image attributes to the <img>, not the wrapper', () => {
    const { container } = customRender(
      <Avatar
        src="https://example.com/avatar.png"
        srcSet="https://example.com/avatar@2x.png 2x"
        loading="lazy"
        decoding="async"
        fetchPriority="low"
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
        data-testid="avatar"
      />,
    );

    const img = container.querySelector('img')!;
    expect(img.getAttribute('loading')).toBe('lazy');
    expect(img.getAttribute('decoding')).toBe('async');
    expect(img.getAttribute('fetchpriority')).toBe('low');
    expect(img.getAttribute('crossorigin')).toBe('anonymous');
    expect(img.getAttribute('referrerpolicy')).toBe('no-referrer');
    expect(img.getAttribute('srcset')).toBe(
      'https://example.com/avatar@2x.png 2x',
    );

    const wrapper = container.querySelector('[data-testid="avatar"]')!;
    expect(wrapper.tagName).toBe('SPAN');
    for (const attribute of [
      'loading',
      'decoding',
      'fetchpriority',
      'crossorigin',
      'referrerpolicy',
      'srcset',
    ]) {
      expect(wrapper.hasAttribute(attribute)).toBe(false);
    }
  });

  test('leaves loading and decoding to the browser by default', () => {
    const { container } = customRender(
      <Avatar src="https://example.com/avatar.png" />,
    );

    const img = container.querySelector('img')!;
    expect(img.hasAttribute('loading')).toBe(false);
    expect(img.hasAttribute('decoding')).toBe(false);
    expect(img.hasAttribute('fetchpriority')).toBe(false);
  });

  test('calls onError when the image fails', () => {
    const onError = vi.fn();
    const { container } = customRender(
      <Avatar
        src="https://example.com/broken.png"
        onError={onError}
      />,
    );

    fireEvent.error(container.querySelector('img')!);

    expect(onError).toHaveBeenCalledTimes(1);
  });
});
