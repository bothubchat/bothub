/**
 * objectURL вложений и голосовых поля: один на Blob.
 *
 * Объекты файлов уходят родителю, и он держит их и после того, как поле их
 * отпустило: в черновиках чатов, чтобы вернуть в поле после ошибки отправки,
 * в очереди сообщений, в полноэкранном просмотре. Поэтому при отправке,
 * удалении и размонтировании URL не освобождаем, а ждём, пока Blob никто
 * не держит и его соберёт сборщик мусора: тогда URL уже никому не нужен.
 * Сразу освобождаем только то, чем поле владеет одно (`revokeObjectUrl`).
 */
const urls = new WeakMap<Blob, string>();
// Освобождённые здесь URL: чтобы узнать устаревшее превью у копии файла
const revokedUrls = new Set<string>();

const revoke = (url: string) => {
  URL.revokeObjectURL(url);
  revokedUrls.add(url);
};

// Без FinalizationRegistry (Safari до 14.1, Firefox до 79) URL, которые
// поле отдало родителю, живут до перезагрузки страницы
const registry: FinalizationRegistry<string> | null =
  typeof FinalizationRegistry === 'function'
    ? new FinalizationRegistry(revoke)
    : null;

export const getObjectUrl = (blob: Blob): string => {
  let url = urls.get(blob);

  if (!url) {
    url = URL.createObjectURL(blob);
    urls.set(blob, url);
    revokedUrls.delete(url);
    registry?.register(blob, url, blob);
  }

  return url;
};

/** Освободить URL сразу: только когда Blob больше никому не отдан */
export const revokeObjectUrl = (blob: Blob) => {
  const url = urls.get(blob);

  if (!url) {
    return;
  }

  urls.delete(blob);
  registry?.unregister(blob);
  revoke(url);
};

export const isRevokedObjectUrl = (url: string): boolean =>
  revokedUrls.has(url);
