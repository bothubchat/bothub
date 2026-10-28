import { useEffect, useState } from 'react';

/** Сторона миниатюры: картинка чипа 18×18 при плотности экрана до 3 */
export const FILE_THUMBNAIL_SIZE = 54;

const readyThumbnails = new WeakMap<Blob, string | null>();
const thumbnails = new WeakMap<Blob, Promise<string | null>>();
let thumbnailQueue: Promise<unknown> = Promise.resolve();

/** Нечего уменьшать (файл с сервера без данных) или браузер не умеет */
export const canCreateThumbnail = (file: Blob): boolean =>
  file.size > 0 &&
  typeof createImageBitmap === 'function' &&
  typeof document !== 'undefined';

/**
 * Кадр, уменьшенный при декодировании: чип не держит в памяти полный
 * кадр фото (12 Мп ≈ 48 МБ). Как и прежнее превью, картинка растягивается
 * в квадрат чипа
 */
const drawThumbnail = async (file: Blob): Promise<string | null> => {
  const bitmap = await createImageBitmap(file, {
    resizeWidth: FILE_THUMBNAIL_SIZE,
    resizeHeight: FILE_THUMBNAIL_SIZE,
    resizeQuality: 'high',
    imageOrientation: 'from-image',
  });

  try {
    const canvas = document.createElement('canvas');
    canvas.width = FILE_THUMBNAIL_SIZE;
    canvas.height = FILE_THUMBNAIL_SIZE;
    const context = canvas.getContext('2d');

    if (!context) {
      return null;
    }
    // Браузер без resize в createImageBitmap отдаёт кадр целиком
    context.drawImage(bitmap, 0, 0, FILE_THUMBNAIL_SIZE, FILE_THUMBNAIL_SIZE);

    // Несколько КБ: data URL не нужно освобождать
    return canvas.toDataURL('image/webp', 0.8);
  } finally {
    bitmap.close();
  }
};

/** Миниатюра картинки или null, если её не сделать: тогда показываем превью */
export const getFileThumbnail = (file: Blob): Promise<string | null> => {
  if (!canCreateThumbnail(file)) {
    return Promise.resolve(null);
  }

  let thumbnail = thumbnails.get(file);

  if (!thumbnail) {
    // По одному: двадцать фото разом не декодируются одновременно
    thumbnail = thumbnailQueue
      .then(() => drawThumbnail(file))
      .catch(() => null)
      .then((value) => {
        readyThumbnails.set(file, value);
        return value;
      });
    thumbnailQueue = thumbnail;
    thumbnails.set(file, thumbnail);
  }

  return thumbnail;
};

const getInitialThumbnail = (file: Blob | undefined) => {
  if (!file || !canCreateThumbnail(file)) {
    return null;
  }

  return readyThumbnails.get(file);
};

/** Миниатюра для чипа: undefined — ещё готовится, null — не получилась */
export const useFileThumbnail = (
  file: Blob | undefined,
): string | null | undefined => {
  const [state, setState] = useState(() => ({
    file,
    thumbnail: getInitialThumbnail(file),
  }));
  let { thumbnail } = state;

  if (state.file !== file) {
    thumbnail = getInitialThumbnail(file);
    setState({ file, thumbnail });
  }

  useEffect(() => {
    if (!file || thumbnail !== undefined) {
      return undefined;
    }

    let isActual = true;

    getFileThumbnail(file).then((value) => {
      if (isActual) {
        setState({ file, thumbnail: value });
      }
    });

    return () => {
      isActual = false;
    };
  }, [file, thumbnail]);

  return thumbnail;
};
