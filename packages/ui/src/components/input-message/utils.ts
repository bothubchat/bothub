import { IInputMessageFile } from './types';

const IMAGE_FILE_REGEXP = /\.(png|jpe?g)$/i;

/** Имя PNG или JPEG: для них показываем превью */
export const isImageFileName = (name: string): boolean =>
  IMAGE_FILE_REGEXP.test(name);

export const getPreviewUrlForFile = async (file: File) => {
  if (isImageFileName(file.name)) {
    return new Promise<string | null>((resolve) => {
      const reader = new FileReader();

      reader.addEventListener('load', () => {
        resolve(reader.result?.toString() ?? null);
      });
      // Без превью файл всё равно прикрепляется, а не зависает навсегда
      reader.addEventListener('error', () => resolve(null));
      reader.addEventListener('abort', () => resolve(null));
      reader.readAsDataURL(file);
    });
  }

  return null;
};

/**
 * Тот же файл, выбранный или вставленный повторно.
 * Только по имени сравнивать нельзя: все скриншоты из буфера называются image.png
 */
export const isSameNativeFile = (a?: File, b?: File): boolean =>
  !!a &&
  !!b &&
  (a === b ||
    (a.name === b.name &&
      a.size === b.size &&
      a.type === b.type &&
      a.lastModified === b.lastModified));

const fileKeys = new WeakMap<File, string>();
let fileKeyCounter = 0;

/** Стабильные уникальные key для списка файлов: имена могут совпадать */
export const getFileKeys = (files: IInputMessageFile[]): string[] => {
  const usedKeys = new Set<string>();

  return files.map((file, index) => {
    let key = file.native instanceof Blob ? fileKeys.get(file.native) : null;

    if (!key) {
      key = `file-${++fileKeyCounter}`;

      if (file.native instanceof Blob) {
        fileKeys.set(file.native, key);
      }
    }
    if (usedKeys.has(key)) {
      key = `${key}-${index}`;
    }
    usedKeys.add(key);

    return key;
  });
};

export const formatUploadFiles = async (
  files: File[],
): Promise<IInputMessageFile[]> => {
  const uniqueFiles = files.filter(
    (file, index) =>
      files.findIndex((other) => isSameNativeFile(file, other)) === index,
  );
  const previewsUrls: (string | null)[] = await Promise.all(
    uniqueFiles.map(getPreviewUrlForFile),
  );

  return uniqueFiles.map((nativeFile, index) => ({
    name: nativeFile.name,
    previewUrl: previewsUrls[index],
    native: nativeFile,
  }));
};

export function isFileTypeAccepted(
  fileType: string,
  acceptStr?: string,
  fileName?: string,
): boolean {
  if (!acceptStr || acceptStr.trim() === '') return true;

  const acceptList = acceptStr
    .split(',')
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
  const type = fileType.toLowerCase();

  return acceptList.some((acceptType) => {
    // Как в атрибуте accept у <input type="file">: ".pdf" — расширение
    if (acceptType.startsWith('.')) {
      return !!fileName && fileName.toLowerCase().endsWith(acceptType);
    }
    if (acceptType.endsWith('/*')) {
      const baseType = acceptType.slice(0, acceptType.length - 1);
      return type.startsWith(baseType);
    }
    return acceptType === type;
  });
}

export const getClipboardFiles = (clipboardData: DataTransfer): File[] => {
  if (clipboardData.files.length > 0) {
    return [...clipboardData.files];
  }

  // Safari и часть приложений отдают файл только через items
  return [...clipboardData.items]
    .filter((item) => item.kind === 'file')
    .map((item) => item.getAsFile())
    .filter((file): file is File => file !== null);
};

const hasHtmlText = (html: string): boolean => {
  if (!html) return false;

  const document = new DOMParser().parseFromString(html, 'text/html');

  return (document.body.textContent ?? '').trim().length > 0;
};

/**
 * Вставлять ли файлы из буфера вместо текста.
 * Браузер при «Копировать изображение» кладёт рядом с картинкой `<img>` без текста,
 * Finder — имя файла в text/plain: это не текст пользователя, вставляем файл.
 * Word, Excel и выделение на странице кладут HTML с текстом (и PNG-превью): вставляем текст.
 */
export const shouldPasteClipboardFiles = (clipboardData: DataTransfer) =>
  !hasHtmlText(clipboardData.getData('text/html'));

export const isMobileDevice = (): boolean =>
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent,
  ) ||
  ('ontouchstart' in window && window.innerWidth <= 768);
