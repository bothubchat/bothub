import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import {
  FILE_THUMBNAIL_SIZE,
  canCreateThumbnail,
  getFileThumbnail,
} from './thumbnail';

const THUMBNAIL = 'data:image/webp;base64,thumbnail';

const photo = () => new File(['jpeg'], 'photo.jpg', { type: 'image/jpeg' });

const deferred = <T>() => {
  let resolve!: (value: T) => void;
  const promise = new Promise<T>((res) => {
    resolve = res;
  });

  return { promise, resolve };
};

describe('getFileThumbnail', () => {
  let drawImage: ReturnType<typeof vi.fn>;
  let bitmap: { close: ReturnType<typeof vi.fn> };
  let createImageBitmap: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    bitmap = { close: vi.fn() };
    drawImage = vi.fn();
    createImageBitmap = vi.fn(async () => bitmap);
    // В jsdom нет createImageBitmap и canvas
    vi.stubGlobal('createImageBitmap', createImageBitmap);
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockImplementation(
      () => ({ drawImage }) as unknown as CanvasRenderingContext2D,
    );
    vi.spyOn(HTMLCanvasElement.prototype, 'toDataURL').mockReturnValue(
      THUMBNAIL,
    );
  });
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  test('decodes the image already downscaled to the chip size', async () => {
    const file = photo();

    await expect(getFileThumbnail(file)).resolves.toBe(THUMBNAIL);

    expect(createImageBitmap).toHaveBeenCalledWith(
      file,
      expect.objectContaining({
        resizeWidth: FILE_THUMBNAIL_SIZE,
        resizeHeight: FILE_THUMBNAIL_SIZE,
      }),
    );
    // Браузер без resize отдал бы полный кадр: рисуем в размер миниатюры
    expect(drawImage).toHaveBeenCalledWith(
      bitmap,
      0,
      0,
      FILE_THUMBNAIL_SIZE,
      FILE_THUMBNAIL_SIZE,
    );
    expect(bitmap.close).toHaveBeenCalled();
  });

  test('decodes each file once', async () => {
    const file = photo();

    await getFileThumbnail(file);
    await getFileThumbnail(file);

    expect(createImageBitmap).toHaveBeenCalledTimes(1);
  });

  test('decodes one image at a time', async () => {
    const first = deferred<typeof bitmap>();
    createImageBitmap.mockImplementationOnce(() => first.promise);

    const firstThumbnail = getFileThumbnail(photo());
    const secondThumbnail = getFileThumbnail(photo());
    await Promise.resolve();
    await Promise.resolve();

    expect(createImageBitmap).toHaveBeenCalledTimes(1);

    first.resolve(bitmap);
    await expect(firstThumbnail).resolves.toBe(THUMBNAIL);
    await expect(secondThumbnail).resolves.toBe(THUMBNAIL);
    expect(createImageBitmap).toHaveBeenCalledTimes(2);
  });

  test('gives null when the browser cannot decode the image', async () => {
    createImageBitmap.mockRejectedValueOnce(new Error('InvalidStateError'));

    await expect(getFileThumbnail(photo())).resolves.toBeNull();
    // Следующие картинки очередь не ждут вечно
    await expect(getFileThumbnail(photo())).resolves.toBe(THUMBNAIL);
  });

  test('gives null for a file without data', async () => {
    const empty = new File([], 'image.png', { type: 'image/png' });

    expect(canCreateThumbnail(empty)).toBe(false);
    await expect(getFileThumbnail(empty)).resolves.toBeNull();
    expect(createImageBitmap).not.toHaveBeenCalled();
  });

  test('gives null in a browser without createImageBitmap', async () => {
    vi.unstubAllGlobals();

    expect(canCreateThumbnail(photo())).toBe(false);
    await expect(getFileThumbnail(photo())).resolves.toBeNull();
  });
});
