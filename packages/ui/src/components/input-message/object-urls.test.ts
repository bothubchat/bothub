import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { collectGarbage } from '@/ui/tests';
import {
  getObjectUrl,
  isRevokedObjectUrl,
  revokeObjectUrl,
} from './object-urls';

const { createObjectURL, revokeObjectURL } = URL;

describe('object URLs of input files', () => {
  let urlCount = 0;

  beforeEach(() => {
    // Предсказуемые objectURL, чтобы проверить, какой освобождён
    URL.createObjectURL = vi.fn(() => {
      urlCount += 1;
      return `blob:file-${urlCount}`;
    });
    URL.revokeObjectURL = vi.fn();
  });
  afterEach(() => {
    URL.createObjectURL = createObjectURL;
    URL.revokeObjectURL = revokeObjectURL;
  });

  const blob = () => new Blob(['data'], { type: 'image/png' });

  test('creates one URL per blob', () => {
    const file = blob();

    expect(getObjectUrl(file)).toBe(getObjectUrl(file));
    expect(URL.createObjectURL).toHaveBeenCalledTimes(1);
    expect(getObjectUrl(blob())).not.toBe(getObjectUrl(file));
  });

  test('revokes the URL once nothing holds the blob', () => {
    const file = blob();
    const url = getObjectUrl(file);

    expect(URL.revokeObjectURL).not.toHaveBeenCalled();
    collectGarbage(file);

    expect(URL.revokeObjectURL).toHaveBeenCalledWith(url);
    expect(isRevokedObjectUrl(url)).toBe(true);
  });

  test('revokes right away when asked and only once', () => {
    const file = blob();
    const url = getObjectUrl(file);

    revokeObjectUrl(file);
    collectGarbage(file);

    expect(URL.revokeObjectURL).toHaveBeenCalledTimes(1);
    expect(URL.revokeObjectURL).toHaveBeenCalledWith(url);
    expect(isRevokedObjectUrl(url)).toBe(true);
    // Тот же файл снова в поле: новый URL, а не освобождённый
    expect(getObjectUrl(file)).not.toBe(url);
  });

  test('does not revoke URLs it did not create', () => {
    revokeObjectUrl(blob());

    expect(URL.revokeObjectURL).not.toHaveBeenCalled();
    expect(isRevokedObjectUrl('blob:someone-else')).toBe(false);
  });
});
