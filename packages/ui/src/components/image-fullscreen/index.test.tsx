import { describe, test, expect, afterEach, beforeAll, vi } from 'vitest';
import { useState } from 'react';
import { act, cleanup, fireEvent, screen } from '@testing-library/react';
import { customRender } from '@/ui/tests';
import { ImageFullScreen, ImageFullScreenData } from './index';

const data: ImageFullScreenData = Array.from({ length: 20 }, (_, index) => ({
  id: `i${index}`,
  url: `https://example.com/full${index}.png`,
  previewUrl: `https://example.com/preview${index}.png`,
  name: `image ${index}`,
  width: 512,
  height: 512,
}));

const getFullImages = () =>
  [...document.querySelectorAll('img')].filter((img) =>
    img.src.includes('/full'),
  );

const getRenderedSlides = () =>
  getFullImages().map((img) => Number(img.src.match(/full(\d+)/)![1]));

describe('ImageFullScreen', () => {
  beforeAll(() => {
    vi.stubGlobal(
      'ResizeObserver',
      class {
        observe() {}

        disconnect() {}
      },
    );
  });

  afterEach(() => {
    cleanup();
  });

  test('renders full images only around the active slide', () => {
    customRender(
      <ImageFullScreen
        open
        data={data}
        item="i10"
      />,
    );

    expect(getRenderedSlides()).toEqual([9, 10, 11]);
  });

  test('lazy loads the thumbnails', () => {
    customRender(
      <ImageFullScreen
        open
        data={data}
      />,
    );

    const thumbnails = [...document.querySelectorAll('img')].filter((img) =>
      img.src.includes('/preview'),
    );

    expect(thumbnails).toHaveLength(data.length);
    thumbnails.forEach((img) => {
      expect(img.getAttribute('loading')).toBe('lazy');
      expect(img.getAttribute('decoding')).toBe('async');
    });
  });

  test('is a dialog that closes on Escape', () => {
    const onClose = vi.fn();

    customRender(
      <ImageFullScreen
        open
        data={data}
        onClose={onClose}
      />,
    );

    expect(screen.getByRole('dialog')).not.toBeNull();

    fireEvent.keyDown(document, { code: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test('falls back to the first slide for an unknown item', () => {
    customRender(
      <ImageFullScreen
        open
        data={data}
        item="unknown"
      />,
    );

    expect(getRenderedSlides()).toEqual([0, 1]);
  });

  test('reopening starts from the item again without the old zoom', () => {
    let setOpen: (open: boolean) => void = () => {};

    const Host = () => {
      const [open, setOpenState] = useState(true);
      setOpen = setOpenState;

      return (
        <ImageFullScreen
          open={open}
          data={data}
          item="i5"
        />
      );
    };

    customRender(<Host />);

    fireEvent.keyDown(document, { code: 'ArrowRight' });
    expect(getRenderedSlides()).toEqual([5, 6, 7]);

    // Zoom the active image: the carousel buttons are hidden while zooming.
    const buttonsCount = document.querySelectorAll('button').length;
    fireEvent.doubleClick(getFullImages()[1].parentElement!);
    expect(document.querySelectorAll('button').length).toBeLessThan(
      buttonsCount,
    );

    act(() => setOpen(false));
    act(() => setOpen(true));

    expect(getRenderedSlides()).toEqual([4, 5, 6]);
    expect(document.querySelectorAll('button')).toHaveLength(buttonsCount);
  });
});
