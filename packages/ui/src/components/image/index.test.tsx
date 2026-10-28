import { describe, test, expect, afterEach, vi } from 'vitest';
import { cleanup, fireEvent } from '@testing-library/react';
import { customRender, TestProvider } from '@/ui/tests';
import { Image } from './index';

const getImg = () => document.querySelector('img')!;

const hasSkeleton = (container: HTMLElement) =>
  container.querySelector('span') !== null;

describe('Image', () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    document.head
      .querySelectorAll('link[rel="preload"]')
      .forEach((link) => link.remove());
  });

  test('hides the skeleton after the image loads', () => {
    const { container } = customRender(
      <Image
        src="https://example.com/a.png"
        width={64}
        height={64}
        loading="skeleton"
      />,
    );

    expect(hasSkeleton(container)).toBe(true);

    fireEvent.load(getImg());
    expect(hasSkeleton(container)).toBe(false);
  });

  test('shows the skeleton again when src changes', () => {
    const { container, rerender } = customRender(
      <Image
        src="https://example.com/a.png"
        loading="skeleton"
      />,
    );

    fireEvent.load(getImg());
    expect(hasSkeleton(container)).toBe(false);

    rerender(
      <TestProvider>
        <Image
          src="https://example.com/b.png"
          loading="skeleton"
        />
      </TestProvider>,
    );
    expect(hasSkeleton(container)).toBe(true);
  });

  test('does not wait for the load event of an already complete image', () => {
    vi.spyOn(HTMLImageElement.prototype, 'complete', 'get').mockReturnValue(
      true,
    );
    vi.spyOn(HTMLImageElement.prototype, 'naturalWidth', 'get').mockReturnValue(
      64,
    );

    const { container } = customRender(
      <Image
        src="https://example.com/a.png"
        loading="skeleton"
      />,
    );

    expect(hasSkeleton(container)).toBe(false);
  });

  test('renders the preload link into the head without react-helmet', () => {
    customRender(
      <Image
        src="https://example.com/a.png"
        preload
        fetchPriority="high"
      />,
    );

    const link = document.head.querySelector('link[rel="preload"]');
    expect(link).not.toBeNull();
    expect(link!.getAttribute('href')).toBe('https://example.com/a.png');
    expect(link!.getAttribute('as')).toBe('image');
    expect(link!.getAttribute('fetchpriority')).toBe('high');
  });

  test('keeps media on adaptive preload links', () => {
    customRender(
      <Image
        src={{
          mobile: 'https://example.com/mobile.png',
          desktop: 'https://example.com/desktop.png',
        }}
        preload
      />,
    );

    const links = [...document.head.querySelectorAll('link[rel="preload"]')];
    expect(links).toHaveLength(2);
    links.forEach((link) => expect(link.getAttribute('media')).toBeTruthy());
  });

  test('renders an <img> for a picture without a desktop source', () => {
    const { container } = customRender(
      <Image
        src={{ mobile: 'https://example.com/mobile.png' }}
        loading="skeleton"
      />,
    );

    expect(getImg().getAttribute('src')).toBe('https://example.com/mobile.png');

    fireEvent.load(getImg());
    expect(hasSkeleton(container)).toBe(false);
  });

  test('a lazy image stays laid out while the skeleton is shown', () => {
    customRender(
      <Image
        src="https://example.com/a.png"
        loading="skeleton"
        lazy
      />,
    );

    const img = getImg();
    expect(img.getAttribute('loading')).toBe('lazy');
    expect(getComputedStyle(img).display).not.toBe('none');
  });

  test('decodes a lazy image asynchronously unless decoding is set', () => {
    const { rerender } = customRender(
      <Image
        src="https://example.com/a.png"
        lazy
      />,
    );
    expect(getImg().getAttribute('decoding')).toBe('async');

    rerender(
      <TestProvider>
        <Image
          src="https://example.com/a.png"
          lazy
          decoding="sync"
        />
      </TestProvider>,
    );
    expect(getImg().getAttribute('decoding')).toBe('sync');

    rerender(
      <TestProvider>
        <Image src="https://example.com/a.png" />
      </TestProvider>,
    );
    expect(getImg().hasAttribute('decoding')).toBe(false);
    expect(getImg().hasAttribute('loading')).toBe(false);
  });

  test('puts loading and decoding on the <img> of a picture', () => {
    const { container } = customRender(
      <Image
        src={{ mobile: 'https://example.com/m.png' }}
        lazy
      />,
    );

    const img = getImg();
    expect(img.getAttribute('loading')).toBe('lazy');
    expect(img.getAttribute('decoding')).toBe('async');
    expect(container.querySelector('picture')?.hasAttribute('decoding')).toBe(
      false,
    );
  });
});
