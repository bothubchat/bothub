import { useState } from 'react';
import { describe, test, expect, afterEach, beforeEach, vi } from 'vitest';
import { act, cleanup, fireEvent } from '@testing-library/react';
import { customRender } from '@/ui/tests';
import { MessageImage, MessageImageProps } from '.';

const deferred = <T,>() => {
  let resolve: (value: T) => void = () => {};
  let reject: (reason: unknown) => void = () => {};
  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
};

const okResponse = (body: string) => ({
  ok: true,
  blob: () => Promise.resolve(new Blob([body])),
});

// Without buttons the only element next to the image is the skeleton.
const isSkeletonShown = (container: HTMLElement) =>
  Array.from(container.firstElementChild!.children).some(
    (child) => child.tagName !== 'IMG',
  );

describe('MessageImage', () => {
  let setSrc: (src: string) => void;
  let createObjectURL: ReturnType<typeof vi.fn>;
  let revokeObjectURL: ReturnType<typeof vi.fn>;

  const renderImage = (props: MessageImageProps) => {
    const Parent = () => {
      const [src, set] = useState(props.src);
      setSrc = set;
      return (
        <MessageImage
          {...props}
          src={src}
        />
      );
    };

    return customRender(<Parent />);
  };

  beforeEach(() => {
    let count = 0;
    createObjectURL = vi.fn(() => `blob:${++count}`);
    revokeObjectURL = vi.fn();
    URL.createObjectURL = createObjectURL;
    URL.revokeObjectURL = revokeObjectURL;
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
  });

  test('hides the skeleton and calls onLoad when the image loads', () => {
    const onLoad = vi.fn();
    const { container } = renderImage({ src: 'a.png', onLoad });

    expect(isSkeletonShown(container)).toBe(true);

    fireEvent.load(container.querySelector('img')!);

    expect(isSkeletonShown(container)).toBe(false);
    expect(onLoad).toHaveBeenCalledTimes(1);
  });

  test('hides the skeleton and calls onError when the image fails', () => {
    const onError = vi.fn();
    const { container } = renderImage({ src: 'a.png', onError });

    fireEvent.error(container.querySelector('img')!);

    expect(isSkeletonShown(container)).toBe(false);
    expect(onError).toHaveBeenCalledTimes(1);
  });

  test('shows the skeleton again for a new src', () => {
    const { container } = renderImage({ src: 'a.png' });

    fireEvent.load(container.querySelector('img')!);
    act(() => setSrc('b.png'));

    expect(isSkeletonShown(container)).toBe(true);
  });

  test('keeps only the image of the latest src', async () => {
    const first = deferred<ReturnType<typeof okResponse>>();
    const second = deferred<ReturnType<typeof okResponse>>();
    const fetch = vi
      .fn()
      .mockReturnValueOnce(first.promise)
      .mockReturnValueOnce(second.promise);
    vi.stubGlobal('fetch', fetch);
    const { container } = renderImage({ src: 'a.png', fetchImage: true });

    act(() => setSrc('b.png'));
    await act(async () => second.resolve(okResponse('b')));
    await act(async () => first.resolve(okResponse('a')));

    expect(fetch).toHaveBeenCalledTimes(2);
    expect(createObjectURL).toHaveBeenCalledTimes(1);
    expect(container.querySelector('img')!.getAttribute('src')).toBe('blob:1');
  });

  test('revokes the blob URL on unmount', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() => Promise.resolve(okResponse('a'))),
    );
    const { unmount } = renderImage({ src: 'a.png', fetchImage: true });

    await act(async () => {});
    unmount();

    expect(revokeObjectURL).toHaveBeenCalledWith('blob:1');
  });

  test('does not create a blob URL after unmount', async () => {
    const response = deferred<ReturnType<typeof okResponse>>();
    vi.stubGlobal(
      'fetch',
      vi.fn(() => response.promise),
    );
    const { unmount } = renderImage({ src: 'a.png', fetchImage: true });

    unmount();
    await act(async () => response.resolve(okResponse('a')));

    expect(createObjectURL).not.toHaveBeenCalled();
  });

  test('hides the skeleton when the fetch fails', async () => {
    const response = deferred<ReturnType<typeof okResponse>>();
    vi.stubGlobal(
      'fetch',
      vi.fn(() => response.promise),
    );
    const { container } = renderImage({ src: 'a.png', fetchImage: true });

    await act(async () => response.reject(new Error('Network error')));

    expect(container.querySelector('img')).toBeNull();
    expect(isSkeletonShown(container)).toBe(false);
  });
});
